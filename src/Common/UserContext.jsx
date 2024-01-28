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
    const [userList, setUserList] = useState([]);
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
        let resUserList = await ApiService.get('/getuserlist');
      if (resFeed.status == 200) {
        let userList=resUserList.data.userList;
        let feedsList=resFeed.data.feeds;
        let sam=[]
        for(let j=0;j<userList.length;j++){
             for(let i=0;i<feedsList.length;i++){
                const obj={}
                if(userList[j].mail==feedsList[i].mail){
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
            }
        }
        
        setFeedData(sam)
        }
        // mypost
        
        
        
    }catch (error) {
            
        }
    }
    const getUserList = async () => {
        try {
            let res = await ApiService.get('/getuserlist');
            if (res.status == 200) {
                let filterList = res.data.userList.filter((e) => e.name != username);
                setUserList(filterList);
            }
        } catch (error) {

        }
    }
    
   useEffect(()=>{
    getData()
    getUserList()
   },[])
    return(
        <UserDataGlobal.Provider value={{userList,username,setUsername,feedData,myPost,
            setMyPost, mail,UploadprofileImg,profilePic,setUploadProfileImg,getData,getUserList}}>
            {children}
        </UserDataGlobal.Provider>
    )
}

export default UserContext