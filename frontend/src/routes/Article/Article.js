import React, { useState, useEffect } from "react";
import {Outlet, useParams } from "react-router-dom";

function Article() {
  const {id} = useParams();
  
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  }, [id]);

  return (
    <div style={{ width: '100%', padding: '5%', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '5%' }}>게시글 상세</h2>

      <div style={{ marginBottom: '2%' }}>
        <label htmlFor="articleId">게시글 ID</label>
        <input
          type="text"
          id="articleId"
          name="articleId"
          style={{ width: '100%', marginTop:'2%' }}
          value={id}
          readOnly
        />
      </div>
  
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '40%' }}>
          <label htmlFor="articleName">게시글 명</label>
          <input
            type="text"
            id="articleName"
            name="articleName"
            style={{ width: '100%', marginTop:'2%' }}
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
            style={{ width: '100%', marginTop:'2%' }}
            value={article.articleSender}
            readOnly
          />
        </div>

        <div style={{ width: '25%' }}>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            name="date"
            style={{ width: '100%', marginTop:'2%' }}
            value={article.date}
            readOnly
          />
        </div>
      </div>

      <div style={{ marginTop: '2%' }}>
        <label htmlFor="longText">내용</label>
        <textarea
          id="longText"
          name="longText"
          style={{ width: '100%', height: '400px',marginTop:'2%' }}
          value={article.longText}
          readOnly
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2%' }}>
        <button style={{ width: '45%', marginTop:'2%' }}>
          <a href={`/article/Update/${article.articleId}`}>게시글 수정</a>
        </button>
        <button style={{ width: '45%',marginTop:'2%' }}>
          <a href={`/article`}>목록으로</a>
        </button>
      </div>
    </div>
  );
}

export default Article;
