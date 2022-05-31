import { fetchQuizApi } from './quiz.api'

export type QuizCategory =
    | 'linux'
    | 'devops'
    | 'networking'
    | 'programming'
    | 'cloud'
    | 'docker'
    | 'kubernetes'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuizParams = {
    category: QuizCategory
    difficulty: Difficulty
}

interface QuizApi {
    getRandomQuiz: (queryParams: QuizParams) => Promise<RootObject[]>
}

const quizApi: QuizApi = {
    getRandomQuiz: (queryParams) =>
        fetchQuizApi('GET', 'questions', { ...queryParams, limit: '10' }),
}

export interface Answers {
    [key: string]: string
}

export interface Tag {
    name: string
}

export interface RootObject {
    id: number
    question: string
    description?: any
    answers: Answers
    multiple_correct_answers: string
    correct_answers: string[]
    correct_answer: string
    explanation?: any
    tip?: any
    tags: Tag[]
    category: string
    difficulty: string
}

export { quizApi }
