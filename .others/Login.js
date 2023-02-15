import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

export default function Login() {

    const navigate = useNavigate();

    const [inputVal, setInputVal] = useState({ email: '', password: '' });

    const [validate, setValidate] = useState({ email: '', password: '' });

    const [errorMsg, setErrorMsg] = useState(null);

    const validateForm = (event) => {
        const emailRegex = /^[A-Za-z0-9]+[@][a-zA-Z]+[\.][a-z]{2,3}/;
        const passwordRegex = /^[A-Za-z\.\-\s]+[@$#][a-zA-Z0-9]+/

        const { name, value } = event.target;

        if (name === "email") {
            validate.email = emailRegex.test(value) ? 'has-success' : 'has-danger';
        }
        else {
            validate.password = passwordRegex.test(value) ? 'has-success' : 'has-danger';
        }

        setValidate(validate);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputVal((prev) => {
            return { ...prev, [name]: value }
        })

    }

    const handleClick = (event) => {
        const { email, password } = validate;
        if (email.match('has-success') && password.match('has-success')) {
            navigate("/");
        }
        else {
            event.preventDefault();
            navigate("/login")
            setErrorMsg(true);
            setTimeout(() => { setErrorMsg(false) }, 3000)
        }
    }

    return (
        <div className='login grid-center'>
            <h1 className='text-center'>Sign In</h1>
            <p className='mt-2 mb-2 text-danger'>{errorMsg && 'Invalid Credentials'}</p>
            <Form style={{ width: '22rem' }}>
                <FormGroup className='mt-2'>
                    <Label>Email</Label>
                    <Input name='email' type='text' placeholder='Enter email address' onChange={(e) => {
                        handleChange(e);
                        validateForm(e);
                    }}
                        value={inputVal.email}
                        valid={validate.email === "has-success"}
                        invalid={validate.email === "has-danger"}
                        required
                    />
                </FormGroup>
                <FormGroup className='mt-2'>
                    <Label>Password</Label>
                    <Input name='password' type='password' placeholder='Enter password' onChange={(e) => {
                        handleChange(e);
                        validateForm(e);
                    }}
                        value={inputVal.password}
                        valid={validate.password === "has-success"}
                        invalid={validate.password === "has-danger"}
                        required
                    />
                </FormGroup>
                <Button color='success' className='mt-4 w-100' onClick={handleClick}>Sign In</Button>
                <p className='text-center w-100 mt-2'>
                    <Link to={'/register'} className={'text-success hover-2'}>
                        Not Registered ? Click Here To Sign Up
                    </Link>
                </p>
            </Form>
        </div>
    )
}