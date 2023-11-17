import {useState} from "react";
import tw, {css} from "twin.macro";
import { useNavigate } from "react-router-dom";
// import file from "/file.png";
import man from "/man.png";
import refresh from "/refresh.png";
import FontStyles from "../View/styles/FontStyles";
import axios from "axios";
import {BiArrowBack} from "react-icons/bi"
import heic2any from "heic2any";

const AIphoto = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [aiphoto, setAiphoto] = useState('')
  const [aiphoto2, setAiphoto2] = useState('')
  const [similarity, setSimilarity] = useState(null)

  const back = () => {
    navigate(-1)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.name.split('.').includes('heic')) {
        heic2any({ blob: file, toType: 'image/jpeg' }).then((resultBlob) => {
          const convertedFile = new File([resultBlob as Blob], 'image.jpeg');
          if (index === 0) {
            setSelectedFile1(convertedFile);
          } else if (index === 1) {
            setSelectedFile2(convertedFile);
          }
        });
      } else {
        if (index === 0) {
          setSelectedFile1(file);
        } else if (index === 1) {
          setSelectedFile2(file);
        }
      }
    }
  };

  const base64toFile = (dataurl: string, fileName: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[0]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  const mix =() => {
    setLoading(true)
    const formData = new FormData()
    formData.append('img1', selectedFile1);
    formData.append('img2', selectedFile2)

    // axios.post('http://70.12.130.111:1557/upload', formData, {
    axios.post('https://send2u.site/upload', formData, {
      headers: {'Content-Type': 'multipart/form-data', charset: 'utf-8'},
  }).then(response => {
    setSimilarity(response.data.similarity * 100)

    const mix_img1 = response.data.mixed_img1
    const blob = new Blob([base64toFile(mix_img1, 'miximg1.png')])
    setAiphoto(URL.createObjectURL(blob))

    const mix_img2 = response.data.mixed_img2
    const blob2 = new Blob([base64toFile(mix_img2, 'miximg2.png')])
    setAiphoto2(URL.createObjectURL(blob2))
    setLoading(false);
  }).catch(err=>{
    (err)
    setLoading(false);
    alert('얼굴을 인식하지 못했습니다. 인물사진을 사용해주세요.')
  })
  };

  const handleDownload = (index: number) => {
    const link = document.createElement('a');
    if (index==0){
      link.href = aiphoto; 
      link.download = `AI_Photo_${index+1}.jpg`;
      link.click();
    }
    else {
    link.href = aiphoto2; 
    link.download = `AI_Photo_${index+1}.jpg`;
    link.click();
    }
  }

  const tw_photo_container = [
    tw`flex justify-center items-center`,
    tw`bg-white`,
    css({   
      maxWidth: `${innerWidth}px`,
      minHeight: `${innerHeight * 1/6}px`,
    })
  ]
  const tw_photo = [
    tw`flex justify-center`,
    css({
      maxWidth: "100%", 
      minWidth: "100%",
      maxHeight: `${innerHeight * 1/6}px`,
      overflow: "hidden",
    })
  ]

  const tw_container = [tw`w-full h-full bg-blue-50 flex flex-col justify-start font-[omyuPretty] text-black`]
  const tw_header_container = [tw`flex bg-white h-[8%] items-center`]
  const tw_before_container = [tw`border border-gray-400 border-dashed rounded-md mt-[auto] mb-[auto] h-[18vh] w-[47%] flex flex-col justify-center`]
  const tw_before_text = [tw`text-sm flex justify-center`]
  const tw_before_image = [tw`ml-[auto] mr-[auto] flex justify-center`]
  
  const tw_after_container = [tw`flex justify-center border border-gray-500 rounded-md overflow-hidden w-[100%]`]
  const tw_after_text = [tw`flex justify-center text-xs font-bold`]

  const tw_button = [tw`p-1 pr-2 pl-2 rounded-sm text-black bg-white border-black hover:text-black hover:border-black`]
  
  return (
      <div css={tw_container}>
          <FontStyles/>
          {/* header */}
        <div css={tw_header_container}>
            <div onClick={back} css={tw`flex ml-2`}><BiArrowBack/></div>
            <div css={tw`w-[90%] flex justify-center text-lg`}>AI 사진 합성</div>
        </div>
          {/* header */}
          
        <br/>
        <div css={tw`text-center`}>두 사람의 얼굴을 합성해주고 얼굴 유사도를 측정해주는 서비스입니다.</div>
        
        <div css={tw`h-full flex flex-col justify-around items-center`}>
            <div css={tw`flex justify-around w-[100%] h-[50px]`}>
              {/* img  */}
              {[selectedFile1, selectedFile2].map((selectedFile, index) => (
                <div css={tw`w-[280%]`} key={index}>
                  {!selectedFile ? (
                    <label htmlFor={`file${index}`} css={tw`flex justify-center`}>
                        <div css={tw_before_container}>
                          <div>
                            <p css={tw_before_text}>{index === 0 ? '인물사진1 업로드' : '인물사진2 업로드'}</p>
                            <img css={tw_before_image} src={man} width={`70%`} alt="Placeholder" />
                          </div>
                        </div>
                    </label>
                  ) : (
                      <div css={tw_after_container}>
                        <label htmlFor={`file${index}`} css={tw`w-[50%]`}>
                          <div css={tw`flex justify-center items-center`}>
                            <img css={tw``} src={refresh} width={`7%`} alt="Refresh Icon" />
                            <div css={tw_after_text}>다시 고르기</div>
                          </div>
                          <div css={tw_photo_container}>
                            <img css={tw_photo} src={URL.createObjectURL(selectedFile)} alt="Selected Image"  />
                          </div>
                        </label>
                      </div>
                  )}
                  <input
                    type="file"
                    name={`file${index}`}
                    id={`file${index}`}
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, index)}
                    style={{ display: "none" }} 
                  />
                </div>
              ))}
            </div>

            {/* 빈 div */}
            <div></div>
            <div></div>
            {/* 빈 div */}

            {/* 합성 버튼 */}
            <button onClick={mix} css={tw_button}>
              {loading ? "합성중..." : "합성"}
            </button>
            {/* 합성 버튼 */}

            
            {/* 결과 창 */}
            <div css={tw`flex justify-center w-[100%] h-[20px]`}>
                <div css={tw``}>
                  {similarity !== null &&(<div css={tw`flex justify-center`}>유사도: {similarity.toFixed(0)}%</div>)}
                    <div css={tw`flex`}>
                      {[aiphoto, aiphoto2].map((aiphotoSrc, index) => (
                        aiphotoSrc && (
                          <div key={index}>
                            <p css={tw`text-center`}>{index === 0 ? '사진2 베이스' : '사진1 베이스'}</p>
                            <img css={tw`w-[90%] h-auto m-2`} src={aiphotoSrc} alt={`AI Photo ${index + 1}`} onContextMenu={(e) => { e.stopPropagation(); }}/>
                            <div css={tw`flex justify-center`}>
                            <button css={tw_button} onClick={() => handleDownload(index)}>다운로드</button>
                            </div>
                          </div>
                          )
                      ))}
                    </div>
                    <br/>
                    {similarity !== null &&(<div css={tw`flex justify-center`}>재미로만 봐주세요.</div>)}
                </div>
            </div>
            {/* 결과 창 */}

            {/* 빈 div */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            {/* 빈 div */}
        </div>
      </div>
  );
};

export default AIphoto;
