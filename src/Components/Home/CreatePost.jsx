import React, { useState } from 'react'
import './CreatePost.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@mui/material'
import { IoMdImages } from "react-icons/io";
import ApiService from '../../Common/ApiService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const CreatePost = () => {

    const [postimageUpload, setPostImageUpload] = useState({});
    const navigate = useNavigate();

    const postBlog = async (value) => {

        let token = sessionStorage.getItem('token');
        let name = jwtDecode(token).username
        let mail = jwtDecode(token).email
        
        const payload = new FormData();
        console.log(postimageUpload);
        payload.append('file', postimageUpload)
        payload.append('tittle',value.tittle)
        payload.append('category',value.category)
        payload.append('desc',value.desc)
        payload.append('mail',mail)
        payload.append('name',name)
        console.log(payload);
        
        try {
            let res = await ApiService.post('/postfeed', payload,{
                headers:{"Content-Type":'multipart/form-data'},
            })
            if (res.status == 200) {
                toast.success('uploaded')
                navigate('/dashboard')
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
    return (
        <div className='createpost'>
            <div>
                <h3>Create Post</h3>
            </div>
            <div className='postcreateform'>
                <Formik
                    initialValues={
                        {
                            tittle: '',
                            desc: ' ',
                            category: '',
                        }
                    }
                    validationSchema={scheme}
                    onSubmit={(value) => {
                        postBlog(value);
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                        <form className='postform' onSubmit={handleSubmit}>
                            <div >
                                <input className='textFeild' name='tittle' onChange={handleChange} type='text' placeholder='Tittle' />
                            </div>
                            <div>
                                <select className='options' name='category' onChange={handleChange}>
                                    <option>Select</option>
                                    <option>edu</option>
                                    <option>sports</option>
                                </select>
                            </div>
                            <div>
                                <textarea className='postDesc' name='desc' onChange={handleChange} placeholder='Desc' />
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

export default CreatePost