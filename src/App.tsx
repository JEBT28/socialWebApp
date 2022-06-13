import {BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom';
import {HomePage} from "./pages/homePage";
import {SearchPage} from "./pages/searchPage";
import {UserPage} from "./pages/userPage";
import {AuthPage} from "./pages/authPage";
import {Main} from "./pages/main";
import {useState} from "react";
import AuthProvider from "./contexts/authContext";

function App() {


    return (
        <BrowserRouter>

            <Routes>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path={"/"} element={
                    <Main/>
                }>
                    <Route path="home" element={
                        <AuthProvider>
                            <HomePage/>
                        </AuthProvider>}/>
                    <Route path="search" element={
                        <AuthProvider>
                            <SearchPage/>
                        </AuthProvider>}/>
                    <Route path="user" element={

                        <AuthProvider>
                            <UserPage/>
                        </AuthProvider>}/>
                    <Route path="" caseSensitive={true} element={<Navigate to="home"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
