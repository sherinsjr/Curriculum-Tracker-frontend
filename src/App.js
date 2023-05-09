
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardReForm from './components/RequirementForm/Dashboard/DashboardReForm';
import CreateReForm from './components/RequirementForm/Create/CreateReForm';
import ManageReForm from './components/RequirementForm/Manage/ManageReForm';
import ViewReForm from './components/RequirementForm/View/ViewReForm';
import FacultyView from './components/Faculty/FacultyView'
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/MainDashboard/Dashboard';



function App() {
  return (
   
   <BrowserRouter>
   
   <Routes>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/requirement' element={<DashboardReForm/>}/>
    <Route path='/create' element={<CreateReForm/>}/>
    <Route path='/requirement/manage' element={<ManageReForm/>}/>
    <Route path='/detail/:id' element={<ViewReForm/>}/>
    <Route path='/faculty' element={<FacultyView/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
   </Routes>
   
   </BrowserRouter>
  );
}

export default App;
