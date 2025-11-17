import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard.jsx";

export default function GamesCatalog() {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/games?sortBy=_createdOn%20desc')
            .then(res => res.json())
            .then(data => setGames(Object.values(data)))
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            {/* <!-- Display div: with information about every game (if any) --> */}
            <div className="catalog-container">
                {games.map(game => <GameCard key={game._id} {...game}/>)}
                {games.length===0 && <h3 className="no-articles">No Added Games Yet</h3>}
            </div>
        </section>
    );
};