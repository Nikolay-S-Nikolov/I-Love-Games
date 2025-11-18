import { useActionState, useEffect } from "react";

export default function CommentCreate({ gameId, handleCommentAdded }) {
    async function createCommentAction(prevState, formData) {
        const data = Object.fromEntries(formData.entries());
        if (data.comment.trim() == ''){
            return { error: 'The comment can not be empty string', success: false };
        }
        data['gameId'] = gameId;

        try {
            const response = await fetch('http://localhost:3030/jsonstore/comments', {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create comment');
            }
            const newComment = await response.json();

            return { error: null, success: true, newComment };

        } catch (err) {
            return { error: err.message, success: false };
        };
    }

    const [state, submitAction, isPending] = useActionState(createCommentAction, { error: null, success: false, newComment: null });

    useEffect(() => {
        if (state.success && state.newComment) {
            handleCommentAdded(state.newComment);
            state.success = false;
        }
    }, [state, handleCommentAdded])



    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form action={submitAction} className="form">
                {state.error && <div className="error-banner"> Error: {state.error}</div>}
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" disabled={isPending} value={isPending ? "Adding Comment" : "Add Comment"} />
            </form>
        </article>
    );
};