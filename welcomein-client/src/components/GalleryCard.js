import { Link } from "react-router-dom";

export default function GalleryCard({ id, name, icon }) {
    //add slogan(?)

    

  return (
    <div className="GalleryCard">
      <Link to={`/api/galleries/${id}`}>
        <img src={`${icon}`} />
        <h3>{name}</h3>
      </Link>
    </div>
  )
}
