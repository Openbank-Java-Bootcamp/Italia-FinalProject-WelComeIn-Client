import { Link } from "react-router-dom";

export default function GalleryCard({ id, name, icon }) {
    //add slogan(?)

    

  return (
    <div className="GalleryCard">
      <Link to={`/galleries/${id}`}>
        <img src={`${icon}`} />
        <h3>{name} Gallery</h3>
      </Link>
    </div>
  )
}
