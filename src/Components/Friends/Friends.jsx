import React, { useEffect, useState } from 'react'
import './Friends.css'
import ApiService from '../../Common/ApiService'
import { jwtDecode } from 'jwt-decode';
import { HashLoader } from 'react-spinners';
import { Login } from '@mui/icons-material';
const Friends = () => {
    const [userList, setUserList] = useState([]);
    const getUserList = async () => {
        let token = sessionStorage.getItem('token');
        let name = jwtDecode(token).username
        try {
            let res = await ApiService.get('/getuserlist');
            console.log(res);
            if (res.status == 200) {
                console.log(res.data.userList);
                let filterList = res.data.userList.filter((e) => e.name != name);
                console.log(filterList);
                setUserList(filterList);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getUserList()
    }, [])
    console.log(userList);
    return (
            <div className='frndslist'>
                {userList.length>0? userList.map((e) => {
                    return <div className='frndsCard'>
                        <div className='frndscardpic'>
                            <img className='frdimg' src={e.profilePic} />
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