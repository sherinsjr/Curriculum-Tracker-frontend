import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Segment, Table } from 'semantic-ui-react';
import Sidebar from '../Sidebar/Sidebar';
import {BASE_URL} from '../../services/helper'

const Dashboard = () => {
  // eri
  const url = `${BASE_URL}/api/v1/requirement`;
  const navigate = useNavigate(); // Access the navigate function for navigation


  const [userRole, setUserRole] = useState('');
  const [apiData, setApiData] = useState([]);
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

  useEffect(() => {
      const fetchRequirements = async () => {
          try {
              const response = await axios.get(url, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
              });
              console.log(response.data); // Print response data to inspect its structure

              // Assuming role information is accessible at response.data.role
              const userRole = response.data.role || "";

              setApiData(response.data);
              setUserRole(response.data[0].role);
          } catch (error) {
              console.log(error.response.data);
              // TODO: Handle error
          }
      };

      fetchRequirements();
  }, [])

  const setData = (id, name, area, institution, category, hours, file, isApprove) => {
      localStorage.setItem("ID", id);
      localStorage.setItem("name", name);
      localStorage.setItem("area", area);
      localStorage.setItem("institution", institution);
      localStorage.setItem("category", category);
      localStorage.setItem("hours", hours);
      localStorage.setItem("file", file);
      localStorage.setItem("isApprove", isApprove);
  };

  const handleViewClick = (data) => {
      setData(
          data._id,
          data.name,
          data.area,
          data.institution,
          data.category,
          data.hours,
          data.file,
          data.isApprove
      );
      navigate(`/detail/${data._id}`);
  };
  return (
    <div className="App">
            <div className="AppGlass">
                <Sidebar />
                <section className="Background">

                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col ">
                                <div className="card card-table" >
                                    <div className="row g-0">
                                        <div className="d-flex justify-content-center pt-3">
                                            <h2 className="fw-Bolder mb-3 pb-3 headeing" > Requirements</h2>
                                        </div>
                                        <div >
                                            <Segment style={{ overflow: 'auto', maxHeight: 480 }}>

                                                <Table celled padded>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                                            <Table.HeaderCell>Area</Table.HeaderCell>
                                                            <Table.HeaderCell>Institution</Table.HeaderCell>
                                                            <Table.HeaderCell>Category</Table.HeaderCell>
                                                            <Table.HeaderCell>Hours</Table.HeaderCell>
                                                            <Table.HeaderCell>File</Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>

                                                        {apiData.map(data => {
                                                            return (
                                                                <Table.Row key={data._id}>

                                                                    <Table.Cell>{data.name}</Table.Cell>
                                                                    <Table.Cell>{data.area}</Table.Cell>
                                                                    <Table.Cell>{data.institution}</Table.Cell>
                                                                    <Table.Cell>{data.category}</Table.Cell>
                                                                    <Table.Cell>{data.hours}</Table.Cell>
                                                                    <Table.Cell>{data.file}</Table.Cell>
                                                                </Table.Row>
                                                            )

                                                        })}

                                                    </Table.Body>

                                                </Table> </Segment>
                                        </div>
                                        <div className="d-flex justify-content-center pt-3">
                                            {userRole === 'admin' ? (
                                                <Link to='/create'>
                                                    <button type="button" className="btn btn-outline-secondary btn-lg">Create New Requirement</button>
                                                </Link>
                                            ) : (
                                                <p>Access denied. You need to be an admin to create a requirement.</p>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}

export default Dashboard