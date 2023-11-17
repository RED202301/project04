# 사용 방법  

## 가상환경을 만들고 활성화합니다.
```sh
python -m venv .venv
.\.venv\Scripts\activate
```  

## 필요한 라이브러리 설치
```sh
pip install -r requirements.txt
```  

## 서버 시작
```sh
### port번호 : 1557
python face_api.py
```

 - 사진 두 장을 넣으면 유사도와 얼굴을 바꾼 두 사진이 반환됩니다.
 - 사진에서 얼구을 찾지 못하거나, 에러가 발생하면 state값으로 false가 반환됩니다.
