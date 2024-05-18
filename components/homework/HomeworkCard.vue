<template>
    <Collapsible v-model:open="isOpen" class="flex flex-col">
        <div class="flex items-center justify-between space-x-4 px-4">
            <h4 class="text-sm font-semibold">
                家庭作业
            </h4>
            <CollapsibleTrigger as-child>
                <Button variant="ghost" size="sm" class="w-9 p-0">
                    <ChevronsUpDown class="h-4 w-4" />
                    <span class="sr-only">Toggle</span>
                </Button>
            </CollapsibleTrigger>
        </div>

        <!-- 数据 -->
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>科目</TableHead>
                    <TableHead>名称</TableHead>
                    <TableHead>简介</TableHead>
                    <TableHead>开始日期</TableHead>
                    <TableHead>截止日期</TableHead>
                    <TableHead>操作</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow v-for="homework in homeworks" :key="homework.id">
                    <TableCell>{{ homework.subject }}</TableCell>
                    <TableCell>{{ homework.name }}</TableCell>
                    <TableCell>{{ homework.description }}</TableCell>
                    <TableCell>{{ homework.starttime }}</TableCell>
                    <TableCell>{{ homework.deadline }}</TableCell>
                    <TableCell class="flex gap-2">
                        <Button class="bg-red-500 h-8 text-xs"
                            @click="deleteHomework(homework.id as string)">删除</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- 创建表单 -->
        <CollapsibleContent class="mt-4 px-4" @submit="submit">
            <!-- 可以创建 -->
            <AutoForm :schema="formSchema" :field-config="{
                subject: { label: '科目' },
                name: { label: '名称' },
                description: { label: '简介' },
                starttime: { label: '开始日期', inputProps: { type: 'datetime-local' } },
                deadline: { label: '截止日期', inputProps: { type: 'datetime-local' } },
            }" @submit="submit" v-if="allowCreate">
                <Button type="submit" class="mt-4">提交</Button>
            </AutoForm>

            <!-- 不可创建 -->
            <div v-else>无权限创建作业！</div>
        </CollapsibleContent>
    </Collapsible>
</template>

<script lang="ts" setup>
import { ChevronsUpDown } from 'lucide-vue-next';
import Swal from 'sweetalert2';
import type { PropType } from 'vue';
import { z } from 'zod';
import type { Homework, Klass } from '~/types/klass';

const props = defineProps({
    homeworks: {
        type: Object as PropType<Homework[]>,
        required: true
    },
    klass: {
        type: Object as PropType<Klass>,
        required: true
    },
    allowCreate: {
        type: Boolean,
        default: false
    },
    allowDelete: {
        type: Boolean,
        default: false
    }
})

const formSchema = z.object({
    subject: z.string(),
    name: z.string(),
    description: z.string(),
    starttime: z.string(),
    deadline: z.string(),
})

const isOpen = ref(false)

async function submit(values: Record<string, string>) {
    const confirmed = await Swal.fire({
        title: '确认提交？',
        icon: 'question',
        showCancelButton: true
    })

    if (!confirmed.isConfirmed) {
        Swal.fire({
            title: '已取消',
            icon: 'info'
        })

        return
    }

    const resp = await useCustomFetch('/homework/', {
        method: 'POST',
        body: {
            ...values,
            klass: props.klass
        }
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            title: '提交失败',
            text: resp.data.value || '未知错误',
            icon: 'error'
        })
    } else {
        await Swal.fire({
            title: '提交成功',
            icon: 'success'
        })

        useRouter().go(0)
    }
}

async function deleteHomework(homeworkId: string) {
    const confirmed = await Swal.fire({
        title: '确认删除？',
        icon: 'warning',
        showCancelButton: true
    })

    if (!confirmed.isConfirmed) {
        Swal.fire({
            title: '已取消',
            icon: 'info'
        })

        return
    }

    const resp = await useCustomFetch(`/homework/${homeworkId}`, {
        method: 'DELETE'
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            title: '删除失败',
            text: resp.data.value || '未知错误',
            icon: 'error'
        })
    } else {
        await Swal.fire({
            title: '删除成功',
            icon: 'success'
        })

        useRouter().go(0)
    }
}
</script>