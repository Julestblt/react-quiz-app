import { Card, Button, Loader } from '../../components'
import winner from '../../assets/svg/winner.svg'
import { useState } from 'react'

interface ResultCardProps {
    score: number
}

const ResultCard = ({ score }: ResultCardProps) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const newQuizHandler = () => (window.location.hash = '#')

    const imageLoaded = () => setIsLoaded(true)

    return (
        <Card hideSvg>
            <img onLoad={imageLoaded} className="mx-auto" src={winner} alt="" />
            {isLoaded ? (
                <>
                    <h1 className="text-dark-blue text-5xl font-poppins font-bold text-center my-10">
                        Results
                    </h1>
                    <p className="text-dark-blue font-poppins text-lg text-center">
                        You got
                        <span className="font-bold text-green text-2xl">
                            {' '}
                            {score}{' '}
                        </span>
                        correct answers
                    </p>
                    <div className="flex justify-center mt-8">
                        <Button onClick={newQuizHandler} variant="ghost">
                            Try again
                        </Button>
                    </div>
                </>
            ) : (
                <div className="flex justify-center">
                    <Loader />
                </div>
            )}
        </Card>
    )
}

export default ResultCard
