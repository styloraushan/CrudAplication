import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([]);
    const [deletedUser, setDeletedUser] = useState(null); // Store deleted user and its index
    const [undoTimeout, setUndoTimeout] = useState(null); // Timeout ID for undo action

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch user data
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users!', { position: 'top-right' });
        }
    };

    // Delete user function
    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userIndex = users.findIndex(user => user._id === id); // Find the index of the user to delete
                const userToDelete = users[userIndex]; // Find the user to delete
                await axios.delete(`http://localhost:8000/api/delete/${id}`);
                toast.success('User deleted successfully!', { position: 'top-right' });

                // Store deleted user and its index temporarily
                setDeletedUser({ user: userToDelete, index: userIndex });
                setUsers(users.filter(user => user._id !== id)); // Remove the user from the list
                setUndoTimeout(setTimeout(() => setDeletedUser(null), 5000)); // Clear undo after 5 seconds
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Error deleting user!', { position: 'top-right' });
            }
        }
    };

    // Undo delete function
    const undoDelete = async () => {
        if (deletedUser) {
            const updatedUsers = [...users]; // Create a copy of the users array

            // Re-insert the deleted user at the original index
            updatedUsers.splice(deletedUser.index, 0, deletedUser.user);

            try {
                // Re-insert the user into the database (you might need to adjust this depending on your API)
                await axios.post('http://localhost:8000/api/create', deletedUser.user);
                toast.success('Undo successful, user reinserted!', { position: 'top-right' });

                // Update users state
                setUsers(updatedUsers);
                setDeletedUser(null); // Clear deleted user data
                clearTimeout(undoTimeout); // Clear timeout if undo is successful
            } catch (error) {
                console.error('Error reinserting user:', error);
                toast.error('Error reinserting user!', { position: 'top-right' });
            }
        }
    };

    return (
        <div className='userTable'>
            <Link to={'/add'} className='addbtn'>Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className='actionButton'>
                                <button onClick={() => deleteUser(user._id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                                <Link to={`/edit/${user._id}`}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Show Undo Button if there was a recent deletion */}
            {deletedUser && (
                <div className='undoSection'>
                    <button onClick={undoDelete} className='undoButton'>
                        Undo Deletion
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;
