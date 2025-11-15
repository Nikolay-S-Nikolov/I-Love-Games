
import { Route, Routes } from 'react-router'

import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import GamesCatalog from './components/games-catalog/GamesCatalog.jsx'

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/games' element={<GamesCatalog />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
