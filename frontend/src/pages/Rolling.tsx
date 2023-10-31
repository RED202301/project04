import React from "react";
// import VideoThumbnail from "../components/Videothumbnail";
// import tw from "twin.macro";
import FilePicker from "../components/FilePicker";
import SoundPicker from "../components/SoundPicker";
// import AudioRecorder from "../components/Audio";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { fileAtom } from "../recoil/fileAtom";

const base_URL = `http://192.168.30.218:8080`;

const Rolling: React.FC = () => {
  // const [videoUrl, setVideoUrl] = useState<string | null>("");
  // const handleButtonClick = () => {
  //   // 동영상 URL을 받아오는 비동기 로직 예시
  //   // 실제로는 사용자 입력 등으로부터 URL을 받아오게 될 것입니다.
  //   setTimeout(() => {
  //     // const url = "./자율 중간발표 영상.mp4";
  //     const url = window.localStorage.getItem('bloburl');
  //     setVideoUrl(url);
  //   }, 1000);
  // };
  const thumbnailFile = useRecoilValue(fileAtom).thumbnailFile
  const sourceFile = useRecoilValue(fileAtom).sourceFile
  const type = useRecoilValue(fileAtom).type

  const accessToken = window.localStorage.getItem("accessToken");
  const test = () => {
    const formData = new FormData()
    formData.append('receiverId', '3101567072');
    formData.append('top', '0');
    formData.append('left', '0');
    formData.append('rotate', '0');
    formData.append('zindex', '0');
    formData.append('content', 'zz');
    formData.append('type', String(type));
    formData.append('sourceFile', sourceFile);
    formData.append('thumbnailFile', thumbnailFile)
    console.log(formData)
    axios.post(base_URL + '/api/v1/messages', formData, {
      headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8', Authorization: `Bearer ${accessToken}`},
  }).then(response => {
    console.log(response)
    console.log(thumbnailFile)
    console.log(sourceFile)
  }).catch(err=>{
    console.log(err)
    console.log(thumbnailFile)
    console.log(sourceFile)
  })
  };

  return (
    <div>
      {/* <button css={tw`border rounded-md border-black`} onClick={handleButtonClick}>썸네일 생성버튼</button> */}
      {/* {videoUrl && <VideoThumbnail videoUrl={videoUrl} />} */}

      {/* 1. 사진/동영상 불러오기 */}
      <FilePicker/>
      <SoundPicker/>
      <div onClick={test}>제출버튼</div>
      {/* <AudioRecorder></AudioRecorder> */}
      
    </div>
  );
}

export default Rolling;
