import React,{useState} from "react";
import VideoThumbnail from "../components/Videothumbnail";
import tw from "twin.macro";
import FilePicker from "../components/FilePicker";
import SoundPicker from "../components/SoundPicker";
import AudioRecorder from "../components/Audio";

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

  return (
    <div>
      {/* <button css={tw`border rounded-md border-black`} onClick={handleButtonClick}>썸네일 생성버튼</button> */}
      {/* {videoUrl && <VideoThumbnail videoUrl={videoUrl} />} */}

      {/* 1. 사진/동영상 불러오기 */}
      <FilePicker/>
      <SoundPicker/>
      <AudioRecorder></AudioRecorder>
    </div>
  );
}

export default Rolling;
