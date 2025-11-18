export default function Comments({ comments }) {
    return (
        <div className="details-comments">
            <h2>Comments:</h2>
            <ul>
                {comments.map(comment => <li key={comment._id} className="comment">
                    <p>Content: {comment.comment}</p>
                </li>)}
            </ul>
            {comments.length === 0 && <p className="no-comment">No comments.</p>}
            {/* <!-- Display paragraph: If there are no games in the database --> */}
            {/* <!-- <p className="no-comment">No comments.</p> --> */}
        </div>
    );
};