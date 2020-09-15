import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useHistory } from "react-router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/
const validationSchema = Yup.object({
  email : Yup.string().matches(emailRegExp,'Email entered is invalid').required("Email required"),
  name : Yup.string().required("Name required"),
  phone : Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone number required"),
  password : Yup.string().required("Password required"),
})
const Register = () =>{
    const [error,setError] = useState('');
    const history = useHistory();
    const formik = useFormik({
      initialValues: {
        email: '',
        name : '',
        phone: '',
        password: ''
      },
      validationSchema,
      onSubmit: values => {
        localStorage.removeItem('usertoken')
        sessionStorage.removeItem('usertoken')
        const newUser = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            password: values.password
        }
        axios
          .post('http://localhost:5000/api/register', {
            name: newUser.name,
            phone: newUser.phone,
            email: newUser.email,
            password: newUser.password
          })
          .then(response => {
            if(response.data.error){
              setError(response.data.error);
              return;
            }
            console.log('Registered')
            history.push({
              pathname:  "/login",
          });
        })
      },
    });
    useEffect(()=>{
      localStorage.removeItem('usertoken')
      sessionStorage.removeItem('usertoken')
    },[])
    return (
        <div className="container">
          <h1>Registration Page</h1>
          <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p>{formik.errors.name ? formik.errors.name : null }</p>
                <br/>
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                />
                <p>{formik.errors.phone ? formik.errors.phone : null }</p>
                <br/>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p>{formik.errors.email ? formik.errors.email : null }</p>
                <br/>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p>{formik.errors.password ? formik.errors.password : null }</p>
                <button type="submit">Register!</button>
            </form>
          <p>{error}</p>
        </div>
    )
}
export default Register;