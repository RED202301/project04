import React from 'react';
import axios from 'axios';


const base_URL = import.meta.env.VITE_BACK_SERVER_URL;
const Logout: React.FC = () => {

    const accessToken = localStorage.getItem('accessToken');
        const logOut = () => {
        axios.get(
        `${base_URL}/logout`, 
        {headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }
        )
        .then((response) => {
            console.log("응답 확인", response);
            localStorage.removeItem("accessToken");
            alert('로그아웃 완료')
            location.reload();
            window.location.replace('/');
            })
        };
    
        return (
            <div>
                <p onClick={logOut}>로그아웃</p>
            </div>
        )
    }
      

export default Logout;