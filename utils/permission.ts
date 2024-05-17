export function checkPermission(resource: string, action: string): Ref<boolean> {
    const resp = useFetch(`/asmre-api/user/check?resource=${resource}&action=${action}`, { lazy: true })
    return resp.data as Ref<boolean>
}