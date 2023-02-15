import { ErrorMessage, Field, Form, Formik } from 'formik'
import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, FormGroup, Label } from 'reactstrap';
import { getAllCategories } from '../src/api/apiService';
import { CustomContext } from '../src/auth/AuthContext';
import { validateCategory, validateContent, validateTitle } from '../src/validation/validate';
import InputComp from '../src/components/InputComp';

export default function AddPost() {

    const editor = useRef(null);

    const navigate = useNavigate();

    const context = CustomContext();

    const TOAST_POSITION = { position: "top-center" }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        retrieveAllCategories()
    }, [])

    const retrieveAllCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response?.data)
        } catch (error) {
            toast.error("Something went wrong!! Please try again later", TOAST_POSITION);
        }
    }

    console.log(categories);

    const handleSubmit = (values) => {
        console.log(values);

    }
    const validateForm = (values) => {
        console.log(values);
        const error = {};
        validateTitle(error, values);
        validateContent(error, values);
        validateCategory(error, values);
        return error;
    }

    const TextEditor = (props) => {
        const editor = useRef(null);
        const [content , setContent] = useState('');
        console.log(content);
        return <JoditEditor name="content" value={content}  ref={editor} onChange={(n)=>setContent(n)} {...props}/>
    }

    return (
        <Formik
            initialValues={{ title: '', content: '', category: null }}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            validate={validateForm}
            onSubmit={(values, action) => {
                handleSubmit(values)
            }}
        >
            {
                (props) => {
                    {/* console.log(props) */ }
                    return (
                        <div className='flex-center bg-light'>
                            <Form className='shadow p-3 w-50 rounded'>
                                <h3 className='text-center'>Add a New Post</h3>
                                <InputComp label='Title' type='text' name='title' id='title' placeholder='Enter title ' className='form-control' />

                                <Field component={TextEditor} type='text' name='content' id='content' placeholder='Enter content ' className='form-control' />

                                {/* <JoditEditor ref={editor} value={props.values.content} {...props} /> */}

                                <FormGroup>
                                    <Label for='category'>Category</Label>
                                    <Field as="select" name='category' id='category' className='form-control'>
                                        <option value={" "}>Select Category</option>
                                        {
                                            categories.map((category) => {
                                                return <option key={category.id} value={category.id}>{category.categoryTitle}</option>
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name='category' className='text-danger' component={'span'} style={{ fontSize: '0.75rem' }} />
                                </FormGroup>
                                <span className='grid-center w-100'>
                                    <Button color='success' className='w-100' type='submit'>Post</Button>
                                </span>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    )
}


