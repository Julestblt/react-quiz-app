interface QueryParams {
    name: string
    value: string
}

const getQueryParams = (url: string): QueryParams[] => {
    const queryParams = url.split('?')[1]
    if (!queryParams) {
        return []
    }
    return queryParams.split('&').map((queryParam) => {
        const [name, value] = queryParam.split('=')
        return { name, value }
    })
}

export { getQueryParams }
