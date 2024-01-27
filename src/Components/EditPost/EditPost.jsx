import React, { useContext, useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { IoMdImages } from "react-icons/io";
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import ApiService from '../../Common/ApiService'
import { UserDataGlobal } from '../../Common/UserContext';

const EditPost = () => {
    const {username,mail}=useContext(UserDataGlobal)

    const [postimageUpload, setPostImageUpload] = useState({});
    const navigate = useNavigate();
    let params = useParams()
    const updataPost = async (value) => {
        const payload = new FormData();
        console.log(postimageUpload);
        payload.append('file', postimageUpload)
        payload.append('tittle', value.tittle)
        payload.append('category', value.category)
        payload.append('desc', value.desc)
        payload.append('mail', mail)
        payload.append('name', username)
        payload.append('id',params.id)
        console.log(payload);

        try {
            let res = await ApiService.put('/updatepost', payload, {
                headers: { "Content-Type": 'multipart/form-data' },
            })
            if (res.status == 200) {
                toast.success('uploaded')
                navigate('/mypost')
            } else {
                toast.error(res.data)
            }
        } catch (error) {

        }
    }
    const scheme = Yup.object().shape({
        tittle: Yup.string(),
        desc: Yup.string(),
        category: Yup.string()
    })

    const [editData, setEditData] = useState(
        {
            tittle: '',
            desc: ' ',
            category: '',
        }
    );
    const getLocalData = async (id) => {
        console.log(id);
        try {
            let res=await ApiService.get(`getUpdatefeed/${id}`)
            console.log(res.data.updateFeed);
            let data=res.data.updateFeed;
            // console.log(myPost);
            // let val=myPost.filter((e)=>e._id==id);
            // console.log(val);
            let sam={
                tittle:data.tittle,
                desc:data.desc,
                category:data.category
            }
            setEditData(sam)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // myPostData()
        getLocalData(params.id);

    }, [])
    return (
        <div className='createpost'>
            <div>
                <h3> Update Post</h3>
            </div>
            <div className='postcreateform'>
                <Formik
                    enableReinitialize={true}
                    initialValues={editData}
                    validationSchema={scheme}
                    onSubmit={(value) => {
                        updataPost(value);
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                        <form className='postform' onSubmit={handleSubmit}>
                            <div >
                                <input className='textFeild' value={values.tittle} name='tittle' onChange={handleChange} type='text' placeholder='Tittle' />
                            </div>
                            <div>
                                <select className='options' value={values.category} name='category' onChange={handleChange}>
                                    <option>Select</option>
                                    <option>edu</option>
                                    <option>sports</option>
                                </select>
                            </div>
                            <div>
                                <textarea className='postDesc' value={values.desc} name='desc' onChange={handleChange} placeholder='Desc' />
                            </div>
                            <div className='imgsecpost' onClick={() => document.querySelector(".imgUpload").click()}>
                                <input className='imgUpload'
                                    onChange={(e) => { setPostImageUpload(e.target.files[0]) }}
                                    accept='.jpeg, .png, .jpg' type='file' hidden />
                                <IoMdImages className='faImg' />
                            </div>
                            <div className='postBtn'>
                                <Button variant='contained' type='submit'>Post</Button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default EditPost