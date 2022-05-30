import { Footer } from './containers'
import { Routes, Route } from 'react-router-dom'
import { Quiz, Home } from './pages'

function App() {
    return (
        <main className="min-h-screen bg-cover text-white flex flex-col bg-[url('./assets/background.png')]">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <Footer />
        </main>
    )
}

export default App
