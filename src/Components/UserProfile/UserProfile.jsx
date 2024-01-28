import React, { useContext, useEffect, useRef, useState } from 'react'
import './UserProfile.css'
// import hero from '../../image/profile/vimal.png'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Button } from 'react-bootstrap';
import { TextField } from '@mui/material';
import ApiService from '../../Common/ApiService'
import { UserDataGlobal } from '../../Common/UserContext'
import hero from '../../image/profile/836.jpg'
const UserProfile = () => {
  const { username,
    mail, UploadprofileImg, profilePic,
     setUploadProfileImg,getData , getUserList
    } = useContext(UserDataGlobal)
  const [localname, setLocalname] = useState();
  const updateProfile = async () => {
    let payload = new FormData();
    payload.append('profilePic', UploadprofileImg?UploadprofileImg:null);
    payload.append('email', mail)
    payload.append('username', localname);
    const res = await ApiService.put('/updateprofile', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if(res.status==200){
      getData()
    }
  }
  useEffect(()=>{
    setLocalname(username)
    getUserList()
  },[])
  return (
    <div className='userProfile'>
      <div className='tittle'><h4>My Profile</h4></div>
      <div className='userImgCom'>
        <div className='userImgDesign'>
          {/* {profilePic ?  */}
          <img className='userImg' src={profilePic?profilePic:hero} />
            {/* // : <div className='emptyImg'></div>} */}
        </div>
        <div onClick={() => document.querySelector(".uploadProfilrImg").click()}>
          <input type='file' className='uploadProfilrImg' accept='.jpeg, .png, .jpg'
            onChange={(e) => { setUploadProfileImg(e.target.files[0]) }} hidden />
          <div className='editiconConPro'>
            <BorderColorIcon className='profilEditIcon' />
          </div>
        </div>
      </div><br />
      <div className='personInfo'>
        <h4>Personal Info</h4>
        <TextField  className='profileInput' value={localname} onChange={(e) => { setLocalname(e.target.value) }}
          id="outlined-basic"  variant="outlined" />
        <TextField  type='text' className='profileInput' placeholder='' value={mail} disabled />
        <Button onClick={updateProfile}>SaveChange</Button>
      </div>

      <div></div>
    </div>
  )
}

export default UserProfile