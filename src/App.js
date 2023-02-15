import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { toast, ToastContainer } from 'react-toastify';
import Register from './components/Register';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AuthContext, { CustomContext } from './context/AuthContext';
import NewFeed from './components/NewFeed';
import PostPage from './components/PostPage';
import Home from './components/Home';
import Category from './components/category/Category';
import AddPost from './components/AddPost';
import ErrorPage from './components/ErrorPage';


const AuthenticatedRoute = () => {
  const context = CustomContext();
  if (context?.isAuthenticated || context?.isAuthenticated === undefined) {
    return <Outlet />;
  } else {
    console.log("not authenticated");
    return <Navigate to={"/login"} />
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <ToastContainer />
        <Header />
        <Container fluid={"xl"}>
          <Routes>
            <Route path='*' element={<Navigate to={"/login"} />} />
            <Route path='/' element={<Home />} />
            <Route path='/new-feed' element={<NewFeed />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/posts/:id/:slug' element={<PostPage />} />
            <Route path='/category/:id/:slug' element={<Category />} />
            {/* Private Routes */}
            {/* <Route path='/dashboard' element={
              <AuthenticatedRoute>
                <UserDashboard />
              </AuthenticatedRoute>
            } /> */}

            <Route path='/user' element={<AuthenticatedRoute />}>
              <Route path='dashboard' element={<UserDashboard />} />
              <Route path='add-post' element={<AddPost />} />
              <Route path='*' element={<ErrorPage />} />
            </Route>

          </Routes>
        </Container>
      </AuthContext>
    </BrowserRouter>
  );
}
