import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import { Button, Container, Header, Message, Segment, Table } from 'semantic-ui-react';

const ViewReForm = () => {

  const [userRole, setUserRole] = useState('');
  const [requirementData, setRequirementData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Access the ID parameter from the URL
  console.log('ID',id)
  


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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const responseData = response.data;
      console.log('Response Data:', responseData); // Log the responseData object to the console
      setRequirementData(responseData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);  

//delete
  const handleDelete = async () => {
    try {
      if (requirementData) {
        const id = requirementData.requirement._id;
        await axios.delete(`http://localhost:5000/api/v1/requirement/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Deleted successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error.response.data);
      // TODO: Handle error
    }
  };
  

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <Segment className="Background" basic>
          <Container>
            <Header as="h2" textAlign="center" className="fw-Bolder mb-3 pb-3 heading">
              Requirement Details
            </Header>
            {requirementData ? (
              <Segment>
               <Table definition>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Name</Table.Cell>
      <Table.Cell>{requirementData.requirement.name}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Area</Table.Cell>
      <Table.Cell>{requirementData.requirement.area}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Institution</Table.Cell>
      <Table.Cell>{requirementData.requirement.institution}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Category</Table.Cell>
      <Table.Cell>{requirementData.requirement.category}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Hours</Table.Cell>
      <Table.Cell>{requirementData.requirement.hours}</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>File</Table.Cell>
      <Table.Cell>{requirementData.requirement.file}</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
{userRole === 'admin' && (
               <Button
               primary
               onClick={() => handleDelete(requirementData.requirement._id)}
             >
               Delete
             </Button>
             
              
                )}
                <Button secondary onClick={() => navigate(-1)}>
                  Go Back
                </Button>
              </Segment>
            ) : (
              <Message>No data available.</Message>
            )}
              </Container>  
            </Segment>
      </div>
    </div>
  )
}

export default ViewReForm