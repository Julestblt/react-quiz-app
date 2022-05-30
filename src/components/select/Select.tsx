import './select.css'
import { ArrowDown } from './'
import { useState } from 'react'
import { uuid } from '../../helpers/uuid'

interface SelectProps {
    buttonTitle: string
    options?: string[]
    optionSelected: (option: string) => void
}

const Select = ({ buttonTitle, options, optionSelected }: SelectProps) => {
    const [selectedOption, setSelectedOption] = useState<string>('')

    const selectOptionHandler = (option: string) => {
        setSelectedOption(option)
        optionSelected(option)
    }

    return (
        <div className=" relative inline-block text-left dropdown text-dark-blue w-full">
            <span className="rounded-md shadow-sm">
                <button
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 capitalize"
                    type="button"
                >
                    <span>{selectedOption || buttonTitle}</span>
                    <ArrowDown />
                </button>
            </span>
            <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                <div
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    role="menu"
                >
                    <ul>
                        {options?.map((value, i) => (
                            <li key={uuid()}>
                                <button
                                    onClick={() => selectOptionHandler(value)}
                                    className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left hover:text-white hover:bg-dark-blue capitalize"
                                    role="menuitem"
                                >
                                    {value}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Select
