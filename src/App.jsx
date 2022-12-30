import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import ProtectedRoute from './pages/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </HashRouter>
        </AuthProvider>
    )
}

export default App
