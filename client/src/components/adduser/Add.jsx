import React, { useState } from 'react'
import axios from "axios"
import "./Add.css"
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Add = () => {

    const users = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8000/api/create", user)
          .then((response) => {
              toast.success("User created successfully!", { position: "top-right" }); // Show success toast
              navigate("/"); // Redirect after success
          })
          .catch(error => {
              toast.error("Error creating user!", { position: "top-right" }); // Show error toast
              console.log(error);
          });
  };

    return (
        <div className='adduser'>
            <Link to={"/"} className='backbtn'>Back</Link>
            <h3>Add new user</h3>
            <form className='adduserform' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='Write first name' />
                </div>
                <div className='inputGroup'> {/* Fixed class name */}
                    <label htmlFor="lname">Last Name</label> {/* Fixed htmlFor */}
                    <input type="text" onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Write last name' />
                </div>
                <div className='inputGroup'> {/* Fixed class name */}
                    <label htmlFor="email">Email</label> {/* Fixed htmlFor */}
                    <input type="text" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Write your email' />
                </div>
                <div className='inputGroup'> {/* Fixed class name */}
                    <label htmlFor="password">Your Password</label> {/* Fixed htmlFor */}
                    <input type="text" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Write your password' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add user</button>
                </div>
            </form>
        </div>
    )
}

export default Add