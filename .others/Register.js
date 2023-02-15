import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { register } from '../src/api/apiService';




export default function Register() {

    const navigate = useNavigate();

    const toastCenter = { position: toast.POSITION.TOP_CENTER };


    const [inputVal, setInputVal] = useState({ username: '', email: '', password: '', cpassword: '', about: '' });

    const [error, setError] = useState({ message: {}, isError: false })

    const { username, email, password, cpassword, about } = inputVal;

    const registerInfo = { username, email, password, about };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputVal((prev) => {
            return { ...prev, [name]: value };
        })
    }

    const handleSubmit = async (event) => {
        try {
            const response = await register(registerInfo);
            console.log(response)
            toast.success("User registered successfully", toastCenter);
            setInputVal({ username: '', email: '', password: '', cpassword: '', about: '' })
            navigate("/login")
        } catch (err) {
            event.preventDefault();
            console.log(err.message);
            if (err.response?.status === 400) {
                const message = err.response?.data?.message
                setError({
                    message: err.response.data,
                    isError: true
                });
                setInputVal({ username: '', email: '', password: '', cpassword: '', about: '' })
                toast.error(message + " Please Sign-In ", toastCenter);
            }
        }
    }

    return (
        <div className='register w-100 grid-center'>
            <Form style={{ width: '22rem' }}>
                <h1 className='text-center'>Sign Up</h1>
                <div>
                    <InputComp label='username' name='username' type='text'
                        placeholder='Enter your username' value={username}
                        onChange={handleChange}
                        validate={error.message.username && true}
                        feedback={error.message.username}
                    />

                    <InputComp label='Email' name='email' type='email'
                        placeholder='Enter your email' value={email}
                        onChange={handleChange}
                        validate={error.message.email && true}
                        feedback={error.message.email}
                    />

                    <InputComp label='Password' name='password' type='passsword'
                        placeholder='Enter your password' value={password}
                        onChange={handleChange}
                        validate={error.message.password && true}
                        feedback={error.message.password}
                    />
                    <InputComp label='Confirm Password' name='cpassword' type='passsword'
                        placeholder='Confirm password' value={cpassword}
                        onChange={handleChange}
                    />
                    <InputComp label='About' name='about' type='text'
                        placeholder='About you' value={about}
                        onChange={handleChange}
                        validate={error.message.about && true}
                        feedback={error.message.about}
                    />
                </div>
                <Button color='success' className='mt-4 w-100' onClick={handleSubmit}>Sign Up</Button>
                <p className='text-center w-100 mt-2'>
                    <Link to={'/login'} className={'text-success hover-2'}>
                        Already Registered ? Click Here To Sign In
                    </Link>
                </p>
            </Form>
        </div>
    )
}

function InputComp({ label, name, type, value, onChange, validate, placeholder, feedback }) {
    return (
        <FormGroup className='mt-2'>
            <Label for={name}>{label}</Label>
            <Input name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                valid={validate}
                invalid={validate}
                required
            />
            <FormFeedback>{feedback}</FormFeedback>
        </FormGroup>
    )
}


// const [validate, setValidate] = useState({ username: '', email: '', password: '', cpassword: '', about: '' });

//     const validateRegisterForm = (event) => {
//         const { name, value } = event.target;

//         const usernameRegex = /^[A-Za-z0-9\-\.\s]+$/;
//         const emailRegex = /^[A-Za-z0-9]+[@][a-zA-Z]+[\.][a-z]{2,3}$/;
//         const passwordRegex = /^[A-Za-z\.\-\s]+[@$#][a-zA-Z0-9]+$/

//         if (name === "username") {
//             validate.username = usernameRegex.test(value) ? 'has-success' : 'has-danger';
//         }
//         else if (name === "email") {
//             validate.email = emailRegex.test(value) ? 'has-success' : 'has-danger';
//         }
//         else if (name === "password") {
//             validate.password = passwordRegex.test(value) ? 'has-success' : 'has-danger';
//         }
//         else if (name === "cpassword") {
//             validate.cpassword = value.match(password) ? 'has-success' : 'has-danger';
//         }
//         else if (name === "about") {
//             validate.about = (value.length > 15) ? 'has-success' : 'has-danger';
//         }
//         setValidate(validate);
//     }


    // const handleSubmit = (event) => {
    //     const { username, email, password, cpassword, about } = validate;
    //     if (!(username.match('has-success') && email.match('has-success') && password.match('has-success') && cpassword.match('has-success') && about.match('has-success'))) {
    //         if (!cpassword.match(inputVal.password)) {
    //             validate.cpassword = "has-danger"
    //             setValidate(validate);
    //         }
    //         event.preventDefault();
    //         toast.error("Invalid Credentials", {
    //             position: toast.POSITION.TOP_CENTER
    //         });
    //         navigate("/register")
    //     }
    //     else {
    //         register(registerInfo)
    //             .then((res) => {
    //                 console.log(res);
    //                 toast.success("User registered successfully", toastCenter);
    //             })
    //             .catch((err) => {
    //                 if (err.response?.status === 400) {
    //                     const message = err.response.data.message;
    //                     toast.error(message + " Please Sign-In ", toastCenter);
    //                 }
    //                 console.log(err);
    //             });
    //     }

    // }