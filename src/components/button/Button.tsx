import { useState } from 'react'
import { useEffect } from 'react'

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'selected'
    | 'success'
    | 'error'
    | 'ghost'

interface ButtonProps {
    children?: string | React.ReactNode
    onClick?: () => void
    variant?: ButtonVariant
    disabled?: boolean
    restProps?: any
    selected?: boolean
    className?: string
    success?: boolean
    error?: boolean
}

const buttonVariants = {
    default:
        'rounded-lg py-2 px-4 font-poppins font-medium flex justify-between items-center text-left text-lg',
    primary: 'bg-dark-blue',
    secondary:
        'border border-purple-opacity text-purple-opacity bg-white hover:bg-purple-opacity hover:text-white hover:border-purple-opacity',
    selected: 'border bg-orange text-white border-orange',
    success: 'border bg-green border-green text-white',
    error: 'border bg-red border-red text-white',
    ghost: 'border border-dark-blue bg-white text-dark-blue border-2 hover:border-dark-blue hover:bg-dark-blue hover:text-white',
}

const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    selected = false,
    success = false,
    error = false,
    ...restProps
}: ButtonProps) => {
    const [buttonClass, setButtonClass] = useState<string>('')

    const getButtonVariant = (): string => {
        if (success) return buttonVariants['success']
        else if (error) return buttonVariants['error']
        else if (selected) return buttonVariants['selected']
        else return buttonVariants[variant]
    }

    useEffect(() => {
        setButtonClass(
            [buttonVariants.default, getButtonVariant(), className].join(' ')
        )
    }, [variant, selected, success, error])

    return (
        <button onClick={onClick} className={buttonClass} {...restProps}>
            {children}
            {success && (
                <span className="material-icons">check_circle_outline</span>
            )}
            {error && <span className="material-icons">highlight_off</span>}
        </button>
    )
}

export default Button
