import React, { useState, useEffect } from "react";
import {Outlet, useParams, useNavigate } from "react-router-dom";

function Article() {
  const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해주고, 항상 두 자릿수를 유지하기 위해 slice(-2)를 사용
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  }
  const {id} = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    articleTitle: "",
    articleWriter: "",
    date: "",
    longText: ""
  });
  const accessToken = localStorage.getItem("accessToken")
  

  useEffect(() => {
    fetch(`${back_base_URL}/api/v1/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.data);
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`${back_base_URL}/api/v1/articles/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if(response.ok) {
        alert("게시글이 삭제되었습니다.");
        navigate("/article");
      } else {
        throw new Error("게시글 삭제에 실패했습니다.");
      }
    })
    .catch(error => console.error("요청 실패: " + error));
  }

  return (
    <div style={{display:'flex', justifyContent:'center', width:'100%', height:'100%'}}>
    <div className="maintable" style={{fontFamily:"omyuPretty"}}>
      <h2 style={{ textAlign: 'center', marginTop:'5%',marginBottom: '5%' }}>건의사항 상세</h2>

      <div style={{ marginBottom: '2%'}}>
        {/* <label htmlFor="articleId">게시글 ID</label> */}
        <input
          type="text"
          id="articleId"
          name="articleId"
          style={{ width: '100%', marginTop:'2%', backgroundColor:'#083C0D', boxSizing:'border-box', border:'none', color:'white' }}
          value={id}
          readOnly
        />
      </div>
  
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%' }}>
          <label htmlFor="articleName">제목</label>
          <input
            type="text"
            id="articleName"
            name="articleName"
            style={{color:'white', width: '100%', marginTop:'2%', backgroundColor:'#083C0D', border:'2px solid white' }}
            value={article.articleTitle}
            readOnly
          />
        </div>

        <div style={{ width: '25%' }}>
          <label htmlFor="articleSender">작성자</label>
          <input
            type="text"
            id="articleSender"
            name="articleSender"
            style={{color:'white', width: '100%', marginTop:'2%', border:'none', backgroundColor:'#083C0D',boxSizing:'border-box' }}
            value={article.articleWriter}
            readOnly
          />
        </div>

        <div style={{ width: '25%' }}>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            name="date"
            style={{color:'white', width: '100%', marginTop:'2%', border:'none', backgroundColor:'#083C0D',boxSizing:'border-box' }}
            value={formatDate(article.date)}
            readOnly
          />
        </div>
      </div>

      <div style={{ marginTop: '2%', height:'55%' }}>
        <label htmlFor="longText">건의 사항</label>
        <textarea
          id="longText"
          name="longText"
          style={{color:'white', width: '100%', height: '100%',marginTop:'2%', boxSizing:'border-box',border:'2px solid white' ,backgroundColor:'#083C0D' }}
          value={article.longText}
          readOnly
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2%' }}>
      
          <a href={`/article`} style={{ marginLeft:'5%', color:'white', marginTop:'15%', width:'120px', height:'15px', backgroundColor:'#083C0D' }}>목록으로</a>
    
        <button className="yellowchalk">
          <a href={`/article/Update/${article.articleId}`} style={{ color:'white'}}>수정하기</a>
        </button>

        <button className="eraser" onClick={handleDelete}><span style={{fontSize:'15px'}}>삭제</span>
        </button>
      </div>
    </div>
    </div>
  );
}

export default Article;
