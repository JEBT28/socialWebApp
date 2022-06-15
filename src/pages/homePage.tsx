import {useEffect, useState} from "react";
import {PostService} from "../services/postService";
import {IPost} from "../interfaces/Post";
import {Post} from "../components/post";
import {handledUnauthorized} from "../helpers/handledUnauthorized";
import {useNavigate} from "react-router-dom";


export const HomePage = () => {
    const navigate = useNavigate()
    const postService = new PostService();
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        postService.getPosts().subscribe({
            next: (value: any) => {
                setPosts(value.results)
            },
            error: err => {
                let isAuthenticated = handledUnauthorized(err)
                !isAuthenticated && navigate("/auth")
                console.log("Error", err)
            }
        })
    }, [])

    return <div
        className={"grid place-content-center bg-white min-h-screen pb-24 md:max-w-md mx-auto shadow-sm shadow-slate-500"}>
        {posts.map((post: IPost) => {
            return <Post key={post.idPost} {...post}/>
        })}
    </div>
}