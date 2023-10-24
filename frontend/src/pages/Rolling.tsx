import React from "react";
import VideoThumbnail from "../components/Videothumbnail";

const Rolling: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh]" style={{ backgroundColor: "#B6DBEE" }}>
        롤링 메인
        <VideoThumbnail videoUrl="./자율 중간발표 영상.mp4"></VideoThumbnail>
    </div>
  );
};

export default Rolling;