import type { UseFetchOptions } from "#app"
import Swal, { type SweetAlertResult } from "sweetalert2"

export const useCustomFetch = (request: string | Ref<string>, opts?: UseFetchOptions<any, any, any, any>, showErrorAlert = true, showSubmitingAlert = false) => {
    const resp = useFetch(request, {
        baseURL: useRuntimeConfig().public.baseURL,
        headers: {
            'X-Token': useCookie('token').value || ''
        },
        ...opts
    })

    // 客户端处理弹窗
    let alert: Promise<SweetAlertResult<any>> | undefined = undefined

    if (opts?.method != 'GET' && opts?.method != 'OPTIONS' && showSubmitingAlert) {
        alert = Swal.fire({
            title: '提交中',
            icon: 'info',
            showConfirmButton: false,
            showCancelButton: false,
            showDenyButton: false,
            showCloseButton: false
        })
    }

    watch(resp.status, async (newVal, oldVal) => {
        Swal.close()

        if (newVal != 'success' && showErrorAlert) {
            Swal.fire({
                title: 'Oops...',
                text: resp.data.value || resp.error.value?.data.detail || resp.error.value || '未知错误',
                icon: 'error',
                showConfirmButton: true,
                showCancelButton: false
            })
        }
    }, { once: true })

    return resp
}

export const useCustomLazyFetch = (request: string | Ref<string>, opts?: UseFetchOptions<any, any, any, any>) => {
    return useCustomFetch(request, { ...opts, lazy: true }, false, false)
}