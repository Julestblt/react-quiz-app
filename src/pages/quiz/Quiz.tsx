import { useEffect, useState } from 'react'
import { quizApi, RootObject } from '../../api/use-quiz.api'

const { getRandomQuiz } = quizApi

const Quiz = () => {
    const [quiz, setQuiz] = useState<RootObject>()

    const loadQuiz = async () => {
        const randomQuiz = await getRandomQuiz({
            difficulty: 'easy',
            category: 'linux',
        })
        setQuiz(randomQuiz)
    }

    useEffect(() => {
        loadQuiz()
    }, [])

    return <p>Quiz</p>
}

export default Quiz
