<template>
    <div class="grid grid-cols-4 gap-4" v-if="classes && klassStats">
        <!-- 班级列表 -->
        <Card v-for="item in classes" :key="item.id || item.name">
            <CardHeader>
                <CardTitle>{{ item.name }}</CardTitle>
                <CardDescription>{{ item.description }}</CardDescription>
            </CardHeader>

            <CardContent class="grid grid-cols-2 gap-2" v-if="klassStats[item.id || item.name]">
                <VerticalDataField :data="`${klassStats[item.id || item.name].total_students} 人`" label="学生人数" />
                <VerticalDataField :data="`${klassStats[item.id || item.name].total_credit_updates} 次`" label="积分更新" />
                <VerticalDataField class="col-span-full"
                    :data="`${klassStats[item.id || item.name].average_credit.toFixed(1)} 分`" label="平均积分" />
            </CardContent>

            <CardFooter>
                <NuxtLink :to="`/klass/${item.id}`">
                    <Button>查看详情</Button>
                </NuxtLink>
            </CardFooter>
        </Card>

        <!-- 创建班级 -->
        <Card v-if="klassCreatePermission">
            <CardHeader>
                <CardTitle>创建班级</CardTitle>
                <CardDescription>需要您有
                    <span class="font-mono">/asmre/class</span> 的
                    <span class="font-mono">create</span> 权限
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AutoForm :schema="classCreateSchema" :field-config="{
                    name: {
                        label: '班级名称'
                    },
                    description: {
                        label: '班级描述',
                        component: 'textarea'
                    }
                }" @submit="createClass">
                    <Button type="submit" class="my-2">
                        提交
                    </Button>
                </AutoForm>
            </CardContent>
        </Card>
    </div>
    <div class="grid grid-cols-4 gap-4" v-else>
        <Skeleton class="w-74 h-64 rounded-md" v-for="item in [...Array(4).keys()]" />
    </div>
</template>

<script lang="ts" setup>
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { type Klass, type KlassStats } from '~/types/klass';

import { AutoForm } from '~/components/ui/auto-form';

import Swal from 'sweetalert2';
import { z } from 'zod';

const classCreateSchema = z.object({
    name: z.string().max(10),
    description: z.string()
})

let classes: Ref<Klass[]> = useFetch('/asmre-api/classes/').data as Ref<Klass[]>
let klassCreatePermission = checkPermission('/asmre/class', 'create')

// 废弃代码
const klassStats: Ref<{ [key: string]: KlassStats }> = ref({})


async function createClass(values: Record<string, any>) {
    const resp = await useFetch('/asmre-api/classes/', {
        method: 'POST',
        body: values
    })

    if (resp.status.value == 'error') {
        Swal.fire({
            icon: 'error',
            title: '创建班级失败',
            text: (resp.data as any).detail || '未知错误'
        })
        return
    }

    await Swal.fire({
        icon: 'success',
        title: '创建班级成功',
        text: '班级创建成功'
    })

    useRouter().go(0)
}
</script>