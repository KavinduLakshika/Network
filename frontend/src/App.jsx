import './App.css'
import "bootswatch/dist/lux/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CusForm from './Pages/Customer/CusForm'
import Login from './Pages/User/Login'
import UserForm from './Pages/User/UserForm';
import Customers from './Pages/Dashboard/Customers';
import Users from './Pages/Dashboard/Users';
import { useEffect, useState } from 'react';
import Successful from './Pages/Customer/Successful';

function App() {

  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedToken = localStorage.getItem('token');
    const storedStatus = localStorage.getItem('userStatus');

    if (storedName) setName(storedName);
    if (storedToken) setToken(storedToken);
    if (storedStatus) setUserStatus(storedStatus);
  }, []);

  const handleLogin = (name, token, userStatus) => {
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    localStorage.setItem('userStatus', userStatus);

    setName(name);
    setToken(token);
    setUserStatus(userStatus);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CusForm />} />
        <Route path="/login" element={token ? (<Navigate to={userStatus === "inActive" ? "/login" : "/customers"} replace />) : (<Login onLogin={handleLogin} />)} />
        <Route path='/user' element={<UserForm />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/users' element={<Users />} />
        <Route path='/successful' element={<Successful />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
