import React, { useContext, useEffect, useState } from 'react'
import './MyPost.css'
import ApiService from '../../Common/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { HashLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import uploadImg from '../../image/profile/noimg.jpg'
import { UserDataGlobal } from '../../Common/UserContext';
const MyPost = () => {
  const {myPost,setMyPost}=useContext(UserDataGlobal)
  const [feeds, setFeeds] = useState([]);
  let navigate = useNavigate();
  const getAllFeed = async () => {
    let token = sessionStorage.getItem('token');
    let email = jwtDecode(token).email
    try {
      const res = await ApiService.get('/allfeeds');
      if (res.status == 200) {
        let filOwnPost = res.data.feeds.filter((e) => e.mail == email)
        setFeeds(filOwnPost)
      } else {

      }
    } catch (error) {

    }
  }
  // console.log(feeds);

  useEffect(() => {
    getAllFeed();
  }, [])
  const deleteFeed = async (id, index) => {
    let delArr = [...feeds];
    delArr.splice(index, 1);
    setFeeds(delArr);
    const res = await ApiService.delete(`/deletefeed/${id}`)
    if (res.status == 200) {
      toast.success(res.data.message);
    }
  }
  const editFeed=(id)=>{
    navigate(`/editfeed/${id}`)
  }
  return (
    <div>
      <div className='cardParent'>
        {
          feeds.length > 0 ? feeds.map((e, i) => {
            return <div className='postCardMyPost' key={e._id}>
              <div className='btns'>
                <Button className='editBtn' onClick={()=>editFeed(e._id)}>Edit</Button>
                <Button className='deleteBtn' onClick={() => deleteFeed(e._id, i)} >Delete</Button>
              </div>
              <div className='postImgCon' >
                <img className='postImg' src={e.imageUrl ? e.imageUrl : uploadImg} />
              </div>
              <div className='postTittle'>
                <h4>{e.tittle ? e.tittle.length > 28 ? e.tittle.slice(0, 28) + '...' : e.tittle : ''}</h4>
              </div>
              <div className='postDes'>
                <p>{e.desc ? e.desc.length > 130 ? e.desc.slice(0, 130) + '...' : e.desc : ''}</p>
              </div>
              <div className='cardFooter'>
                <div className='footerProfile'>
                  <div className='Feedscardpic'>
                    <img className='feedimg' src={e.profileImgUrl} />
                  </div>
                  <div>
                    <p className='postcreatedby'>{e.name}</p>
                  </div>
                </div>

                <div className='category'>
                  <Link>{e.category}</Link>
                </div>
              </div>
            </div>
          }) : <><HashLoader color="#36d7b7" /> No Data Found</>
        }
      </div>
    </div>
  )
}

export default MyPost