import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;

    // 상세 정보를 가져오는 API 요청
    fetch(`${back_base_URL}/api/v1/articles/${id}`)
      .then((response) => response.json())
      
      .then((data) => {
        console.log(data)
        setTitle(data.data.articleTitle);
        setContent(data.data.longText);
        console.log(data.data.articleTitle);
        console.log(data.data.longText);
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // title이랑 content값이 null 일때 alert
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    const data = {
  
      articleTitle: title,
      longText: content,
    };

    fetch(`${ba}}/api/v1/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("게시물이 수정되었습니다.");
          navigate("/article");
        } else {
          console.error("게시물 수정에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  };

  return (
    <div className="maintable" style={{fontFamily:'omyuPretty'}}>
      <div style={{display:'flex', justifyContent:'center', marginTop:'5%'}}>
        <h2>수정하겠습니다!!</h2>
      </div>
      <form onSubmit={handleSubmit} style={{height:'75%'}}>
        <div>
          <p htmlFor="articleId">게시글 ID</p>
          <input
            type="text"
            id="articleId"
            name="articleId"
            className="form-control"
            style={{border:'none', backgroundColor:'#083C0D', color:'white'}}
            value={id}
            readOnly
          />
        </div>
        <div >
          <p htmlFor="articleTitle" >제목</p>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            className="form-control"
            value={title}
            style={{color:'white', width: '100%',marginTop:'2%', boxSizing:'border-box',border:'2px solid white' ,backgroundColor:'#083C0D' }}

            onChange={(e) => setTitle(e.target.value)}
            disabled={false} // 수정 가능하도록 변경
          />
        </div>
        <div style={{height:'80%'}}>
          <p htmlFor="longText" style={{marginTop:'3%'}}>내용</p>
          <textarea
            id="longText"
            name="longText"
            className="form-control"
            style={{color:'white', width: '100%', height: '100%',marginTop:'2%', boxSizing:'border-box',border:'2px solid white' ,backgroundColor:'#083C0D' }}

            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mainrow">
          <div className="updaterow">
            <div className="col">
              <button  onClick={handleSubmit} style={{color:'white', width: '100px', height:'15px',marginTop:'10%', backgroundColor:'#083C0D' }}>
                
                저장
              </button>
            </div>
            <div className="col">
              <button
               style={{width: '100px', height:'15px',marginTop:'10%', backgroundColor:'#083C0D' }}
                type="button"
                // 여기에 취소 버튼 클릭 시 동작할 로직을 추가할 수 있습니다.
              >
                <a href={"/article"} style={{color:'white'}}>취소</a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateArticle;
