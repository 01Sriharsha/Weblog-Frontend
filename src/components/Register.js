import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, Row } from 'reactstrap';
import { register } from '../api/apiService';
import InputComp from '../utilities/InputComp';
import {
    validateAbout, validateCPassword, validateEmail,
    validatePassword, validateUsername
} from '../validation/validate';

export default function Register() {

    const navigate = useNavigate();

    const TOAST_POSITION = { position: 'top-center' };

    const [serverValidation, setServerValidation] = useState({
        errorMessage: {}, isError: false
    })


    const handleSubmit = async (values) => {
        const registerInfo = {
            username: values.username,
            email: values.email,
            password: values.password,
            about: values.about
        }
        try {
            const response = await register(registerInfo);
            console.log(response.data);
            toast.success('User Registered Successfully...\n Please Login', TOAST_POSITION)
            Formik.reset();
            navigate("/login")
        } catch (error) {
            // console.log(error);
            if (error.code.includes("ERR_NETWORK")) {
                navigate("/register")
                toast.error('Network Error !!\n Please try again later', TOAST_POSITION)
            }
            else {
                if(error.response.status===400 || error.response.status===404){
                    if (error.response?.data?.message?.includes("already exists")) {
                        toast.error('User already exists with the provided email !!\n Please Login', TOAST_POSITION)
                    }
                    //Setting messages of bean validation in server
                    setServerValidation({
                        errorMessage: error.response?.data,
                        isError: true
                    })
                }
                else{
                    toast.error('Server Error !!\n Please try again later', TOAST_POSITION)
                }
                
            }
        }
    }


    //Client Side validation
    const validateForm = async (values) => {
        const error = {};
        validateUsername(error, values);
        validateEmail(error, values);
        validatePassword(error, values);
        validateCPassword(error, values);
        validateAbout(error, values);
        return error;
    }


    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', cpassword: '', about: '' }}
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            validate={validateForm}
            onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.resetForm();
            }}
        >
            {
                () => {
                    return (
                        <div className='body-center bg-light'>
                            <Form className='p-3 shadow rounded' style={{ width: '65%' }}>
                                <h2 className='text-center mb-3'>Register</h2>
                                <Row>
                                    <Col md={6}>
                                        <InputComp id='username' label='Username' name='username' placeholder='Enter username' type='text'
                                            //Executes only when client validation fails by any chance
                                            serverErrorMsg={serverValidation.errorMessage.username}
                                            isServerError={serverValidation.isError}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputComp id='email' type='email' label='Email' name='email' placeholder='Enter email'
                                            serverErrorMsg={serverValidation.errorMessage.email}
                                            isServerError={serverValidation.isError}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <InputComp id='password' type='password' label='Password' name='password' placeholder='Enter password'
                                            serverErrorMsg={serverValidation.errorMessage.password}
                                            isServerError={serverValidation.isError}
                                        />
                                    </Col>
                                    <Col md={6} >
                                        <InputComp id='cpassword' type='password' label='Confirm Password' name='cpassword' placeholder='Confirm password'
                                            serverErrorMsg={serverValidation.errorMessage.cpassword = "password doesn't match"}
                                            isServerError={serverValidation.isError}
                                        />
                                    </Col>
                                </Row>
                                <div>
                                    <InputComp id='about' type='text' label='About' name='about' placeholder='About You'
                                        serverErrorMsg={serverValidation.errorMessage.about}
                                        isServerError={serverValidation.isError}
                                    />
                                </div>
                                <span className='w-100 grid-center'>
                                    <Button color='success' type='submit'>Register</Button>
                                    <span className='mt-3'>
                                        Alraedy Registered? &nbsp;
                                        <Link to={"/login"} className="text-success text-decoration-underline">
                                            Login Here
                                        </Link>
                                    </span>
                                </span>
                            </Form>
                        </div>
                    );
                }
            }
        </Formik>
    )
}