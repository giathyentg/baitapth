import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { UserProvider } from './contexts/userContext';
import NotFound from './pages/404';
import NganhNghe from './pages/danh-muc/nganh-nghe/demo';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/product';
import QuanTriThanhVien from './pages/quan-tri-thanh-vien';
import { useEffect } from 'react';
import { apiLoggedInInstance } from './getapi/api';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/user';
import Chat from './pages/chat/Chat';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    apiLoggedInInstance({
      url: '/api/auth/user-info'
    }).then(res=> {
      dispatch(setUser(res.data))
    }).catch(e => {
      window.location.href = "/login"
    })
  }, [dispatch])
  return (
    <UserProvider>
      <BrowserRouter>
            <Routes>
              <Route path='*' element={<NotFound/>}/>
              <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/products" element={<Products/>} />
                  <Route path='/danh-muc'>
                      <Route path='nganh-nghe' element={<NganhNghe/>}/>
                  </Route>
                  <Route path='/quan-tri-thanh-vien' element={<QuanTriThanhVien/>}/>
                  <Route path='/chat' element={<Chat/>}/>
              </Route>
              <Route path="/login" element={<Login/>} />
              
            </Routes>
          </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;


