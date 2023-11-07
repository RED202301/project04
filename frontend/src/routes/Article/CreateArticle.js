import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const [articleTitle, setArticleTitle] = useState("");
  const [longText, setLongText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('articleTitle', articleTitle);
    formData.append('longText', longText);
    formData.append('articleFileUrl', file);

    fetch("http://localhost:8080/articles/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 200) {
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
    <div className="container">
      <div className="py-5 text-center" style={{display:'flex', justifyContent:'center'}}>
        <h2>게시글 등록</h2>
      </div>
        
      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p htmlFor="articleName" style={{marginTop:'2%'}}>게시글 명</p>
          <input
            type="text"
            id="articleName"
            name="articleName"
            className="form-control"
            placeholder="이름을 입력하세요"
            value={articleTitle}
            style={{marginTop:'2%'}}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <p htmlFor="longText" style={{marginTop:'2%'}}>내용</p>
          <input
            type="text"
            id="longText"
            name="longText"
            className="form-control"
            style={{ height: "400px", marginTop:'2%'}}
            placeholder="내용을 입력하세요"
            value={longText}
            onChange={(e) => setLongText(e.target.value)}
          />
        </div>
        <div className="mainrow" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="row">
          <div className="col" style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" type="submit">
              <p style={{fontSize:'10px', width:'50px'}}>게시글 등록</p>
            </button>
          </div>
          <div className="col" style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="btn btn-secondary btn-lg"
              type="button"
              onClick={() => {
                window.location.href = "/article"; // 취소 버튼을 눌렀을 때 홈페이지로 이동
              }}
            >
              <p style={{fontSize:'10px', width:"20px"}}>취소</p>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
);
}

export default CreateArticle;
