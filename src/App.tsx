import {BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom';
import {HomePage} from "./pages/homePage";
import {SearchPage} from "./pages/searchPage";
import {UserPage} from "./pages/userPage";
import {AuthPage} from "./pages/authPage";
import {Main} from "./pages/main";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path={"/"} element={
                    <Main/>}>
                    <Route path="home" element={
                        <HomePage/>}/>
                    <Route path="search" element={
                        <SearchPage/>}/>
                    <Route path="user" element={
                        <UserPage/>}/>
                    <Route path="" caseSensitive={true} element={<Navigate to="home"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
