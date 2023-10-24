import React, { useRef, useState } from "react";

interface VideoThumbnailProps {
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailUrl, setThumbnail] = useState("");

  const generateThumbnail = () => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.width = 200; 
      canvas.height = 200; 

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL();
        console.log(thumbnailUrl);
        setThumbnail(thumbnailUrl);
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} src={videoUrl} controls />
      <button onClick={generateThumbnail}>썸네일 생성</button>
      {thumbnailUrl && <img src={thumbnailUrl} alt="썸네일" />}
    </div>
  );
};

export default VideoThumbnail;
