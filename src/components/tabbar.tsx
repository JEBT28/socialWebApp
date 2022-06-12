import {HomeIcon, UserIcon, SearchIcon} from "@heroicons/react/outline";
import {
    SearchIcon as SearchIconSolid,
    UserIcon as UserIconSolid,
    HomeIcon as HomeIconSolid
} from "@heroicons/react/solid";

import {NavLink} from "react-router-dom";
import {Fragment} from "react";

export const TabBar = () => {
    const activeRoute = ({isActive}: { isActive: boolean }) =>
        isActive ? "activeTabBarLink" : "tabBarLink"

    return (
        <div
            className={"tabbar"}>
            <NavLink to={"/home"}
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
    )
}