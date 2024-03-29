import React, { useContext, useEffect, useState } from 'react'
import './PostView.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { HashLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import uploadImg from '../../image/profile/noimg.jpg'
import ApiService from '../../Common/ApiService';
import usernoImg from '../../image/profile/836.jpg'
const PostView = () => {
  const [feeds, setFeeds] = useState([]);
let params=useParams();

  const getLocalData = async (id) => {
    try {
        let res=await ApiService.get(`getUpdatefeed/${id}`)
        let data=res.data.updateFeed;
        setFeeds(data)
    } catch (error) {
        console.log(error);
    }
}

  useEffect(() => {
    getLocalData(params.id);
  }, [])

  return (
    <section>
      <div className='PostViewcardParent'>
        {
          feeds ? 
             <div className='postViewCardMyPost'>
              <div className='postImgCon' >
                <img className='postViewpostImg' src={feeds.imageUrl ? feeds.imageUrl : uploadImg} />
              </div>
              <div className='postViewTittle'>
                <h4>{feeds.tittle ? feeds.tittle : ''}</h4>
              </div>
              <div className='postViewDes'>
                <p>{feeds.desc ?feeds.desc : ''}</p>
              </div>
              <div className='postViewcardFooter'>
                <div className='footerProfile'>
                  <div className='Feedscardpic'>
                     {/* <img className='feedimg' src={params.img?params.img:usernoImg} /> */}
                  </div>
                  <div>
                    <p className='postcreatedby'>{feeds.name}</p>
                  </div>
                </div>

                <div className='category'>
                  <Link>{feeds.category}</Link>
                </div>
              </div>
            </div>
          : <><HashLoader color="#36d7b7" /> No Data Found</>
        }
      </div>
    </section>
  )
}

export default PostView