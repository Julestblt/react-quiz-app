import { buildUrl, QueryParams } from '../helpers/url'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const quizBaseUrl = process.env.REACT_APP_QUIZ_URL as string
const quizApiKey = process.env.REACT_APP_QUIZ_API_KEY as string

/**
 * Allow to get the quiz api headers
 * @returns The headers
 */
const getQuizHeaders = () => {
    const headers = {
        'X-Api-Key': quizApiKey,
    }
    return headers
}

const fetchQuizApi = async (
    method: HttpMethod,
    endpoint: string,
    queryParams?: QueryParams
): Promise<any> => {
    const headers = getQuizHeaders()
    const url = buildUrl(quizBaseUrl, endpoint, queryParams)
    const config: AxiosRequestConfig = {
        url,
        headers,
        method,
    }
    return await axios(config)
}

export { fetchQuizApi }
