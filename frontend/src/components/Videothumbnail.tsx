import React, { useRef, useState, useEffect } from "react";

interface VideoThumbnailProps {
  videoUrl: string;
}


const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailUrl, setThumbnail] = useState<string>("");
  
  //5. base64 > 파일 변환
  const dataURLtoFile = (dataurl: string, fileName: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  //4. blob url로 base64 생성 후 파일 변환 요청
  useEffect(() => {
    const generateThumbnail = () => {
      if (videoRef.current) {
        const videoElement = videoRef.current;
        videoElement.currentTime = 2; // 썸네일을 생성할 시점 (2초)

        const handleCanPlayThrough = () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth;
          canvas.height=videoElement.videoHeight;

          const ctx=canvas.getContext('2d');
          if(ctx){
            ctx.drawImage(videoElement ,0 ,0 ,canvas.width ,canvas.height );
            setThumbnail(canvas.toDataURL());
            dataURLtoFile(canvas.toDataURL(), 'thumbnail')
            console.log('썸네일', dataURLtoFile(canvas.toDataURL(), 'thumbnail'))
          }
        };

        videoElement.addEventListener("canplaythrough", handleCanPlayThrough, { once: true });
      }
    };
    
   generateThumbnail();
   
 }, [videoUrl]);

// const handleClick=()=>{
//    if(thumbnailUrl){
//      console.log("Generating file...");
//      const thumbnailfile = dataURLtoFile(thumbnailUrl, 'thumbnail');
//      console.log(thumbnailfile)
//    }
// };

return (
<div>
  <video ref={videoRef} src={videoUrl} controls style={{ display: "none" }} />
  {thumbnailUrl && (
  <div>
    <img src={thumbnailUrl} alt="썸네일" />
    {/* <div onClick={handleClick}>클릭하여 파일 생성</div> */}
  </div>
  )}
</div>
);
};

export default VideoThumbnail;
