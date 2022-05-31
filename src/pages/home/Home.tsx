import { useState } from 'react'
import { Card, Button, Select } from '../../components'
import { categoriesOptions, difficultyOptions } from '../../constants/constants'

const Home = () => {
    const [category, setCategory] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('')

    const quizHandler = () => {
        const url = `/quiz?category=${category}&difficulty=${difficulty}`
        window.location.hash = url
    }

    return (
        <Card titleCentered title="Welcome to my Quiz app">
            <div className="grid grid-cols-2 gap-3 mt-3">
                <Select
                    optionSelected={(option) => setCategory(option)}
                    buttonTitle="Category"
                    options={categoriesOptions}
                />
                <Select
                    optionSelected={(option) => setDifficulty(option)}
                    buttonTitle="Difficulty"
                    options={difficultyOptions}
                />
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    onClick={quizHandler}
                    variant="primary"
                    disabled={!(category && difficulty)}
                >
                    Start a new Quiz
                </Button>
            </div>
        </Card>
    )
}

export default Home
