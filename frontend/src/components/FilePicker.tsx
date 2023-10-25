import React, { useState } from "react";
import tw from "twin.macro";
import VideoThumbnail from "./Videothumbnail";

const FilePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileUrl, setFileUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileurl = URL.createObjectURL(file)
    //   setFileUrl(URL.createObjectURL(file));
    //   console.log(file)
    //   console.log(fileurl)
    //   window.localStorage.setItem('bloburl', fileurl)
      setVideoUrl(fileurl)
    }
  };

  return (
    // <div>
    //     <label htmlFor="file">
    //     <div css={tw`border border-gray-700`}>파일 업로드하기</div>
    //     </label>
    //   <input type="file" name="file" id="file" accept="image/*, video/*" onChange={handleFileChange} 
    //   style={{display:'none'}} 
    //   />
    //   {selectedFile && (
    //     <>
    //       {selectedFile.type.startsWith("image") ? (
    //         <img src={fileUrl} alt="Selected Image" style={{ maxWidth: "50%" }} />
    //       ) : (
    //         <video src={fileUrl} controls style={{ maxWidth: "50%" }} />
    //       )}
    //     </>
    //   )}
    // </div>
    <div>
    {!selectedFile && (
      <label htmlFor="file">
        <div css={tw`flex justify-center border border-gray-700 bg-green-300 rounded-md w-[50%] h-[20vh]`}>파일 업로드하기</div>
      </label>
    )}
    <input
      type="file"
      name="file"
      id="file"
      accept="image/*, video/*"
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
    {selectedFile && (
      <>
        {selectedFile.type.startsWith("image") ? (
            <div css={tw` border border-gray-700 rounded-md w-[50%] h-[auto] overflow-hidden`}>
                <label htmlFor="file">
                  <div css={tw`flex justify-center`}>파일 업로드하기</div>
                </label>
                <img css={tw`flex ml-[5%]`} src={URL.createObjectURL(selectedFile)} alt="Selected Image" style={{ maxWidth: "90%" }} />
            </div>
        ) : (
            <div css={tw`border border-gray-700 rounded-md w-[50%] h-[auto] overflow-hidden`}>
                <label htmlFor="file">
                  <div css={tw`flex justify-center`}>파일 업로드하기</div>
                </label>
                <video css={tw`flex ml-[5%]`} src={URL.createObjectURL(selectedFile)} controls controlsList="nodownload" style={{ maxWidth: "90%" }} />
            </div>
        )}
      </>
    )}
    {videoUrl && <VideoThumbnail videoUrl={videoUrl} />}
  </div>
  );
};

export default FilePicker;
