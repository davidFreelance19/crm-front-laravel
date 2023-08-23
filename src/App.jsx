import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './pages/auth/context/AuthContext'

import LayoutAuth from './Layouts/LayoutAuth'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'

import { CustomerProvider } from './pages/home/context/CustomerContext'
import LayoutHome from './Layouts/LayoutHome'
import HomePage from './pages/home/HomePage'
import ClientsHome from './pages/home/ClientsHome'
import Profile from './pages/home/Profile'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LayoutAuth />}>
            <Route index path="login" element={<Login />} />
            <Route path='sign-up' element={<SignUp />} />
          </Route>
        </Routes>

        <Routes>
          <Route path='admin' element={<CustomerProvider><LayoutHome /></CustomerProvider>}>
            <Route path='home/:token' index element={<HomePage />} />
            <Route path='clients/:token' element={<ClientsHome />} />
            <Route path='profile/:token' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App