<template>
    <div v-if="user != undefined">
        <!-- 头像和昵称 -->
        <div class="flex items-center gap-2">
            <img :src="user.avatar" alt="User Avatar" class="w-8 rounded-lg" />
            <span class="text-lg font-bold">{{ user.nickname }}</span>
        </div>

        <div class="my-2"></div>

        <!-- 其他信息 -->
        <Table class="text-xs">
            <TableBody>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{{ user.id || '无 ID' }}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>用户名</TableCell>
                    <TableCell>{{ user.username }}</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>头像 URL</TableCell>
                    <TableCell class="flex items-center gap-2">
                        <img :src="user.avatar" alt="User Avatar" class="w-8 rounded-lg" />
                        {{ user.avatar }}
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>密码（Hashed）</TableCell>
                    <TableCell>{{ user.password }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <div v-else class="flex flex-col gap-8">
        <div class="flex gap-2 items-center">
            <Skeleton class="w-16 h-16 rounded-lg" />
            <Skeleton class="w-64 h-12 rounded-lg" />
        </div>

        <Skeleton class="w-full h-96" />
    </div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import Skeleton from '~/components/ui/skeleton/Skeleton.vue';

const user = useFetch('/asmre-api/user/me', { lazy: true }).data as Ref<User | undefined>
</script>