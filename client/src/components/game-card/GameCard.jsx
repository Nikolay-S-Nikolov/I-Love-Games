import { Link } from "react-router"

export default function GameCard({
    _id,
    title,
    imageUrl,
    genre

}) {
    return (
        <div className="game">
            <img src={imageUrl} alt={title}/>
            <div className="details-overlay">
                <p className="name">{title}</p>
                <p className="genre">{genre}</p>
                {/* <Link to={`/games/${_id}/details`} className="details-button">Details</Link> */}
                <Link to='#' className="details-button">Details</Link>
            </div>
        </div>
    );
};