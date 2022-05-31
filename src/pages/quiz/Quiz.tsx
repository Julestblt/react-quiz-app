import { useEffect, useState } from 'react'
import { quizApi, RandomQuizParams, RootObject } from '../../api/use-quiz.api'
import { Button, Card, Loader } from '../../components'
import { getQueryParams } from '../../helpers/query-params'

const { getRandomQuiz } = quizApi

const Quiz = () => {
    const [quiz, setQuiz] = useState<RootObject[]>([])
    const [currentQuiz, setCurrentQuiz] = useState<number>(0)
    const [selectedOptions, setSelectedOptions] = useState<number[]>([])
    const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const numberToAlphaber = ['A - ', 'B - ', 'C - ', 'D - ', 'E - ', 'F - ']

    const loadQuiz = async (params: RandomQuizParams) => {
        const randomQuiz = await getRandomQuiz(params)
        setQuiz(randomQuiz)
    }

    const clickHandler = (id: number) => {
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
        } else {
            const filteredArray = selectedOptions.filter((item) => item !== id)
            setSelectedOptions(filteredArray)
        }
    }

    useEffect(() => {
        if (quiz[currentQuiz]?.correct_answers)
            setCorrectAnswers(Object.values(quiz[currentQuiz]?.correct_answers))
    }, [quiz, selectedOptions])

    const validateHandler = () => {
        setShowResult(true)
    }

    useEffect(() => {
        const [object1, object2] = getQueryParams(window.location.href).map(
            ({ value, name }) => ({ [name]: value })
        )
        const params = { ...object1, ...object2 } as RandomQuizParams
        loadQuiz(params)
    }, [])

    console.log(correctAnswers)

    return (
        <Card title={quiz[currentQuiz]?.question}>
            {quiz?.length > 0 ? (
                <>
                    <ul className="flex flex-col mt-3">
                        {Object.values(quiz[currentQuiz]?.answers).map(
                            (value, i) => (
                                <>
                                    {value && (
                                        <li key={i} className="my-1">
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
                                                    selectedOptions.includes(
                                                        i
                                                    ) &&
                                                    correctAnswers[i] ===
                                                        'false'
                                                }
                                            >
                                                {numberToAlphaber[i]}
                                                {value}
                                            </Button>
                                        </li>
                                    )}
                                </>
                            )
                        )}
                    </ul>
                    <span className="flex justify-center mt-2">
                        <Button onClick={validateHandler}>Validate</Button>
                    </span>
                </>
            ) : (
                <span className="flex justify-center">
                    <Loader />
                </span>
            )}
            <p className="text-center text-dark-blue mt-4">
                Question {currentQuiz + 1} on {quiz?.length}
            </p>
        </Card>
    )
}

export default Quiz
