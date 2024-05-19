<template>
    <AutoForm :schema="schema" :field-config="{
        content: { component: 'textarea' },
        deadline: { inputProps: { type: 'datetime-local' } }
    }" @submit="onSubmit">
        <Button type="submit">提交</Button>
    </AutoForm>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import { z } from 'zod';
import type { Student } from '~/types/student';

const props = defineProps({
    student: {
        type: Object as PropType<Student>,
        required: true
    }
})

const taskActionSchema = z.object({
    action: z.enum(['add_credit', 'reduce_credit']).describe('操作'),
    data: z.number().describe('操作分数')
}).describe('操作')

const schema = z.object({
    content: z.string().describe('内容'),
    deadline: z.string().describe('截止日期'),
    actions_when_completed: z.array(taskActionSchema).describe('完成时执行操作列表').default([]),
    actions_when_not_completed: z.array(taskActionSchema).describe('未完成/失败时执行操作列表').default([]),
})

async function onSubmit(values: Record<string, any>) {
    values['student'] = props.student

    const resp = await useCustomFetch('/task/', {
        method: 'POST',
        body: values
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            icon: 'error',
            title: '提交失败',
            text: resp.data.value || '未知错误'
        })
    } else {
        await Swal.fire({
            icon: 'success',
            title: '提交成功',
            text: '任务已成功提交'
        })

        useRouter().go(0)
    }
}
</script>