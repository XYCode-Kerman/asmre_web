export async function checkPermission(resource: string, action: string): Promise<boolean> {
    const resp = await useFetch(`/api/user/check?resource=${resource}&action=${action}`)
    const data = resp.data as Ref<boolean>

    if (data.value == true) {
        return true
    } else return false
}