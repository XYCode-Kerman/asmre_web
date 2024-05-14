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
                <CreditUpdateTable :allowCreate="allowCreate" :allowUpdate="allowUpdate" :allowDelete="allowDelete"
                    v-model:credit="credit" v-model:creditUpdates="creditUpdates" :allowOprationStudents="[student]" />
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import { useRoute } from 'vue-router';
import type { CreditUpdate } from '~/types/credit';
import type { Student } from '~/types/student';

const route = useRoute()

let studentName = route.params.name
if (typeof studentName == 'object') {
    studentName = studentName[0]
}

const [allowCreate, allowUpdate, allowDelete, students, credit, creditUpdates] = await Promise.all([
    checkPermission(`/asmre/credit/${studentName}`, 'create'),
    checkPermission(`/asmre/credit/${studentName}`, 'write'),
    checkPermission(`/asmre/credit/${studentName}`, 'delete'),
    useFetch('/api/student').data as Ref<Student[]>,
    useFetch(`/api/credit/${studentName}/credit`).data as Ref<number>,
    useFetch(`/api/credit/${studentName}`).data as Ref<CreditUpdate[]>
])

const student = computed((): Student => {
    if (students.value == undefined) {
        return {
            name: studentName,
            school_class: {
                name: '获取中',
                description: '获取中'
            },
            user: {
                username: '获取中',
                nickname: '获取中',
                password: '获取中',
                avatar: '获取中'
            }
        }
    }

    const result = students.value.find(x => x.name == studentName)
    if (result == undefined) {
        Swal.fire('调用出错', '找不到学生', 'error')
        return {} as Student
    }

    return result
})
</script>