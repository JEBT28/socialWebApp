import {useEffect, useState} from "react";
import {PostService} from "../services/postService";
import {IPost} from "../interfaces/Post";
import {Post} from "../components/post";


export const HomePage = () => {
    const postService = new PostService();
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        postService.getPosts().subscribe({
            next: (value: any) => {
                setPosts(value.results)
            },
            error: err => {
                console.log("Error", err)
            }
        })
    }, [])

    return <div
        className={"grid place-content-center bg-white min-h-screen pb-24 md:max-w-md mx-auto shadow-sm shadow-slate-500"}>
        {posts.map((post: IPost) => {
            return <Post {...post}/>
        })}
    </div>
}