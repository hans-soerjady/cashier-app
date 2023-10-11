import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'
import Dashboard from "./pages/Dashboard"

import './App.css'
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import { loginAction } from './redux/action/accountAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("username")){
      dispatch(loginAction({username: localStorage.getItem("username")}))
    }
  }, [])

  return (<div className='body'>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </div>
  )
}

export default App
