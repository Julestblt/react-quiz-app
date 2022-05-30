import { fetchQuizApi } from './quiz.api'

type QuizCategory =
    | 'linux'
    | 'devops'
    | 'networking'
    | 'programming'
    | 'cloud'
    | 'docker'
    | 'kubernetes'

type Difficulty = 'easy' | 'medium' | 'hard'

type RandomQuizParams = {
    category: QuizCategory
    difficulty: Difficulty
}

interface QuizApi {
    getRandomQuiz: (queryParams: RandomQuizParams) => Promise<RootObject>
}

const quizApi: QuizApi = {
    getRandomQuiz: (queryParams) =>
        fetchQuizApi('GET', 'questions', queryParams),
}

export interface Answers {
    answer_a: string
    answer_b: string
    answer_c: string
    answer_d: string
    answer_e: string
    answer_f?: any
}

export interface CorrectAnswers {
    answer_a_correct: string
    answer_b_correct: string
    answer_c_correct: string
    answer_d_correct: string
    answer_e_correct: string
    answer_f_correct: string
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
    correct_answers: CorrectAnswers
    correct_answer: string
    explanation?: any
    tip?: any
    tags: Tag[]
    category: string
    difficulty: string
}

export { quizApi }
