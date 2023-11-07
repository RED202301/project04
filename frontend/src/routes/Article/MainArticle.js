import React, { useState, useEffect } from "react";
import './Article.css';
import { Link } from "react-router-dom";


function MainArticle() {
  const [articles, setArticles] = useState([]); // articles 상태 변수를 정의하여 게시글 목록을 저장

  useEffect(() => {
    // 홈페이지가 로드될 때 GET 요청을 보냅니다.
    fetch("http://localhost:8080/articles")
      .then((response) => response.json())
      .then((data) => {
        setArticles(data); // 게시글 목록을 상태 변수에 설정
      })
      .catch((error) => {
        console.error("요청 실패: " + error, articles);

      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 로드될 때만 실행
   console.log(articles)
  return (
    <div className="container">
<div style={{width:'100%', height:'130px',backgroundSize:'cover'}}>

      <div  className="py-5 text-center">
        <h2>문의게시글</h2>
        
      </div>


      <div className='maintable'>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '20%' }}>제목</th>
              <th style={{ width: '10%' }}>작성자</th>
              <th style={{ width: '10%' }}>날짜</th>
            </tr>
          </thead>
          <tbody>
          {articles.map((article) => (
        <tr className="rowborder" key={article.articleId}>
          <td className='rowpadding'>
            <Link to={`/article/${article.articleId}`}>
              {article.articleId}
            </Link>
          </td>
        <td className='rowpadding'>
          <Link to={`/article/${article.articleId}`}>
            {article.articleTitle}
          </Link>
        </td>
        <td className='rowpadding'>{article.articlesender}</td>
        <td className='rowpadding'>{article.date}</td>
        </tr>
      ))}
          </tbody>

        </table>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <div className="col">
          
            <a className="font" href={"/article/Create"}><button className="chalk">글쓰기 </button></a>
          
        </div>
      </div>
      </div>
      </div>
   
  );
}

export default MainArticle;
