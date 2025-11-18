import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard.jsx";

export default function Home() {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        fetch('http://localhost:3030/jsonstore/games?sortBy=_createdOn%20desc')
            .then(res => res.json())
            .then(data => setGames(Object.values(data).slice(0, 3)))
            .catch(err => alert(err.message));
        return () => { controller.abort(); }
    }, [])
    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in </h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>

            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    {/* <!-- Display div: with information about every game (if any) --> */}
                    <div className="home-container">
                        {games.map(game => <GameCard key={game._id} {...game} />)}
                        {/* <!-- Display paragraph: If there is no games  --> */}
                        {games.length === 0 && <p className="no-articles">No games yet</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};