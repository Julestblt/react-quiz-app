import adventure from '../../assets/svg/adventure.svg'

interface CardProps {
    title: string
    questions: string[]
}

const Card = ({ title, questions }: CardProps) => {
    return (
        <section>
            <h1 className="text-4xl font-bold">Quiz</h1>
            <article className="bg-white rounded-3xl relative w-full py-16 px-8">
                <img
                    width={115}
                    className="absolute -top-12 right-0"
                    src={adventure}
                    alt=""
                />
                <h2 className="text-dark-blue text-2xl font-bold font-poppins">
                    Kuala Lumpur is the capital of
                </h2>
            </article>
        </section>
    )
}

export default Card
