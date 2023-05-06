import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import Sidebar from '../../Sidebar/Sidebar';
import 'semantic-ui-css/semantic.min.css'


const CreateReForm = () => {
  const navigate = useNavigate();
  const [requirement, setRequirement] = useState({
    name:'',
    area:'',
    institution:'',
    category:'',
    hours:'',
    file:'',
    isApprove:false

  });

  const handleChange = e => {
    if (e.target.name !== 'file') {
      const { name, value } = e.target;
      console.log('Before setRequirement:', requirement);
      setRequirement({ ...requirement, [name]: value });
      console.log('After setRequirement:', requirement);
    } else if (e.target.files && e.target.files[0]) {
      let name = e.target.name;
      let value = e.target.files[0];
      console.log('Before setRequirement:', requirement);
      setRequirement({ ...requirement, [name]: value });
      console.log('After setRequirement:', requirement);
    }
  };
  

  const sendDataToAPI = async (event) => {
    const { name, area, category, institution, hours} = requirement
    if (name && area && category && institution && hours) {
      let regex = /[0-9\b]=$/;

      if (!regex.test(hours)) {
        alert('Hours should be in number format')
        
      }
      else{
        var token = sessionStorage.getItem("")
        const config = {
          headers: {'content-type': 'multipart/form-data', 'x-access-token': token}
        };
        const formData = new FormData();
        formData.append('name', requirement.name);
        formData.append('area', requirement.area);
        formData.append('institution', requirement.institution);
        formData.append('category', requirement.category);
        formData.append('hours', requirement.hours);
        formData.append('file', requirement.file);
        formData.append('isApprove', requirement.isApprove);

        const response = await axios.post(`http://localhost:5000/api/v1/create`, formData,config)
      
        if (response.data.success) {
          alert("Requirement created successfully...")
          navigate('/requirement')
        }
        else{
          alert("Invalid Entry...")
        }
      }
    }
  }
  return (
    <div className="App">
      <div className="AppGlass">
      <Sidebar/>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col ">
                <div className="card card-form" >
                  <div className="row g-0">

                    <div className="col-xl-12">
                      <form encType='multipart/form-data'>
                        <div className="card-body p-md-5 text-black">
                          <div className="d-flex justify-content-center pt-3">
                            <h1 className="fw-Bolder mb-3 pb-3 headeing" >Training Requirement</h1>
                          </div>
                          <br /><br />
                          <div >

                            <input type="text" name='name' value={requirement.name} onChange={handleChange} className="form-control form-control-md" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name of Requirement" required />

                          </div>
                          <br />

                          <div >
                            <select id="Select" name='area' value={requirement.area} onChange={handleChange} className="form-control form-control-md" placeholder="Area of Training" required>
                              <option>Select Area</option>
                              <option>FSD</option>
                              <option>ML-AI</option>
                              <option>DSA</option>
                              <option>RPA</option>
                              <option>ST</option>
                              <option>CSA</option>

                            </select>
                          </div>
                          <br />
                          <div >

                            <input type="text" name='institution' value={requirement.institution} onChange={handleChange} className="form-control form-control-md" id="exampleInputPassword1" placeholder="Institution" required />
                          </div>
                          <br />

                          <div >
                            <select id="Select" name='category' value={requirement.category} onChange={handleChange} className="form-control form-control-md" placeholder="Category" required>
                              <option>Select</option>
                              <option>Retail</option>
                              <option>Academic</option>
                              <option>Corporate</option>
                            </select>
                          </div>

                          <br />
                          <div >

                            <input type="text" name='hours' value={requirement.hours} onChange={handleChange} className="form-control form-control-md" id="exampleInputPassword1" placeholder="No: of hours of training" required />
                          </div>
                          <br />
                          <div className="form-group">
                            <input type="file"  onChange={handleChange} name="file" className='form-control form-control-md' placeholder='Choose file' />
                          </div>

                          <br />
                          <div className="d-flex justify-content-center">
                            <Link to='/requirements/ReadAll'>
                              <button type="button" className="btn btn-secondary btn-md">Back</button>
                            </Link>
                            <button onClick={sendDataToAPI} type="button" className="btn btn-secondary btn-md ms-2">Create</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
    </div>
    </div>
  )
}

export default CreateReForm