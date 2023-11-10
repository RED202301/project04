import React, { useState, useEffect } from "react";
import './Article.css';
import { Link } from "react-router-dom";

function MainArticle() {
  const back_base_URL = import.meta.env.VITE_BACK_SERVER_URL;

  const [articles, setArticles] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const articlesPerPage = 12; 

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`${back_base_URL}/api/v1/articles/my`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setArticles(data.data);
    })
    .catch((error) => {
      console.error("요청 실패: " + error);
    });
  }, []); 

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(articles.length / articlesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="container" style={{fontFamily:"omyuPretty"}}>
      <div style={{width:'100%', height:'80%'}}>
        <div className="py-5 text-center" style={{marginTop:'5%', display:'flex',justifyContent:"center"}}>
          <h2 sytle={{color:'black'}}>문의게시글</h2>
        </div>
        <div className='maintables'>
          <table className="table">
            <thead>
              <tr style={{width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr',textAlign:'center'}}>
                <td >ID</td>
                <td >제목</td>
                <td >작성자</td>
                <td >날짜</td>
              </tr>
            </thead>
            <tbody style={{marginTop:'5%'}}>
            {currentArticles.length > 0 && currentArticles.map((data) => {
              const displayTitle = data.articleTitle.length > 10 ? `${data.articleTitle.substring(0, 10)}...` : data.articleTitle;
              return (
                <tr className="rowborder" key={data.articleId}>
                  <td className='rowpadding'>
                    <Link to={`/article/${data.articleId}`} style={{color:'white'}}>
                      {data.articleId}
                    </Link>
                  </td>
                  <td className='rowpadding'>
                    <Link to={`/article/${data.articleId}`} style={{color:'white'}}>
                      {displayTitle}
                    </Link>
                  </td>
                    <td className='rowpadding'>{data.articleWriter}</td>
                    <td className='rowpadding'>{formatDate(data.date)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <div className="col">
            <a className="font" href={"/article/Create"}><button className="chalk">글쓰기 </button></a>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'-20%'}}>
        <button className="hover" style={{backgroundColor:'#083C0D', color: 'white'}} onClick={goToPreviousPage} disabled={currentPage === 1}>이전</button>
            <button className="hover" style={{backgroundColor:'#083C0D', color:'white'}} onClick={goToNextPage} disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}>다음</button>
          </div>
      </div>
    </div>
  );
}

export default MainArticle;
