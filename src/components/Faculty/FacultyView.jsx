import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FacultyView = () => {

  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user role from the backend API
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/userRole`, {
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
           //Confused about where to add visibility. Add the below code to the button or form as I did in createForm ( the whole form)and Dashboard
      {/* {userRole === 'admin' ? (
        
        ) : (
          <p>Access denied. You need to be an admin to manage.</p>
        )}
   */}
      
    </div>
  )
}

export default FacultyView