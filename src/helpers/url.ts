export type QueryParams = { [key: string]: string } | null

/**
 * Allows to build an URL with the base url, the specific endpoint to call and the queryParams.
 * @param baseUrl
 * @param endpoint
 * @param queryParams
 * @returns
 */
const buildUrl = (
    baseUrl: string,
    endpoint: string,
    queryParams?: QueryParams
) => {
    const url = new URL(`${baseUrl}/${endpoint}`)
    if (queryParams)
        Object.entries(queryParams).forEach(([key, value]) =>
            url.searchParams.append(key, value)
        )
    return url.href
}

export { buildUrl }
