import { Avatar, Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import './NavBar.css'
import { Logout } from '@mui/icons-material';
import { UserDataGlobal } from '../../Common/UserContext';
import hero from '../../image/profile/836.jpg'
import { FaHamburger } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import useLogout from '../../Common/useLogout'
const NavBar = () => {

  const [avatarPopUp, setAvatarPopUp] = useState(false);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  const logout = useLogout()
  const { username, profilePic } = useContext(UserDataGlobal)

  const [hamBurger, setHamBurger] = useState(false);
  const navigate=useNavigate()
  return (
    <>
      <header className='navbar'>
        <div className='logo'>
          <Link to={"/allpost"}><h4 style={{ fontFamily: 'Rubik Burned' }}>BlogApp</h4>
          </Link>
        </div>
        <div className='listMenu'>
          {/* <ul> */}
          <Link to={"/dashboard"}>Feed</Link>
          <Link to={"/mypost"}>MyPost</Link>
          <Link to={"/postcreate"}>Create</Link>
          <Link to={"/friendsList"}>Friends</Link>
          {/* </ul> */}
        </div>
        <div className='avatarProfile' onClick={() => { setAvatarPopUp(pre => !pre) }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar className='avatarIcon' src={profilePic ? profilePic : hero}>{!profilePic && username}</Avatar>
          </StyledBadge>
          <span style={{ color: '#ffff' }}>{username}</span>
        </div>
        {avatarPopUp ?
          <div className='avatarPop'>
            <Link to={'/profile'}>Profile</Link>
            <Button onClick={() => { logout() }}><Logout className='logouticon' /> &nbsp;Logout</Button>
          </div> :
          <></>}
      </header>
      <header className='mobViewNavbar'>
        <div className='mobviewLoglogo'>
          <Link to={"/allpost"}><h4 style={{ fontFamily: 'Rubik Burned' }}>BlogApp</h4>
          </Link>
        </div>


        {hamBurger ? <IoMdCloseCircle className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} /> :
          <FaHamburger className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} />
        }
        {hamBurger ? <div className='mobviewSdBar'>
          <div className='mobViewavatarProfile' onClick={() => { navigate('/profile') }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar className='avatarIcon' src={profilePic ? profilePic : hero} >{!profilePic && username}</Avatar>
            </StyledBadge>
            <span style={{ color: 'black',fontSize:'1.5rem',fontWeight:'600' }}>{username}</span>
          </div>
          <div className='mobViewlistMenu'>
            {/* <ul> */}
            <Link to={"/dashboard"}>Feed</Link>
            <Link to={"/mypost"}>MyPost</Link>
            <Link to={"/postcreate"}>Create</Link>
            <Link to={"/friendsList"}>Friends</Link>
            <Button onClick={() => {  }}><Logout /> &nbsp;Logout</Button>
            {/* </ul> */}
          </div>

        </div> : <></>}
        {/* {avatarPopUp ?
          <div className='avatarPop'>
            <Link to={'/profile'}>Profile</Link>
          </div> :
          <></>} */}
      </header>
    </>
  )
}

export default NavBar