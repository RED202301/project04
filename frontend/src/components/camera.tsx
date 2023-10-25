import React, { useRef, useState} from "react";

interface CameraCaptureProps {
  onCapture: (mediaUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraReady, setCameraReady] = useState(false);

  const startCamera = async () => {
    try {
        const constraints = { video: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraReady(true);
        }
        } catch (error) {
        console.error("Failed to access camera:", error);
        }
    };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraReady(false);
    }
  };

  const captureMedia = () => {
    if (videoRef.current && isCameraReady) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const videoElement = videoRef.current;
   const ctx=canvas.getContext('2d');
    if(ctx){
    ctx.drawImage(videoElement, 0, 0 ,canvas.width ,canvas.height );
    const mediaUrl=canvas.toDataURL();
    onCapture(mediaUrl);
    }
   }
};

return (
 <div>
     <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
   {!isCameraReady ? (
     <button onClick={startCamera}>카메라 접근</button>
   ) : (
     <>
       <button onClick={captureMedia}>미디어 캡처</button>
       <button onClick={stopCamera}>카메라 종료</button>
     </>
   )}
 </div>
 );
};

export default CameraCapture;
