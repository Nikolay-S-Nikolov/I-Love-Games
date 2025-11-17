import { useActionState } from "react";
import { useNavigate } from "react-router"

async function createGameAction(prevState, formData) {
    const data = Object.fromEntries(formData.entries());
    data._createdOn = Date.now();
    try {
        const response = await fetch('http://localhost:3030/jsonstore/games', {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
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

export default function GameCreate() {
    const navigate = useNavigate();

    const [state, submitAction, isPending] = useActionState(createGameAction, {
        error: null,
        success: false
    })

    if (state.success) {
        navigate('/games');
        return null
    }
    
    return (
        <section id="add-page">
            {/* <!-- add Page ( Only for logged-in users ) --> */}

            <form action={submitAction} id="add-new-game">
                <div className="container">

                    <h1>Add New Game</h1>

                    {state.error && <div className="errpr-banner">
                        Error:{state.error}
                    </div>}

                    <div className="form-group-half">
                        <label htmlFor="gameName">Game Name:</label>
                        <input type="text" id="gameName" name="title" placeholder="Enter game title..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input type="text" id="genre" name="genre" placeholder="Enter game genre..." />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="activePlayers">Active Players:</label>
                        <input type="number" id="activePlayers" name="players" min="0" placeholder="0" />
                    </div>

                    <div className="form-group-half">
                        <label htmlFor="releaseDate">Release Date:</label>
                        <input type="date" id="releaseDate" name="date" />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter image URL..." />
                    </div>

                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" rows="5" placeholder="Write a brief summary..."></textarea>
                    </div>

                    <input
                        className="btn submit"
                        type="submit" disabled={isPending}
                        value={isPending? "Adding Game":"ADD GAME"}
                    />
                </div>
            </form>
        </section>
    );
};