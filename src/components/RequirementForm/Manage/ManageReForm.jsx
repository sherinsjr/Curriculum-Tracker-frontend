import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../../services/helper'

const ManageReForm = () => {

  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user role from the backend API
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/users/userRole`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.log(error.response.data);
        // TODO: Handle error
      }
    };

    fetchUserRole();
  }, []);


  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };


  return (
    <div>
      
      <h1>ManageReForm</h1>
//to add visibility add the below code to the button or form as I did in createForm ( the whole form)and Dashboard
      {/* {userRole === 'admin' ? (
        
        ) : (
          <p>Access denied. You need to be an admin to manage.</p>
        )}
   */}
    </div>
  )
}

export default ManageReForm