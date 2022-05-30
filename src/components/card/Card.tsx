import { useState } from 'react'
import { useEffect } from 'react'
import adventure from '../../assets/svg/adventure.svg'

interface CardProps {
    title: string
    children?: React.ReactNode
    titleCentered?: boolean
}

const baseTitleClasses = 'text-dark-blue text-2xl font-bold font-poppins'

const Card = ({ title, children, titleCentered = false }: CardProps) => {
    const [titleClasses, setTitleClasses] = useState<string>(baseTitleClasses)

    useEffect(() => {
        if (titleCentered)
            setTitleClasses([titleClasses, 'text-center'].join(' '))
    }, [])

    return (
        <section className="w-1/4">
            <h1 className="text-4xl font-bold my-3">Quiz</h1>
            <article className="bg-white rounded-3xl relative w-full py-16 px-8">
                <img
                    width={115}
                    className="absolute -top-12 right-0"
                    src={adventure}
                    alt=""
                />
                <h2 className={titleClasses}>{title}</h2>
                {children}
            </article>
        </section>
    )
}

export default Card
