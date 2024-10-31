import react from 'react';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';


function Logout(){
  localStorage.clear()
  return <Navigate  to='/login' />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route  path='/login' element={<Login></Login>} />
        <Route  path='/logout' element={<Logout/>} />
        <Route  path='/register' element={<Register></Register>} />
        <Route  path='*' element={<NotFound></NotFound>} />

      </Routes>
    
    </BrowserRouter>
 
  ) 
}

export default App
