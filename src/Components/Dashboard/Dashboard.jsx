import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import './Dashboard.css'
import ApiService from '../../Common/ApiService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
// import elephant from '../../image/Post/elephant-walking-road.jpg'
import { HashLoader } from 'react-spinners'
import { UserDataGlobal } from '../../Common/UserContext'
import uploadImg from '../../image/profile/noimg.jpg'
import usernonImg from '../../image/profile/836.jpg'
const Dashboard = () => {
  const navigate=useNavigate();
  // const [feeds, setFeeds] = useState([]);
  const{feedData,getData}=useContext(UserDataGlobal);
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='dashboard'>
      <div className='cardParent'>
        {
          feedData.length>0?feedData.map((e) => {
            return <div className='postCard' key={e._id} onClick={()=>{navigate(`/postview/${e._id}`)}} >
              <div className='postImgCon' >
                <img className='postImg' src={e.imageUrl?e.imageUrl:uploadImg} />
              </div>
              <div className='postTittle'>
                <h4>{e.tittle?e.tittle.length > 28 ? e.tittle.slice(0, 28) + '...' : e.tittle:''}</h4>
              </div>
              <div className='postDes'>
                <p>{e.desc?e.desc.length > 130 ? e.desc.slice(0, 130) + '...' : e.desc:''}</p>
              </div>
              <div className='cardFooter'>
                <div className='footerProfile'>
                  <div className='Feedscardpic'>
                    <img className='feedimg' src={e.profilePic?e.profilePic:usernonImg} />
                  </div>
                  <div>
                    <p className='postcreatedby'>{e.username}</p>
                  </div>
                </div>

                <div className='category'>
                  <Link>{e.category?e.category.length>9?e.category.slice(0,5)+'...':e.category:''}</Link>
                </div>
              </div>
            </div>
          }):<><HashLoader color="#36d7b7"/>No Data Found</>
        }
      </div>
    </div>
  )
}

export default Dashboard