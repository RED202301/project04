import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 상세 정보를 가져오는 API 요청
    fetch(`http://localhost:8080/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.articleTitle);
        setContent(data.longText);
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      articleId: id,
      articleTitle: title,
      longText: content,
    };

    fetch(`http://localhost:8080/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("게시물이 수정되었습니다.");
          navigate("/");
        } else {
          console.error("게시물 수정에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("요청 실패: " + error);
      });
  };

  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>상품 수정 폼</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="articleId">게시글 ID</label>
          <input
            type="text"
            id="articleId"
            name="articleId"
            className="form-control"
            value={id}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="articleTitle">게시글 명</label>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={false} // 수정 가능하도록 변경
          />
        </div>
        <div>
          <label htmlFor="longText">내용</label>
          <textarea
            id="longText"
            name="longText"
            className="form-control"
            style={{ height: "400px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mainrow">
          <div className="row">
            <div className="col">
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                저장
              </button>
            </div>
            <div className="col">
              <button
                className="w-100 btn btn-secondary btn-lg"
                type="button"
                // 여기에 취소 버튼 클릭 시 동작할 로직을 추가할 수 있습니다.
              >
                <a href={"/article"}>취소</a>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateArticle;
