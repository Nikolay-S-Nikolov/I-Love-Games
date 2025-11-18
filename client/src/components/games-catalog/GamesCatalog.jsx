import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard.jsx";

export default function GamesCatalog() {
    const [games, setGames] = useState([])
    useEffect(() => {
        const controller = new AbortController();
        fetch('http://localhost:3030/jsonstore/games?sortBy=_createdOn%20desc', {
            signal: controller.signal
        })
            .then(res => res.json())
            .then(data => setGames(Object.values(data)))
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(err.message);
                }
            });
        return () => { controller.abort(); }
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            {/* <!-- Display div: with information about every game (if any) --> */}
            <div className="catalog-container">
                {games.map(game => <GameCard key={game._id} {...game} />)}
                {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}
            </div>
        </section>
    );
};