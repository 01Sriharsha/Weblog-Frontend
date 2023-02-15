import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { CustomContext } from '../context/AuthContext';
import { getAllPostByUser } from '../api/apiService';
import { toast } from 'react-toastify';
import Post from "./new-feed/Post"
import { deleteThePost } from '../api/jwtService';
import { IoAdd, IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {

    const context = CustomContext();

    const navigate = useNavigate();

    const TOAST_PROP = { position: "top-center", hideProgressBar: true };

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPostByUser(context?.user.id).then(res => {
            setPosts(res.data.content);
        }).catch(err => {
            console.log(err);
            toast.error("Error Loading Posts!!", { position: "top-center", hideProgressBar: true })
        })
    }, [])

    const deletePost = (id) => {
        deleteThePost(id).then(res => {
            console.log(res);
            toast.success("Post Deleted Successfully!! ", TOAST_PROP)
            //update the content array of posts after deletion
            let newPosts = posts.filter(post => {
                console.log(id);
                console.log(post.id);
                return id !== post.id
            });
            setPosts([...newPosts])
        }).catch(err => {
            console.log(err)
            toast.success("Something went wrong!! Please try againn later ", TOAST_PROP)
        })
    }

    return (
        <div className='user-dashboard'>
            <h1 className='my-3 text-center'>Hi, {context?.user.username}</h1>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className='p-3 fw-bold'>Your Posts</h2>
                <div className='d-flex align-items-center gap-2 new-post' onClick={()=>navigate("/user/add-post")}>
                    <IoAdd size={'2rem'} color="success" />
                    <span className='fs-5'>New Post</span>
                </div>
            </div>

            <div className="">
                {
                    posts?.map(post => (
                        <Post post={post} key={post.id} deletePost={deletePost} />
                    ))
                }
            </div>
        </div>

    )
}
