import { Card } from '../../components'
import winner from '../../assets/svg/winner.svg'

interface ResultCardProps {
    score: number
}

const ResultCard = ({ score }: ResultCardProps) => {
    return (
        <Card hideSvg>
            <div className="px-8">
                <img className="mx-auto" src={winner} alt="" />
                <h1 className="text-dark-blue text-5xl font-poppins font-bold text-center">
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
            </div>
        </Card>
    )
}

export default ResultCard
