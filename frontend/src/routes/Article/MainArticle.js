import React, { useState, useEffect } from "react";
import './Article.css';
import { Link } from "react-router-dom";


function MainArticle() {
  const [articles, setArticles] = useState([]); // articles 상태 변수를 정의하여 게시글 목록을 저장
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해주고, 항상 두 자릿수를 유지하기 위해 slice(-2)를 사용
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
  }
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    fetch("http://192.168.30.218:8080/api/v1/articles/my", {
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
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 로드될 때만 실행
  //  console.log(articles)
  return (
    <div className="container" style={{fontFamily:"omyuPretty"}}>

    <div style={{width:'100%', height:'80%'}}>

      <div  className="py-5 text-center" style={{marginTop:'5%', display:'flex',justifyContent:"center"}}>
        <h2>문의게시글</h2>
        
      </div>


      <div className='maintables'>
        <table className="table">
          <thead>
            <tr style={{width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr',textAlign:'center'}}>
              <p >ID</p>
              <p >제목</p>
              <p >작성자</p>
              <p >날짜</p>
            </tr>
          </thead>
          <div>
           {articles.length > 0 && articles.map((data) => {
         console.log(data)
         return <tr className="rowborder" key={data.articleId}>
          <td className='rowpadding'>
            <Link to={`/article/${data.articleId}`} style={{color:'white'}}>
              {data.articleId}
            </Link>
          </td>
        <td className='rowpadding'>
          <Link to={`/article/${data.articleId}`} style={{color:'white'}}>
            {data.articleTitle}
          </Link>
        </td>
        <td className='rowpadding'>{data.articleWriter}</td>
        <td className='rowpadding'>{formatDate(data.date)}</td>
        </tr>
} )} 
          </div>

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
