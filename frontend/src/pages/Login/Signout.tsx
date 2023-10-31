import React from 'react';
import axios from 'axios';


const base_URL = import.meta.env.VITE_SERVER_URL;
const Signout: React.FC = () => {

    const accessToken = localStorage.getItem('accessToken');
        const signOut = () => {
        axios.get(
        `${base_URL}/api/v1/oauth/`, 
        {headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }
        )
        .then((response) => {
            console.log("응답 확인", response);
            localStorage.removeItem("accessToken");
            alert('탈퇴 완료')
            location.reload();
            window.location.replace('/');
            })
        };
    
        return (
            <div>
                <p onClick={signOut}>회원탈퇴</p>
            </div>
        )
    }
      

export default Signout;