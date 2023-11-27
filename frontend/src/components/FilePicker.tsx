import React, { useState } from "react";
import tw from "twin.macro";
import VideoThumbnail from "./Videothumbnail";
import file from '/file.png'
// import camera from '/camera.png'
import refresh from '/refresh.png';
import { fileAtom } from '../recoil/fileAtom'
import { useSetRecoilState } from "recoil";


const FilePicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const Setfiles = useSetRecoilState(fileAtom);

//   const [fileUrl, setFileUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>("");
    // 3. videoUrl 들어오면, VideoThumbnail 실행

  //2. 파일 들어왔을 때, 파일 저장 / bloburl 생성
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
        console.log('이미지/동영상?', file)
      setSelectedFile(file);
      Setfiles((prevfile) => ({
        ...prevfile,
        sourceFile: file,
        thumbnailFile: file,
        type: 2,
      }));
      
      if(file.type.startsWith('video')){const fileurl = URL.createObjectURL(file)
    //   setFileUrl(URL.createObjectURL(file));
    //   console.log(file)
    //   console.log(fileurl)
    //   window.localStorage.setItem('bloburl', fileurl)
    Setfiles((prevfile) => ({
        ...prevfile,
        thumbnailFile: null,
        type: 3,
      }));
      setVideoUrl(fileurl)}
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
        <div css={tw`flex justify-center border border-gray-500 bg-gray-100 rounded-md w-[50%] h-[18vh]`}>
            <div css={tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] h-[90%] w-[94%] flex justify-center items-center`}>
            <div>
            {/* <p css={tw`text-sm mt-[auto] mb-[auto] flex justify-center`}>파일 업로드하기</p> */}
            <img css={tw`ml-[auto] mr-[auto]`} src={file} width={`50%`}></img>
            {/* <img css={tw`ml-[auto] mr-[auto]`} src={camera} width={`50%`}></img> */}
            </div>
            </div>
        </div>
      </label>
    )}
    <input
      type="file"
      name="file"
      id="file"
      accept="audio/*, image/*, video/*"
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
    {selectedFile && (
      <>
        {selectedFile.type.startsWith("image") ? (
            <div css={tw` flex justify-center border border-gray-500 bg-gray-100 rounded-md w-[50%] h-[auto] overflow-hidden`}>
            <label htmlFor="file">
              <div css={tw`flex justify-center items-center`}>
                <img css={tw``} src={refresh} width={`5%`}></img>
                <div css={tw`flex justify-center text-xs font-bold`}>다시 고르기</div>
              </div>
              <div css={tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] ml-[3%] w-[94%] flex justify-center items-center overflow-hidden`}>
                <img css={tw`flex justify-center`} src={URL.createObjectURL(selectedFile)} alt="Selected Image" style={{ maxWidth: "100%" }} />
              </div>
            </label>
        </div>
        ) : (
            <div css={tw` flex justify-center border border-gray-500 bg-gray-100 rounded-md w-[50%] h-[auto] pb-1 overflow-hidden`}>
                <label htmlFor="file">
                  <div css={tw`flex justify-center items-center`}>
                    <img css={tw``} src={refresh} width={`5%`}></img>
                    <div css={tw`flex justify-center text-xs font-bold`}>다시 고르기</div>
                  </div>
                  <div css={tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] ml-[3%] w-[94%] flex justify-center items-center overflow-hidden`}>
                    <video css={tw`flex justify-center`} src={URL.createObjectURL(selectedFile)} controls controlsList="nodownload" style={{ maxWidth: "100%",}} />
                  </div>
                </label>
            </div>
        )}
      </>
    )}
    {videoUrl && <VideoThumbnail videoUrl={videoUrl} />}
  </div>
  );
};

export default FilePicker;
