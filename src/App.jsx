import { Route, Routes, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing'
import Dashboard from "./pages/Dashboard"

import './App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from './redux/slice/accountSlice';
import ManageAccountPage from './pages/Manage/Account';
import ManageProductPage from './pages/Manage/Product';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(checkLogin(JSON.parse(localStorage.getItem("auth"))))
    }
  }, [])

  return (<div className='body'>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/:category' element={<Dashboard />} />
      <Route path='/manage/account' element={<ManageAccountPage />} />
      <Route path='/manage/product' element={<ManageProductPage />} />
    </Routes>
  </div>
  )
}

export default App
