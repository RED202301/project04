from flask import Flask, request, jsonify
import cv2
import numpy as np
from deepface import DeepFace

import dlib
import base64

from flask_cors import CORS, cross_origin
import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]= "8"


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})  # CORS 설정 추가

from dlib import get_frontal_face_detector, shape_predictor, face_recognition_model_v1
from scipy.spatial import procrustes

# 얼굴 정렬을 위한 함수
def align_face(img):
    # 얼굴 탐지기, 랜드마크 탐지기, 얼굴 인식 모델 초기화
    detector = get_frontal_face_detector()
    sp = shape_predictor('shape_predictor_68_face_landmarks.dat')
    facerec = face_recognition_model_v1('dlib_face_recognition_resnet_model_v1.dat')

    # 얼굴 탐지
    dets = detector(img, 1)
    for k, d in enumerate(dets):
        shape = sp(img, d)

        # 얼굴 인식 모델에 입력하기 위해 랜드마크를 2D에서 3D로 변환
        face_descriptor = facerec.compute_face_descriptor(img, shape)
        face_chip = dlib.get_face_chip(img, shape)
    
    return face_chip

def similarity_check(img1_path, img2_path):
    # 얼굴 검증
    result = DeepFace.verify(img1_path=img1_path,
                             img2_path=img2_path,
                             detector_backend='retinaface',
                             model_name='ArcFace')
    # 결과 확인
    distance = result['distance']
    threshold = result['threshold']
    similarity = max(0, (distance-0.55)/(0.9-0.55))
    similarity = min(similarity, 1)
    similarity = (1 - similarity)*(1 - similarity)
    return similarity

def face_mix(source, target):
    # dlib 얼굴 인식기와 랜드마크 인식기를 초기화
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')
    
    # 복사를 생성하여 원본 이미지를 보존
    source_copy = source.copy()
    target_copy = target.copy()
    
    # 두 이미지에서 얼굴을 인식
    source_faces = detector(source, 1)
    target_faces = detector(target, 1)
    
    # 얼굴 못찾은 경우 반환
    if len(source_faces) == 0 or len(target_faces) == 0:
        return [target, source, False]
    
    # source의 랜드마크를 target에 합성
    for source_face in source_faces:
        source_landmarks = predictor(source, source_face)
        for target_face in target_faces:
            target_landmarks = predictor(target, target_face)

            # 눈, 코, 입 부분의 랜드마크를 추출
            for i in range(30, 68):
                # source 이미지의 랜드마크 위치
                sx = source_landmarks.part(i).x
                sy = source_landmarks.part(i).y

                # target 이미지의 랜드마크 위치
                tx = target_landmarks.part(i).x
                ty = target_landmarks.part(i).y

                # source 이미지에서 랜드마크 주변 부분을 잘라냄
                source_part = source[sy-25:sy+25, sx-25:sx+25]

                # 잘라낸 부분의 크기를 확인
                h, w = source_part.shape[:2]

                if h > 0 and w > 0:
                    # 잘라낸 부분을 target 이미지에 합성
                    mask = np.ones(source_part.shape, source_part.dtype) * 255
                    center = (tx, ty)
                    target = cv2.seamlessClone(source_part, target, mask, center, cv2.NORMAL_CLONE)

    # target의 랜드마크를 source에 합성
    for target_face in target_faces:
        target_landmarks = predictor(target_copy, target_face)
        for source_face in source_faces:
            source_landmarks = predictor(source_copy, source_face)

            # 눈, 코, 입 부분의 랜드마크를 추출
            for i in range(30, 68):
                # target 이미지의 랜드마크 위치
                tx = target_landmarks.part(i).x
                ty = target_landmarks.part(i).y

                # source 이미지의 랜드마크 위치
                sx = source_landmarks.part(i).x
                sy = source_landmarks.part(i).y

                # target 이미지에서 랜드마크 주변 부분을 잘라냄
                target_part = target_copy[ty-25:ty+25, tx-25:tx+25]

                # 잘라낸 부분의 크기를 확인
                h, w = target_part.shape[:2]

                if h > 0 and w > 0:
                    # 잘라낸 부분을 source 이미지에 합성
                    mask = np.ones(target_part.shape, target_part.dtype) * 255
                    center = (sx, sy)
                    source = cv2.seamlessClone(target_part, source, mask, center, cv2.NORMAL_CLONE)

    return [target, source, True]

def img_to_base64(img):
    # 이미지를 base64로 변환하는 함수
    is_success, im_buf_arr = cv2.imencode(".jpg", img)
    byte_im = im_buf_arr.tobytes()
    base64_bytes = base64.b64encode(byte_im)
    base64_string = base64_bytes.decode('utf-8')
    return base64_string

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'img1' not in request.files or 'img2' not in request.files:
        return jsonify({'error': '이미지가 전송되지 않았습니다.'}), 400
    img1 = request.files['img1']
    img2 = request.files['img2']
    img1_path = './imgs/' + img1.filename
    img2_path = './imgs/' + img2.filename
    img1.save(img1_path)
    img2.save(img2_path)
    similarity = similarity_check(img1_path, img2_path)
    
    #얼굴 합성
    source = cv2.imread(img1_path)
    target = cv2.imread(img2_path)

    # 얼굴 정렬
    aligned_source = align_face(source)
    aligned_target = align_face(target)

    # 정렬된 얼굴로 합성 수행
    mixed_images = face_mix(aligned_source, aligned_target)
    
    # 합성된 이미지를 base64로 변환
    mixed_img1_base64 = img_to_base64(mixed_images[0])
    mixed_img2_base64 = img_to_base64(mixed_images[1])
    
    # 이미지 처리가 완료된 후 파일 삭제
    os.remove(img1_path)
    os.remove(img2_path)
    
    # 결과 반환
    return jsonify({
        'similarity': similarity,
        'mixed_img1': mixed_img1_base64,
        'mixed_img2': mixed_img2_base64,
        'state': mixed_images[2]
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1557)
