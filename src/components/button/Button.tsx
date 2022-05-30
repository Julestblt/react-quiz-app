import { useState } from 'react'
import { useEffect } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
    children?: string | React.ReactNode
    onClick?: () => void
    variant?: ButtonVariant
    disabled?: boolean
    restProps?: any
}

const buttonVariants = {
    default: 'rounded-lg py-2 px-4 font-poppins font-medium',
    primary: 'bg-dark-blue',
    secondary: 'border border-purple-opacity text-purple-opacity bg-white',
}

const Button = ({
    children,
    onClick,
    variant = 'primary',
    ...restProps
}: ButtonProps) => {
    const [buttonClass, setButtonClass] = useState<string>('')

    useEffect(() => {
        setButtonClass(
            [buttonVariants.default, buttonVariants[variant]].join(' ')
        )
    }, [variant])

    return (
        <button onClick={onClick} className={buttonClass} {...restProps}>
            {children}
        </button>
    )
}

export default Button
