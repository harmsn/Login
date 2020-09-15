import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from "react-router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/
const validationSchema = Yup.object({
    email : Yup.string().matches(emailRegExp,'Please enter valid email').required("Email required"),
    password : Yup.string().required("Password required"),
})
const Login = () => {
    const [error,setError] = useState('');
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema,
        onSubmit: values => {
            const user = {
                email: values.email,
                password: values.password
            }
            console.log(user)
            axios.post('http://localhost:5000/api/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                localStorage.setItem('usertoken', response.data);
       
                if(response.data.error){
                    setError(response.data.error);
                    return;
                }
                history.push({
                    pathname:  "/profile",
                });
                console.log(response);
                return response.data
            })
            .catch(err => {
                setError(err);
                console.log(err);
            })
        }
    });
    useEffect(()=>{
        localStorage.removeItem('usertoken')
        sessionStorage.removeItem('usertoken')
    },[])
    function reg(e){
        e.preventDefault();
        history.push({
            pathname:  "/register",
        });
    }
    return (
        <div className="container">
            <h1>Login Page</h1>
            <div class = "card">
                <p>Register to login<button
                    type=""
                    className="btn btn-lg btn-primary btn-block" 
                    onClick = {e =>{reg(e)}}>
                    Register
                </button>
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email Address :   </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p>{formik.errors.email ? formik.errors.email : null }</p>
                    <br/>
                    <label htmlFor="password">Password :  </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p>{formik.errors.password ? formik.errors.password : null }</p>
                    <button type="submit">Login</button>
                </form>
                <p>{error}</p>
            </div>
        </div>
    )
}
export default Login;