<template>
    <Card>
        <CardHeader>
            <CardTitle>注册</CardTitle>
            <CardDescription>
                在此处输入用户名和密码以注册一个 ASMRE 账号
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
            <div class="space-y-1">
                <Label for="username">用户名（建议填写为QQ邮箱，方便自动获取QQ头像）</Label>
                <Input
                    @change="avatar = `https://cravatar.cn/avatar/${md5.create().update(username.trim().toLowerCase()).hex()}`"
                    id="username" type="text" v-model="username" />
            </div>
            <div class="space-y-1">
                <Label for="nickname">昵称</Label>
                <Input id="nickname" type="text" v-model="nickname" />
            </div>
            <div class="space-y-1">
                <Label for="avatar" class="flex items-center gap-2">
                    头像URL

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <HelpCircleIcon class="w-5" />
                            </TooltipTrigger>
                            <TooltipContent class="bg-white text-black rounded-lg shadow-lg p-2">
                                <p>ASMRE 默认使用 Cravatar 作为头像服务，在用户名中填入邮箱即可使用。</p>
                                <u class="font-bold">Cravatar 可以自动获取 QQ 邮箱对应的 QQ 号的头像。</u>
                                <p>如果要使用其他头像服务，请自行填写URL。</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>

                <div class="flex items-center gap-1">
                    <img :src="avatar" alt="" class="rounded-xl overflow-hidden w-14">
                    <Input id="avatar" type="text" v-model="avatar" />
                </div>
            </div>
            <div class="space-y-1">
                <Label for="password">密码</Label>
                <Input id="password" type="password" v-model="password" />
            </div>
        </CardContent>
        <CardFooter>
            <Button @click="register">注册</Button>
        </CardFooter>
    </Card>
</template>

<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { md5 } from 'js-md5';
import { hashPassword } from '~/utils/password';

import { HelpCircleIcon } from 'lucide-vue-next';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';

import Swal from 'sweetalert2';

let username = ref('')
let password = ref('')
let nickname = ref('')
let avatar = ref('')

async function register() {
    const resp = await useFetch('/api/user/register', {
        method: 'POST',
        body: {
            'username': username.value,
            'password': hashPassword(password.value),
            'avatar': avatar,
            'nickname': nickname
        }
    })

    if (resp.status.value == 'error') {
        Swal.fire({
            icon: 'error',
            title: '注册失败',
            text: (resp.data as any).detail || '未知错误'
        })
        return
    }

    Swal.fire({
        icon: 'success',
        title: '注册成功',
        text: '请前往登录'
    })
}
</script>