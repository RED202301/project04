import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    };
  
    return (
        <div className='w-[100vw] h-[100vh]' style={{backgroundColor:'#B6DBEE'}}>
            <p className='text-4xl pt-40 pb-40'>페이지를 찾을 수 없습니다.</p>
            <p className='text-2xl' onClick={goBack}>이전페이지로 돌아가기</p>
        </div>
    )
};

export default NotFound;
