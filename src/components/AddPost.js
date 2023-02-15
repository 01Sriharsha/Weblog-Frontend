import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import JoditEditor from 'jodit-react'
import { getAllCategories } from '../api/apiService';
import { validatePost } from '../validation/validate';
import { CustomContext } from '../context/AuthContext';
import { createPost, uploadPostImage } from '../api/jwtService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {

    const context = CustomContext();

    const editor = useRef(null);

    const [categories, setCategories] = useState([]);

    const [image, setImage] = useState(null);

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [error, setError] = useState(null);

    useEffect(() => {
        retrieveAllCategory()
    }, [])

    const retrieveAllCategory = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => setPost({ ...post, [event.target.name]: event.target.value })

    //event data change doesn't work for JoditEditor
    const handleContentChange = (data) => setPost({ ...post, content: data });

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0].name)
        console.log(image);
    }

    const handleSubmit = async (event) => {
        //handle validation on every click
        const formError = {};
        validatePost(formError, post);
        setError(formError);
        //check whether if error message is still there
        if (!formError?.title && !formError?.content && !formError?.categoryId) {
            //create postDTO
            const postData = {
                postTitle: post.title,
                content: post.content
            }
            //get userID 
            const userId = context.user.id;

            //get categoryId
            const categoryId = post.categoryId;

            try {
                const response = await createPost(postData, userId, categoryId);
                //uploading image
                const postId = response.data.id
                //creating key value pair
                let formData = new FormData();
                formData.append('imageName', image);
                for (const [key, value] of formData) {
                    console.log(key + " " + value);
                }
                uploadPostImage(formData, postId).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }

            // handleReset();
        } else {
            event.preventDefault();
            console.log("not valid");
        }
    }

    //resetting the form
    const handleReset = () => setPost({ title: '', content: '', categoryId: '0' });

    return (
        <div className='flex-center'>
            {<Form className='p-3 shadow bg-light w-100'>
                <h2 className="text-center">Add a New Post</h2>
                <FormGroup>
                    <Label for='title'>Title</Label>
                    <Input type='text' placeholder='Enter title' id='title' name='title' value={post.title} onChange={handleChange} />
                    <span className='text-danger' style={{ fontSize: '0.75rem' }}>{error?.title}</span>
                </FormGroup>
                <FormGroup>
                    <Label for='content'>Content</Label>
                    <JoditEditor name='content' ref={editor} value={post.content} id='content' onChange={newContent => handleContentChange(newContent)} />
                    <span className='text-danger' style={{ fontSize: '0.75rem' }}>{error?.content}</span>
                </FormGroup>
                <FormGroup>
                    <Label for='image'>Upload Image</Label>
                    <Input name='image' id='image' type='file' onChange={handleFileChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='category'>Category</Label>
                    <Input type='select' name='categoryId' placeholder='Enter title' id='category' onChange={handleChange} defaultValue={'0'}>
                        <option value={'0'}>--Select Category--</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>
                                    {category.categoryTitle}
                                </option>
                            )
                        })}
                    </Input>
                    <span className='text-danger' style={{ fontSize: '0.75rem' }}>{error?.categoryId}</span>
                </FormGroup>
                <span className='flex-center gap-3'>
                    <Button color='secondary' className='w-25 mt-3 mb-2' onClick={handleReset} >Reset</Button>
                    <Button color='success' className='w-25 mt-3 mb-2' onClick={handleSubmit} >Post</Button>
                </span>
            </Form>
            }
        </div>
    )
}
