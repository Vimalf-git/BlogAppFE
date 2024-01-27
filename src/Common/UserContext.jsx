import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import ApiService from './ApiService';

export const UserDataGlobal = React.createContext();
function UserContext({children}){
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("")
    const [UploadprofileImg, setUploadProfileImg] = useState();
    const [profilePic, setProfilePic] = useState();
    const[feedData,setFeedData]=useState([]);
    const [myPost,setMyPost]=useState([]);
    const getData=async()=>{
        try {
            let token = sessionStorage.getItem('token');
            let userMail=jwtDecode(token).email
            let res=await ApiService.get(`/getUser/${userMail}`);
            if(res.status==200){

                setUsername(res.data.user.username);
                setMail(res.data.user.email);
                setProfilePic(res.data.user.profileImgUrl)
            }

// Dashboard
        const resFeed = await ApiService.get('/allfeeds');
        console.log(resFeed.data.feeds);
        let resUserList = await ApiService.get('/getuserlist');
        console.log(resUserList.data.userList);
      if (resFeed.status == 200) {
        // setFeedData(resFeed.data.feeds)
        let userList=resUserList.data.userList;
        let feedsList=resFeed.data.feeds;
        let sam=[]
        for(let j=0;j<userList.length;j++){
             for(let i=0;i<feedsList.length;i++){
                const obj={}
                console.log(userList[j]);
                console.log(feedsList[i]);
                console.log(userList[j].mail==feedsList[i].mail);
                if(userList[j].mail==feedsList[i].mail){
                    console.log("enter into loop");
                    obj['category']=feedsList[i].category?feedsList[i].category:'',
                    obj['desc']=feedsList[i].desc?feedsList[i].desc:'',
                    obj['imageUrl']=feedsList[i].imageUrl?feedsList[i].imageUrl:'',
                    obj['mail']=feedsList[i].mail?feedsList[i].mail:'',
                    obj['username']=feedsList[i].name?feedsList[i].name:'',
                    obj['tittle']=feedsList[i].tittle?feedsList[i].tittle:'',
                    obj['_id']=feedsList[i]._id?feedsList[i]._id:'',
                    obj['profilePic']=userList[j].profilePic?userList[j].profilePic:''
                    sam.push(obj)
                   }
                //    console.log(obj);
            }
        }
        console.log(sam);
        setFeedData(sam)
        }
        // mypost
        
        
        
    }catch (error) {
            
        }
    }

    
   useEffect(()=>{
    getData()
   },[])
   console.log(feedData);
    return(
        <UserDataGlobal.Provider value={{username,setUsername,feedData,myPost,
            setMyPost, mail,UploadprofileImg,profilePic,setUploadProfileImg,getData}}>
            {children}
        </UserDataGlobal.Provider>
    )
}

export default UserContext