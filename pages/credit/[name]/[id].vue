<template>
    <div v-if="student != undefined && credit != undefined">
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

    <div v-else>
        <Card>
            <CardHeader>
                <Skeleton class="h-10" />
            </CardHeader>

            <CardContent>
                <Skeleton class="h-40" />
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

const _students = useCustomLazyFetch('/student/').data as Ref<Student[] | undefined>
const credit = useCustomLazyFetch(`/credit/${studentName}/credit`).data as Ref<number | undefined>
const _creditUpdates = useCustomLazyFetch(`/credit/${studentName}`).data as Ref<CreditUpdate[] | undefined>

const student = computed(() => _students.value?.find(x => x.name == studentName) as Student | undefined)
const creditUpdate = computed(() => _creditUpdates.value?.find(x => x.id == creditUpdateId) as CreditUpdate | undefined)

const formSchema = z.object({
    type: z.enum(['add', 'reduce']).default(creditUpdate.value?.type || 'add'),
    number: z.number().positive().default(creditUpdate.value?.number || 0),
    reason: z.string().default(creditUpdate.value?.reason || '')
}).required();

async function submit(msg: Record<string, any>) {
    let data: CreditUpdate = {
        type: msg.type,
        number: msg.number,
        reason: msg.reason,
        create_time: creditUpdate.value?.create_time || '未定义',
        update_time: new Date().toISOString(),
        student: student.value as Student
    }

    const resp = await useCustomFetch(`/credit/${creditUpdateId}`, {
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