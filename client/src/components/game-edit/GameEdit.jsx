import { useActionState, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function GameEdit() {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const navigate = useNavigate();
    const [state, submitAction, isPending] = useActionState(gameEditAction, { error: null, success: false });

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/games/${gameId}`)
            .then(res => res.json())
            .then(setGame)
            .catch(err => alert(err.message));
    }, [gameId])

    useEffect(() => {
        if (state.success) {
            navigate(`/games/${gameId}/details`);
        };
    }, [state, navigate, gameId]);

    async function gameEditAction(prevState, formData) {
        const data = Object.fromEntries(formData.entries());

        const newData = { ...game, ...data }

        try {
            const response = await fetch(`http://localhost:3030/jsonstore/games/${gameId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(newData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create game');
            }
            return { error: null, success: true }

        } catch (err) {
            return { error: err.message, success: false };
        };
    }

    return (

        <section id="edit-page">
            {/* <!-- add Page ( Only for logged-in users ) --> */}
            <form action={submitAction} id="add-new-game">
                <div className="container">

                    <h1>Edit Game</h1>

                    {state.error && <div className="errpr-banner">
                        Error:{state.error}
                    </div>}

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" name="title" defaultValue={game.title} placeholder="Enter game title..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" defaultValue={game.genre} placeholder="Enter game genre..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" name="players" defaultValue={game.players} min="0" placeholder="0" />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="date" defaultValue={game.date} />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" defaultValue={game.imageUrl} placeholder="Enter image URL..." />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5" defaultValue={game.summary}
                            placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input className="btn submit" disabled={isPending} type="submit" value={isPending ? "EDITING GAME" : "EDIT GAME"} />
                </div>
            </form>
        </section>
    );
};