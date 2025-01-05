import './App.css'
import "bootswatch/dist/lux/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CusForm from './Pages/Customer/CusForm'
import Login from './Pages/User/Login'
import UserForm from './Pages/User/UserForm';
import Dashboard from './Pages/Dashboard/Dashboard';
import Customers from './Pages/Dashboard/Customers';
import Users from './Pages/Dashboard/Users';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cus' element={<CusForm />} />
        <Route path='/user' element={<UserForm />} />
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path='/customers' element={<Customers />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
