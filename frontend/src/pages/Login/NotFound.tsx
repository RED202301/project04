import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tw from "twin.macro";


const twStyles = [tw`bg-gray-100 h-[100vh] `]
const NotFound: React.FC = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    };
return (
  <div css={twStyles} style={{
        maxWidth: "500px",
        minWidth: "200px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#59B379",
    }}>
        {/* <GlobalStyles></GlobalStyles> */}
        <div css={tw``}></div>
        <div>
            <h2 css={tw`flex justify-center text-4xl`}>페이지를 찾을 수 없습니다.</h2>
            <p css={tw`flex justify-center text-2xl`} onClick={goBack}>이전페이지로 돌아가기</p>
        </div>
        <div className="">
        </div>
    </div>
);
};


export default NotFound;
