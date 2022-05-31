import { useEffect, useState } from 'react'
import { quizApi, QuizParams, RootObject } from '../../api/use-quiz.api'
import { Button, Card, Loader } from '../../components'
import { getQueryParams } from '../../helpers/query-params'

const { getRandomQuiz } = quizApi

const Quiz = () => {
    const [quiz, setQuiz] = useState<RootObject[]>([])
    const [currentQuiz, setCurrentQuiz] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const numberToAlphabet = ['A - ', 'B - ', 'C - ', 'D - ', 'E - ', 'F - ']

    const loadQuiz = async (params: QuizParams) => {
        const randomQuiz = await getRandomQuiz(params)
        setQuiz(randomQuiz)
    }

    const clickHandler = (id: number) => {
        if (!showResult) {
            let maxSelections: number = quiz[currentQuiz].correct_answer
                ? 1
                : Object.values(quiz[currentQuiz].correct_answers).filter(
                      (value) => value === 'true'
                  ).length

            if (
                !selectedOptions.includes(id) &&
                selectedOptions.length < maxSelections
            ) {
                setSelectedOptions([...selectedOptions, id])
            } else if (maxSelections === 1 && !selectedOptions.includes(id)) {
                setSelectedOptions([id])
            } else {
                const filteredArray = selectedOptions.filter(
                    (item) => item !== id
                )
                setSelectedOptions(filteredArray)
            }
        }
    }

    useEffect(() => {
        if (quiz[currentQuiz]?.correct_answers)
            setCorrectAnswers(Object.values(quiz[currentQuiz]?.correct_answers))
    }, [quiz, selectedOptions])

    const validateHandler = () => {
        setShowResult(true)
    }

    const nextQuestionHandler = () => {
        setShowResult(false)
        setSelectedOptions([])
        setCurrentQuiz(currentQuiz + 1)
    }

    useEffect(() => {
        const queryParams = getQueryParams(window.location.href) as QuizParams
        loadQuiz(queryParams)
    }, [])

    return (
        <Card title={quiz[currentQuiz]?.question}>
            {quiz?.length > 0 ? (
                <>
                    <ul className="flex flex-col mt-3">
                        {Object.values(quiz[currentQuiz]?.answers).map(
                            (value, i) => (
                                <li key={i} className="my-1">
                                    {value && (
                                        <Button
                                            onClick={() => clickHandler(i)}
                                            className="w-full"
                                            variant="secondary"
                                            selected={selectedOptions.includes(
                                                i
                                            )}
                                            success={
                                                showResult &&
                                                correctAnswers[i] === 'true'
                                            }
                                            error={
                                                showResult &&
                                                selectedOptions.includes(i) &&
                                                correctAnswers[i] === 'false'
                                            }
                                        >
                                            {numberToAlphabet[i]}
                                            {value}
                                        </Button>
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                    <span className="flex justify-center mt-2">
                        {showResult ? (
                            <Button onClick={nextQuestionHandler}>Next</Button>
                        ) : (
                            <Button onClick={validateHandler}>Validate</Button>
                        )}
                    </span>
                </>
            ) : (
                <span className="flex justify-center">
                    <Loader />
                </span>
            )}
            <p className="text-center text-dark-blue mt-4 font-medium">
                Question {currentQuiz + 1} of {quiz?.length}
            </p>
        </Card>
    )
}

export default Quiz
