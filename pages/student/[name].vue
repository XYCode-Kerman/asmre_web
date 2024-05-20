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
                <Divider>任务表</Divider>
                <StudentTasks :student="student" :allowCreateTask="allowCreateTask" :tasks="tasks" />

                <Divider class="mt-8">操行分加减</Divider>
                <CreditUpdateTable :allowCreate="allowCreateCU" :allowUpdate="allowUpdateCU"
                    :allowDelete="allowDeleteCU" v-model:credit="credit" v-model:creditUpdates="creditUpdates"
                    :allowOprationStudents="[student]" />
            </CardContent>
        </Card>
    </div>

    <div v-else>
        加载中
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { CreditUpdate } from '~/types/credit';
import type { Student, Task } from '~/types/student';

const route = useRoute()

let studentName = route.params.name
if (typeof studentName == 'object') {
    studentName = studentName[0]
}

const [allowCreateCU, allowUpdateCU, allowDeleteCU, students, credit, creditUpdates] = [
    checkPermission(`/asmre/credit/${studentName}`, 'create'),
    checkPermission(`/asmre/credit/${studentName}`, 'write'),
    checkPermission(`/asmre/credit/${studentName}`, 'delete'),
    useCustomFetch(`/student/by/name/${studentName}`).data as Ref<Student[]>,
    useCustomFetch(`/credit/${studentName}/credit`).data as Ref<number>,
    useCustomFetch(`/credit/${studentName}`).data as Ref<CreditUpdate[]>
]

const student = computed(() => {
    if (students.value == undefined) {
        return undefined
    } else return students.value[0]
})

const [allowCreateTask, tasks] = [
    checkPermission(`/asmre/task`, 'create'),
    useCustomFetch(`/task/by/student/name/${studentName}`).data as Ref<Task[]>
    // useFetch(`https://asmre.api.xycode.club/task/`).data
]

if (process.server) {
    console.log('server', tasks)
} else {
    console.log('client', tasks)
}
</script>