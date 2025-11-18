import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router'
import Comments from '../comments/Comments.jsx';
import CommentCreate from '../comment-create/CommentCreate.jsx';

export default function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/games/${gameId}`)
            .then(res => res.json())
            .then(setGame)
            .catch(err => alert(err.message));

        fetch(`http://localhost:3030/jsonstore/comments?where=gameId%3D%22${gameId}%22`)
            .then(res => res.json())
            .then(data => setComments(Object.values(data)))
            .catch(err => alert(err.message));
    }, [gameId]);

    const gameDeleteClickHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete ${game.title}`);
        if (!isConfirmed) return;
        try {
            await fetch(`http://localhost:3030/jsonstore/games/${gameId}`, {
                method: "DELETE",
            });
            navigate('/games');
        } catch (err) {
            alert('Cannot delete this game', err.message)
        };

    };

    const handleCommentAdded = (newComment) => {
        setComments(prev => [...prev, newComment]);
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="header-and-image">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />

                    <div className="meta-info">
                        <h1 className="game-name">{game.title}</h1>

                        <p className="data-row">
                            <span className="label">Genre:</span>
                            <span className="value">{game.genre}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Active Players:</span>
                            <span className="value">{game.players}</span>
                        </p>

                        <p className="data-row">
                            <span className="label">Release Date:</span>
                            <span className="value">{game.date}</span>
                        </p>
                    </div>
                    <div className="summary-section">
                        <h2>Summary:</h2>
                        <p className="text-summary">
                            {game.summary}
                        </p>
                    </div>
                </div>


                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <button onClick={gameDeleteClickHandler} className="button">Delete</button>
                </div>

                <Comments comments={comments} />

            </div>
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <CommentCreate gameId={gameId} handleCommentAdded={handleCommentAdded} />
        </section>
    );
};