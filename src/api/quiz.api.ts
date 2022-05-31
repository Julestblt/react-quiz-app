import { buildUrl, QueryParams } from '../helpers/url'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const quizBaseUrl = process.env.REACT_APP_QUIZ_URL as string
const quizApiKey = process.env.REACT_APP_QUIZ_API_KEY as string

/**
 * Just a bit a syntaxic sugar over the fetch API.
 * Also allows to manage global loading state.
 * @param method
 * @param url
 * @param config
 * @returns
 */
const _fetch: (
    method: HttpMethod,
    url: string,
    config: Partial<RequestInit>
) => Promise<any> = async (method, url, config) => {
    let response
    const initConfig = { ...config, method }

    response = await fetch(url, initConfig)

    return response
}

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
    const config: Partial<RequestInit> = {
        headers,
    }
    return (await _fetch(method, url, config)).json()
}

export { fetchQuizApi }
