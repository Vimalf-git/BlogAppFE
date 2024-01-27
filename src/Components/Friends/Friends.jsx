import React, { useEffect, useState } from 'react'
import './Friends.css'
import ApiService from '../../Common/ApiService'
import { jwtDecode } from 'jwt-decode';
import { HashLoader } from 'react-spinners';
import { Login } from '@mui/icons-material';
import userNonImg from '../../image/profile/836.jpg'
const Friends = () => {
    const [userList, setUserList] = useState([]);
    const getUserList = async () => {
        let token = sessionStorage.getItem('token');
        let name = jwtDecode(token).username
        try {
            let res = await ApiService.get('/getuserlist');
            if (res.status == 200) {
                let filterList = res.data.userList.filter((e) => e.name != name);
                setUserList(filterList);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserList()
    }, [])
    return (
            <div className='frndslist'>
                {userList.length>0? userList.map((e) => {
                    return <div className='frndsCard'>
                        <div className='frndscardpic'>
                            <img className='frdimg' src={e.profilePic?e.profilePic:userNonImg} />
                        </div>
                        <div className='frndname'>
                            <h4>{e.name}</h4>
                        </div>
                    </div>
                }):<><HashLoader color="#36d7b7" /></>}
            </div>

    )
}

export default Friends