import React, { useEffect, useRef } from 'react';

const AudioRecorder: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const handleSuccess = (stream: MediaStream) => {
      mediaStream = stream;
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
    };

    const handleError = (error: MediaStream) => {
      console.error('Error accessing microphone:', error);
    };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(handleSuccess)
      .catch(handleError);

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default AudioRecorder;
