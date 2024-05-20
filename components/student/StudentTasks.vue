<template>
    <div class="grid grid-cols-4 gap-4">
        <!-- 已有 -->
        <Card v-for="task in tasks" class="shadow-md rounded-lg border-none col-span-2">
            <CardHeader>
                <CardTitle class="flex items-center">
                    <div>任务 {{ task.id?.substring(0, 6) }}...</div>
                    <div class="grow"></div>
                    <div>
                        <Button v-if="checkPermission(`/asmre/task/${task.id}`, 'delete')"
                            class="bg-red-500 hover:bg-red-600" @click="onDelete(task.id)">删除</Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell class="font-bold">状态</TableCell>
                            <TableCell class="font-bold text-xl">
                                <span class="text-green-500" v-if="task.completed">已完成</span>
                                <span class="text-red-500"
                                    v-if="!task.completed && new Date(task.deadline) <= new Date()">超时且未完成</span>
                                <span class="text-blue-500"
                                    v-if="!task.completed && new Date(task.deadline) > new Date()">进行中</span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell class="font-bold">内容</TableCell>
                            <TableCell>{{ task.content }}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell class="font-bold">截止日期</TableCell>
                            <TableCell>{{ new Date(task.deadline).toLocaleString() }}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell class="font-bold">完成</TableCell>
                            <TableCell>{{ task.completed }}</TableCell>
                        </TableRow>

                        <TableRow :class="{
                            'bg-yellow-100': task.completed && new Date(task.deadline) > new Date(), // 任务完成且未过期时应当显示黄色背景
                        }" class="rounded-lg">
                            <TableCell class="font-bold">完成时动作</TableCell>
                            <TableCell class="grid grid-cols-4 gap-4">
                                <StudentTaskAction v-for="action in task.actions_when_completed" :action="action"
                                    :key="action.id" />
                            </TableCell>
                        </TableRow>

                        <TableRow :class="{
                            'bg-yellow-100': !task.completed && new Date(task.deadline) < new Date(), // 任务未完成且已过期时应当显示黄色背景
                        }" class="rounded-lg">
                            <TableCell class="font-bold">未完成/失败时动作</TableCell>
                            <TableCell class="grid grid-cols-4 gap-4">
                                <StudentTaskAction v-for="action in task.actions_when_not_completed" :action="action"
                                    :key="action.id" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <!-- 新增 -->
        <StudentNewTask v-if="allowCreateTask" :student="student" class="shadow-md rounded-lg p-4" />
    </div>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import type { PropType } from 'vue';
import type { Student, Task } from '~/types/student';

const props = defineProps({
    tasks: {
        type: Array as PropType<Task[]>,
        required: true
    },
    allowCreateTask: {
        type: Boolean,
        default: false
    },
    student: {
        type: Object as PropType<Student>,
        required: true
    }
})

async function onDelete(taskId: string | undefined) {
    // 特判
    if (taskId == undefined) {
        Swal.fire({
            icon: 'error',
            title: '错误',
            text: '任务ID不能为空',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '关闭',
        })

        return
    }

    // 删除流程
    const confirm = await Swal.fire({
        title: '确定删除吗？',
        text: "您将无法恢复此任务！",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '删除',
        cancelButtonText: '取消',
    })

    if (!confirm.isConfirmed) {
        Swal.fire('已取消', '删除已取消，内容将不会变更', 'info')
        return
    }

    const resp = await useCustomFetch(`/task/${taskId}`, {
        method: 'DELETE'
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            icon: 'error',
            title: '删除失败',
            text: resp.data.value || '未知错误',
        })
    } else {
        await Swal.fire({
            icon: 'success',
            title: '删除成功',
            text: '任务已删除',
        })

        useRouter().go(0)
    }
}
</script>

<style scoped>
td {
    @apply py-3 px-2;
}
</style>