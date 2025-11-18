import { useEffect, useState } from "react";

export default function Comments({ gameId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/comments?where=gameId%3D%22${gameId}%22`)
            .then(res => res.json())
            .then(data => setComments(Object.values(data)))
            .catch(err => alert(err.message));
    }, [gameId]);

    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment=><li key={comment._id} className="comment">
                    <p>Content: {comment.comment}</p>
                </li>)}
            </ul>
            {comments.length === 0 && <p className="no-comment">No comments.</p>}
            {/* <!-- Display paragraph: If there are no games in the database --> */}
            {/* <!-- <p className="no-comment">No comments.</p> --> */}
        </div>
    );
};