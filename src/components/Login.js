import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { } from '../api/apiService';
import { CustomContext } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../validation/validate';
import InputComp from '../utilities/InputComp';

export default function Login() {

    const navigate = useNavigate();

    const context = CustomContext();

    const TOAST_POSITION = { position: 'top-center' };

    const [serverValidation, setServerValidation] = useState({
        errorMessage: {}, isError: false
    })


    const handleSubmit = async (values) => {
        const loginInfo = {
            username: values.email, //server recieves email as username
            password: values.password
        }
        try {
            if (await context.doLogin(loginInfo)) {
                toast.success("User Logged Successfully !!", TOAST_POSITION)
                navigate("/user/dashboard")
            } else {
                console.log("Something went wrong!!");
            }
        } catch (error) {
            if (error.code.includes("ERR_NETWORK")) {
                navigate("/login")
                toast.error('Network Error !!\n Please try again later', TOAST_POSITION)
            }
            else if (error.response?.data?.message !== undefined) {
                toast.error(error.response.data.message, TOAST_POSITION);
            }
            else {
                setServerValidation({
                    errorMessage: error.response?.data,
                    isError: true
                })
            }
        }

    }

    const validateForm = (values) => {
        const error = {};
        validateEmail(error, values);
        // validatePassword(error, values);
        return error;
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            validate={validateForm}
            onSubmit={(values, action) => {
                handleSubmit(values);
                !serverValidation.isError && action.resetForm();
            }}
        >
            {
                (props) => {
                    const name = props.values.email.split("@")[0].substring(0, 15);
                    return (
                        <div className='body-center bg-light'>
                            <Form className='shadow px-3 rounded bg-light' style={{ width: '20rem' }}>
                                <h2 className='text-center text-success pt-4'>Hello!
                                    <span className='fs-4'>&nbsp;{name}</span>
                                </h2>
                                <InputComp id='email' type='email' label='Email' name='email' placeholder='Enter email'
                                    serverErrorMsg={serverValidation.errorMessage.username || ""}
                                    isServerError={serverValidation.isError}
                                />
                                <InputComp id='password' type='password' label='Password' name='password' placeholder='Enter password'
                                    serverErrorMsg={serverValidation.errorMessage.password || ""}
                                    isServerError={serverValidation.isError}
                                />
                                <span className='grid-center my-3'>
                                    <Button color='success' className='w-100' type='submit'>Login</Button>
                                    <span className='mt-3'>
                                        Not a weblog user? &nbsp;
                                        <Link to={"/register"} className="text-success text-decoration-underline">
                                            Register Here
                                        </Link>
                                    </span>
                                </span>
                            </Form>
                        </div>
                    )
                }
            }
        </Formik>
    )
}
