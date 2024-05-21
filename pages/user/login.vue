<template>
    <div>
        <Card>
            <CardHeader>
                <CardTitle>登录</CardTitle>
                <CardDescription>
                    输入用户名和密码以登录
                </CardDescription>
            </CardHeader>
            <CardContent class="space-y-2">
                <div class="space-y-1">
                    <Label for="username">用户名</Label>
                    <Input id="username" v-model="username" />
                </div>
                <div class="space-y-1">
                    <Label for="password">密码</Label>
                    <Input id="password" type="password" v-model="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button @click="login">登录</Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Swal from 'sweetalert2';

let username = ref('')
let password = ref('')

async function login() {
    const resp = await useCustomFetch(`/user/login?username=${username.value}&password=${hashPassword(password.value)}`, {
        method: 'POST'
    })

    useCookie('token', {
        expires: new Date(7 * 24 * 60 * 60 * 1000 + new Date().getTime()), // 7 days
    }).value = resp.data.value

    if (resp.status.value == 'error') {
        Swal.fire({
            icon: 'error',
            title: '登录失败',
            text: (resp.data as any).detail || '未知错误'
        })

        return
    }

    Swal.fire({
        icon: 'success',
        title: '登录成功',
    })
}
</script>