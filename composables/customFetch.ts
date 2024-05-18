import type { UseFetchOptions } from "#app"

export const useCustomFetch = (request: string | Ref<string>, opts?: UseFetchOptions<any, any, any, any>) => {
    return useFetch(request, {
        baseURL: 'http://asmre.api.xycode.club:32357/',
        headers: {
            'X-Token': useCookie('token').value || 'NO TOKEN'
        },
        ...opts
    })
}

export const useCustomLazyFetch = (request: string | Ref<string>, opts?: UseFetchOptions<any, any, any, any>) => {
    return useCustomFetch(request, { ...opts, lazy: true })
}