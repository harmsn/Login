import jwt_decode from 'jwt-decode'
import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router";
import './style.css';
const Profile = () => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [flag,setFlag]  = useState(0);
    const [newPassword,setNewpassword] = useState('');
    const history = useHistory();
    useEffect(()=>{
        if(localStorage.getItem("usertoken") === null){
            return history.push('login');
        }
       const token =  localStorage.usertoken 
        const decoded = jwt_decode(token);
        console.log(decoded);
        setName(decoded.name);
        setPhone(decoded.phone);
        setEmail(decoded.email);
    },[])
    function logout(e){
        localStorage.removeItem('usertoken')
        sessionStorage.removeItem('usertoken')
        history.push({
            pathname:  "/login",
        });
    }
    function changePassword(e){
        e.preventDefault();
        let user = {
            email: email,
            password: newPassword
        }
        console.log(user);
        axios.post('http://localhost:5000/api/update', {
            email: email,
            password: newPassword
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(err=>{
            console.log(err);
        })
        setFlag(0);
    }
    return (
        <div>
            <h1>Profile Page</h1>
            <p>  Name : <span>{name}</span></p>
            <p>  Phone : <span>{phone}</span></p>
            <p>  Email : <span>{email}</span></p>
            <button  onClick={e=>logout(e)}>Logout</button>
            <button  type="button" onClick={e => setFlag(1)}>Update Password</button>
            {{flag} && <div>
                <form onSubmit={e=> changePassword(e)}>
                    <input placeholder="Enter New Password" type="password" onChange={e=>setNewpassword(e.target.value)}/>
                    <button  type="submit">Change Password</button>
                </form>
            </div>}
        </div>
    )
}
export default Profile;