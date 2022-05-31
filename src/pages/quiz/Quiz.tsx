import { useEffect, useState } from 'react'
import { quizApi, QuizParams, RootObject } from '../../api/use-quiz.api'
import { Button, Card, Loader } from '../../components'
import { ResultCard } from '../../containers'
import { getQueryParams } from '../../helpers/query-params'

const { getRandomQuiz } = quizApi

const Quiz = () => {
    const [quiz, setQuiz] = useState<RootObject[]>([])
    const [currentQuiz, setCurrentQuiz] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const [maxSelections, setMaxSelections] = useState<number>(0)
    const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false)
    const numberToAlphabet = ['A - ', 'B - ', 'C - ', 'D - ', 'E - ', 'F - ']

    const loadQuiz = async (params: QuizParams) => {
        const randomQuiz = await getRandomQuiz(params)
        setQuiz(randomQuiz)
    }

    const clickHandler = (id: number) => {
        if (!showResult) {
            setMaxSelections(
                quiz[currentQuiz].correct_answer
                    ? 1
                    : Object.values(quiz[currentQuiz].correct_answers).filter(
                          (value) => value === 'true'
                      ).length
            )

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
        const isCorrect = selectedOptions.map((option) => {
            return correctAnswers[option] === 'true'
        })
        if (
            !isCorrect.includes(false) &&
            maxSelections === selectedOptions.length
        )
            setScore(score + 1)
    }

    const nextQuestionHandler = () => {
        if (currentQuiz < quiz.length - 1) {
            setShowResult(false)
            setSelectedOptions([])
            setCurrentQuiz(currentQuiz + 1)
        } else {
            setIsQuizFinished(true)
        }
    }

    useEffect(() => {
        const queryParams = getQueryParams(window.location.href) as QuizParams
        loadQuiz(queryParams)
    }, [])

    if (!isQuizFinished)
        return (
            <>
                <Card title={quiz[currentQuiz]?.question}>
                    {quiz?.length > 0 ? (
                        <>
                            <ul className="flex flex-col mt-3">
                                {Object.values(quiz[currentQuiz]?.answers).map(
                                    (value, i) => (
                                        <li key={i} className="my-1">
                                            {value && (
                                                <Button
                                                    onClick={() =>
                                                        clickHandler(i)
                                                    }
                                                    className="w-full"
                                                    variant="secondary"
                                                    selected={selectedOptions.includes(
                                                        i
                                                    )}
                                                    success={
                                                        showResult &&
                                                        correctAnswers[i] ===
                                                            'true'
                                                    }
                                                    error={
                                                        showResult &&
                                                        selectedOptions.includes(
                                                            i
                                                        ) &&
                                                        correctAnswers[i] ===
                                                            'false'
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
                                    <Button onClick={nextQuestionHandler}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button onClick={validateHandler}>
                                        Validate
                                    </Button>
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
                <section className="bg-white w-min mx-auto text-center rounded-xl p-3 mt-4">
                    <p className="font-medium text-dark-blue">Score</p>
                    <p className="text-white bg-dark-blue rounded-xl font-bold">
                        {score}
                    </p>
                </section>
            </>
        )
    else return <ResultCard score={score} />
}

export default Quiz
