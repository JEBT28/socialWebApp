import {IPost} from "../interfaces/Post";

export const Post = ({usuario, img, publicacion, descripcion}: IPost) => {
    //Format publicacion from ISO Date to 'dd MM, yyyy'

    const publicacionFormatted = new Date(publicacion).toLocaleDateString("en-us", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
//
// const format = new Intl.DateTimeFormat("es-ES", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
// })
//
// const formattedDate = format.format(publicacion)


    return (<div className={"Post"}>
        <div className={"Post-header"}>
            <span>{usuario}</span>
            <time>{publicacionFormatted}</time>
        </div>
        <div className={"Post-image"}>
            <img src={img} alt=""/>
        </div>
        <div className={"Post-description"}>
            <p>{descripcion}</p>
        </div>
    </div>)
}