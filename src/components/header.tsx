import {NavLink, useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {
    HomeIcon as HomeIconSolid,
    SearchIcon as SearchIconSolid,
    UserIcon as UserIconSolid
} from "@heroicons/react/solid";
import {HomeIcon, SearchIcon, UserIcon} from "@heroicons/react/outline";


export const Header = () => {

    let navigate = useNavigate();

    const activeRoute = ({isActive}: { isActive: boolean }) =>
        isActive ? "activeNavLink" : "navLink"

    return (
        <header className={"grid grid-cols-4 gap-4 place-items-center bg-white py-4 px-2 border-b-2 border-b-slate-200"}>
            <div><h1 className={"text-2xl font-semibold text-blue-700"}>Social</h1></div>
            <div
                className={"navbar"}>
                <
                    NavLink to={"/home"}
                         className={activeRoute}
                         children={({isActive}) => (
                             <Fragment>
                                 {isActive ? <HomeIconSolid className={"w-6"}/> :
                                     <HomeIcon className={"w-6"}/>}
                                 <span>Home</span>
                             </Fragment>)
                         }/>
                <NavLink className={activeRoute} to={"/search"} children={({isActive}) => (
                    <Fragment>
                        {isActive ? <SearchIconSolid className={"w-6"}/> :
                            <SearchIcon className={"w-6"}/>}
                        <span>Search</span>
                    </Fragment>)
                }/>
                <NavLink className={activeRoute} to={"/user"} children={({isActive}) => (
                    <Fragment>
                        {isActive ? <UserIconSolid className={"w-6"}/> :
                            <UserIcon className={"w-6"}/>}
                        <span>User</span>
                    </Fragment>)
                }/>
            </div>
            <div className={"col-start-4"}>
                <button
                    className={"text-slate-600 font-medium"}
                    onClick={() =>
                        navigate("/auth")
                    }>
                    Logout
                </button>
            </div>
        </header>
    )
}