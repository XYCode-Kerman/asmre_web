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
                <CreditUpdateTable :allowCreate="allowCreate" :allowUpdate="allowUpdate" :allowDelete="allowDelete"
                    v-model:credit="credit" v-model:creditUpdates="creditUpdates" :allowOprationStudents="[student]" />
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
    useFetch(`/asmre-api/student/by/name/${studentName}`).data as Ref<Student[]>,
    useFetch(`/asmre-api/credit/${studentName}/credit`).data as Ref<number>,
    useFetch(`/asmre-api/credit/${studentName}`).data as Ref<CreditUpdate[]>
])

const student = computed(() => {
    if (students.value == undefined) {
        return undefined
    } else return students.value[0]
})
</script>