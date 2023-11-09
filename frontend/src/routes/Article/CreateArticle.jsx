import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;

  const [articleTitle, setArticleTitle] = useState("");
  const [longText, setLongText] = useState("");
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!articleTitle || !longText) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    
    const data = {
      articleTitle: articleTitle,
      longText: longText,
    };
  
    fetch(`${back_base_URL}/api/v1/articles`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data),
    })

    .then((response) => {
      if (response.ok) {
        console.log("게시물이 추가되었습니다.");
        navigate("/article");
      } else {
        console.error("게시물 추가에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("요청 실패: " + error);
    });
  };
  
  
  
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
  return (
    <div className="maintable" style={{fontFamily:'omyuPretty'}}>
      <div className="py-5 text-center" style={{marginTop:'5%', display:'flex', justifyContent:'center'}}>
        <h2>건의합니다!!</h2>
      </div>
        
      <form onSubmit={handleSubmit} style={{height:'75%'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <p htmlFor="articleName" style={{marginTop:'2%'}}>제목</p>
          <input
            type="text"
            id="articleName"
            name="articleName"
            className="form-control"
            placeholder="제목을 입력하세요"
            value={articleTitle}
            style={{ color:'white', width: '100%',marginTop:'2%', boxSizing:'border-box',border:'2px solid white' ,backgroundColor:'#083C0D' }}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div style={{ width:'100%', height:'100%', display: 'flex', flexDirection: 'column'}}>
          <p htmlFor="longText" style={{marginTop:'2%'}}>건의사항</p>
          <textarea
            type="text"
            id="longText"
            name="longText"
            className="form-control"
            style={{resize: 'none' ,color:'white',alignItems:'flex-start', width: '100%', height: '100%',marginTop:'2%', boxSizing:'border-box',border:'2px solid white' ,backgroundColor:'#083C0D' }}
            placeholder="건의사항을 입력하세요"
            value={longText}
            onChange={(e) => setLongText(e.target.value)}
          />
        </div>
        <div className="mainrow">
        <div className="updaterow" style={{marginTop:'8.5%'}}>
        <div className="col" style={{display:'flex', justifyContent:'center'}}>

            <div className="" type="submit" 
            style={{display:'flex',
            cursor:'pointer', 
            justifyContent:'center', 
            width: '30%',
             height:'10%', 
             backgroundColor:'#083C0D' }}>
              <p style={{color:'white'}} onClick={handleSubmit}>등록</p>
            </div>
        </div>
        <div className="col" style={{display:'flex', justifyContent:'center'}}>

            <div
              className=""
              type="button"
              style={{display:'flex', 
              justifyContent:'center',
              cursor:'pointer', 
              width: '30%', 
              height:'10%', 
              backgroundColor:'#083C0D' }}
              onClick={() => {
                window.location.href = "/article"; // 취소 버튼을 눌렀을 때 홈페이지로 이동
              }}
            >
              <p style={{ color:'white'}}>취소</p>
            </div>
            </div>
          </div>
        </div>
  
    </form>
  </div>
);
}

export default CreateArticle;
