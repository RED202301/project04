import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";

// const base_URL = import.meta.env.VITE_SERVER_URL;

const Login2: React.FC = () => {

  return (
    <div className="w-[100vw] h-[100vh]" style={{ backgroundColor: "#B6DBEE" }}>
      <h2>로그인 리다이렉트 페이지</h2>
      <Link
        to="/"
        className="text-5xl text-gray-600 fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden rounded-xl w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%]"
      >
        돌아가기
      </Link>
    </div>
  );
};

export default Login2;
