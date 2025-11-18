
import { Route, Routes } from 'react-router'

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import GamesCatalog from './components/games-catalog/GamesCatalog.jsx'
import GameDetails from './components/game-details/GameDetails.jsx'
import GameCreate from './components/game-create/GameCreate.jsx'
import GameEdit from './components/game-edit/GameEdit.jsx'

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/games' element={<GamesCatalog />} />
                <Route path='/games/:gameId/details' element={<GameDetails />} />
                <Route path='/games/create' element={<GameCreate />} />
                <Route path='/games/:gameId/edit' element={<GameEdit />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
