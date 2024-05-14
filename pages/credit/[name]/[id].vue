<template>
    <div>
        <Card>
            <CardHeader>
                <CardTitle class="flex gap-2 items-center">
                    <StudentName :student="student" />
                    <CreditText :credit="credit" />
                </CardTitle>

                <CardDescription class="grid grid-cols-4">
                    <div>学生 ID：{{ student.id }}</div>
                    <div>绑定用户 ID：{{ student.user.id }}</div>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AutoForm :schema="formSchema" :field-config="{
                    type: {
                        label: '类型'
                    },
                    number: {
                        label: '扣分数量'
                    },
                    reason: {
                        component: 'textarea',
                        label: '扣分原因'
                    }
                }" @submit="submit">

                    <Button type="submit" class="mt-4">
                        保存
                    </Button>

                </AutoForm>
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import { z } from 'zod';
import type { CreditUpdate } from '~/types/credit';
import type { Student } from '~/types/student';

const studentName = useRoute().params.name;
const creditUpdateId = useRoute().params.id;

const student = ((await useFetch('/api/student/')).data.value as Student[]).find(x => x.name == studentName) as Student
const credit = (await useFetch(`/api/credit/${student.name}/credit`)).data.value as number
const creditUpdate = ((await useFetch(`/api/credit/${studentName}`)).data.value as CreditUpdate[]).find(x => x.id == creditUpdateId) as CreditUpdate

const formSchema = z.object({
    type: z.enum(['add', 'reduce']).default(creditUpdate.type),
    number: z.number().positive().default(creditUpdate.number),
    reason: z.string().default(creditUpdate.reason)
}).required();

async function submit(msg: Record<string, any>) {
    let data: CreditUpdate = {
        type: msg.type,
        number: msg.number,
        reason: msg.reason,
        create_time: creditUpdate.create_time,
        update_time: new Date().toISOString(),
        student: student
    }

    const resp = await useFetch(`/api/credit/${creditUpdateId}`, {
        method: 'PUT',
        body: data
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            icon: 'error',
            title: '保存失败',
            text: resp.data.toString(),
        })
        return
    }

    Swal.fire({
        icon: 'success',
        title: '保存成功',
        text: '学分记录已成功保存',
    })
}
</script>