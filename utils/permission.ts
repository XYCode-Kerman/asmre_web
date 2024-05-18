export function checkPermission(resource: string, action: string): Ref<boolean> {
    const resp = useCustomLazyFetch(`/user/check?resource=${resource}&action=${action}`)
    return resp.data as Ref<boolean>
}