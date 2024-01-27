import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/SignUp'
import ForgotPass from './Components/ForgotPassword/ForgotPass'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Dashboard from './Components/Dashboard/Dashboard'
import CreatePost from './Components/Home/CreatePost'
import NavBar from './Components/NavBar/NavBar'
import Friends from './Components/Friends/Friends'
import MyPost from './Components/MyPost/MyPost'
import { Navbar } from 'react-bootstrap'
import UserProfile from './Components/UserProfile/UserProfile'
import UserContext from './Common/UserContext'
import EditPost from './Components/EditPost/EditPost'
import PostView from './Components/PostView/postView'
// import { Home } from '@mui/icons-material'
// import { Dashboard } from '@mui/icons-material'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/login' element={<><Login /></>} />
          <Route path='/signup' element={<><Signup /></>} />
          <Route path='/forgetpassword' element={<><ForgotPass /></>} />
          <Route path='/resetpassword/*' element={<><ResetPassword /></>} />
          <Route path='/dashboard' element={<div className='main'>
            <UserContext>
            <NavBar/><Dashboard />
            </UserContext>
            </div>} />
          <Route path='/postcreate' element={
            <UserContext>
          <div className='main'>
            <NavBar/>
            <CreatePost />
           </div>
           </UserContext>
           } />
          <Route path='/friendsList' element={<div className='main'>
           <UserContext>
           <NavBar/><Friends/>
           </UserContext>
            </div>} />
          <Route path='/mypost' element={<>
          <UserContext>
          <NavBar/><MyPost/>
          </UserContext>
          </>} />
          <Route path='/profile' element={<><UserContext>
            <NavBar/><UserProfile/>
            </UserContext></>} />
          <Route path='/editfeed/:id' element={<>
            <UserContext>
            <NavBar/>
          <EditPost/>
          </UserContext>
          </>} />
          <Route path='/postview/:id' element={<>
          <UserContext>
            <NavBar/>
              <PostView/>
          </UserContext>
          </>} />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App
