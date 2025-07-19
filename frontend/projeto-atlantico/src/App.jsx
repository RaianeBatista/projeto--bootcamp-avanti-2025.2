import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserEdit from './components/UserEdit';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container-fluid">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Welcome />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/users/new" element={<UserForm />} />
                            <Route path="/users/edit/:id" element={<UserEdit />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
