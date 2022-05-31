const getQueryParams = (url: string): { [key: string]: string } => {
    const queryParams = url.split('?')[1]
    if (!queryParams) {
        return {}
    }
    const [obj1, obj2] = queryParams
        .split('&')
        .map((queryParam) => {
            const [name, value] = queryParam.split('=')
            return { name, value }
        })
        .map(({ value, name }) => ({ [name]: value }))

    return { ...obj1, ...obj2 }
}

export { getQueryParams }
