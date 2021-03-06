import {Link, Outlet, useNavigate} from "react-router-dom";
import {Header} from "../components/header";
import {TabBar} from "../components/tabbar";
export const Main = ()=> {

    return (
        <div className={"bg-slate-100"}>
            <Header/>
            <Outlet />
            <TabBar/>
        </div>
    );
}
