import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./Edit.css";

const Edit = () => {
    const { id } = useParams(); // Get user ID from URL
    const navigate = useNavigate(); // For navigation

    // State for user details
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    // Fetch user data when component loads
    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                setUser(response.data); // Set user data in state
            })
            .catch(error => {
                console.error("Error fetching user:",{ position: "top-right"}, error);
                toast.error("Error fetching user data!",{ position: "top-right"});
            });
    }, [id]);

    // Handle input change
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        //console.log(user);
    };

    // Handle form submission (update user)
    const submitForm = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                toast.success("User updated successfully!",{ position: "top-right" });
                navigate("/"); // Redirect to home page
            })
            .catch(error => {
                toast.error("Error updating user!", { position: "top-right"});
                console.error(error);
            });
    };

    return (
        <div className='edituser'>
            <Link to={"/"} className='backbtn'>Back</Link>
            <h3>Edit User</h3>
            <form className='edituserform' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id='fname' name='fname' autoComplete='off'
                        value={user.fname} onChange={ inputChangeHandler} placeholder='Update first name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id='lname' name='lname' autoComplete='off'
                        value={user.lname} onChange={ inputChangeHandler} placeholder='Update last name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' name='email' autoComplete='off'
                        value={user.email} onChange={ inputChangeHandler} placeholder='Update email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">New Password</label>
                    <input type="password" id='password' name='password' autoComplete='off'
                        value={user.password} onChange={ inputChangeHandler} placeholder='Update password' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update User</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;