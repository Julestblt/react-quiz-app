import { Footer } from './containers'
import { Routes, Route } from 'react-router-dom'
import { Quiz, Home } from './pages'
import { useState } from 'react'

function App() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center text-white app-bg">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
            <Footer />
        </main>
    )
}

export default App
