import {useEffect, useState} from "react";
import {IUser} from "../interfaces/User";
import {UserService} from "../services/userService";
import {Loading} from "../components/loading";
import {IPost} from "../interfaces/Post";
import {Post} from "../components/post";
import {ViewGridIcon, ViewListIcon} from "@heroicons/react/outline";

export const UserPage = () => {


    const userService = new UserService();
    const [user, setUser] = useState<IUser>(null!)
    const [isLoading, setIsLoading] = useState(true)
    const [viewLikeList, setViewLikeList] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const username = localStorage.getItem("username") || ""
        userService.getUser(username).subscribe({
            next: (value: any) => {
                console.log("User", value.results)
                setUser(value.results)
                setIsLoading(false)
            },
            error: (err: any) => {
                console.log("Error", err)
                setIsLoading(false)
            }
        })
    }, [true])

    if (isLoading) {
        return <div className={"grid place-content-center min-h-screen w-screen"}>
            <Loading/>
        </div>
    }

    return !isLoading && <div className={"bg-slate-200 flex flex-col min-h-screen relative"}>
        <div className={"h-auto w-full p-2 grid grid-cols-3"}>
            <img src={user.foto} alt="" className={"h-24 w-24 rounded-full border-2 border-white"}/>
            <div className={"col-start-2"}>
            </div>
        </div>
        <div
            className={"w-full font-medium text-blue-600 p-2 bg-slate-100 sticky top-0 flex justify-between border-b-2 border-b-blue-700"}>
            <span>Posts</span>
            <button className={"iconView h-6 w-6"} onClick={() => setViewLikeList(!viewLikeList)}>
                {viewLikeList ? <ViewGridIcon
                /> : <ViewListIcon/>
                }
            </button>
        </div>
        {viewLikeList ?
            <div
                className={"grid place-content-start min-h-screen pb-24 md:max-w-md mx-auto min-w-[100vw] w-full"}>
                {user.Posts.map((post: IPost) => {
                    return <Post key={post.idPost} {...post}/>
                })}
            </div> :
            <div className={"min-h-screen grid grid-cols-3 place-content-start bg-white min-w-[100vw] w-full"}>
                {user.Posts.map((post: IPost) => {
                    return <figure className={"w-full grid place-content-center bg-white border border-slate-200"}>
                        <img src={post.img} className={"object-cover"} loading={"lazy"} alt={""}/>
                    </figure>
                })}
            </div>


        }
    </div>
}