import React, { useState } from "react";
import tw from "twin.macro";
// import file from '/file.png'
// import camera from '/camera.png'
import microphone from '/microphone.png';
import refresh from '/refresh.png';

const SoundPicker: React.FC = () => {
  const [selectedsoundFile, setSelectedsoundFile] = useState<File | null>(null);

  //2. 파일 들어왔을 때, 파일 저장 / bloburl 생성
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file.type.startsWith('audio')) {
        console.log('사운드', file)
      setSelectedsoundFile(file);
    //   setFileUrl(URL.createObjectURL(file));
    //   console.log(file)
    //   console.log(fileurl)
    //   window.localStorage.setItem('bloburl', fileurl)
    }
  };

  return (
    <div>
    {!selectedsoundFile && (
      <label htmlFor="file1">
        <div css={tw`flex justify-center border border-gray-500 bg-gray-100 rounded-md w-[50%] h-[18vh]`}>
            <div css={tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] h-[90%] w-[94%] flex justify-center items-center`}>
            <div>
            {/* <p css={tw`text-sm mt-[auto] mb-[auto] flex justify-center`}>파일 업로드하기</p> */}
            <img css={tw`ml-[auto] mr-[auto]`} src={microphone} width={`50%`}></img>
            {/* <img css={tw`ml-[auto] mr-[auto]`} src={camera} width={`50%`}></img> */}
            </div>
            </div>
        </div>
      </label>
    )}
    <input
      type="file"
      name="file1"
      id="file1"
      accept="audio/*"
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
    {selectedsoundFile && (
            <div css={tw` flex justify-center border border-gray-500 bg-gray-100 rounded-md w-[50%] h-[auto] pb-1 overflow-hidden`}>
                <label htmlFor="file1">
                  <div css={tw`flex justify-center items-center`}>
                    <img css={tw``} src={refresh} width={`5%`}></img>
                    <div css={tw`flex justify-center text-xs font-bold`}>다시 고르기</div>
                  </div>
                  <div css={tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] ml-[3%] w-[94%] flex justify-center items-center overflow-hidden`}>
                    <audio css={tw`flex justify-center`} src={URL.createObjectURL(selectedsoundFile)} controls controlsList="nodownload" style={{ maxWidth: "100%",}} />
                  </div>
                </label>
            </div>
        )}
  </div>
  );
};

export default SoundPicker;
