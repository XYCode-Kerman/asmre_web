<template>
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center">
                <div>任务 {{ task.id?.substring(0, 6) }}...</div>
                <div class="grow"></div>
                <div class="flex items-center gap-2 md:gap-4">
                    <Button v-if="allowDelete" class="bg-red-500 hover:bg-red-600"
                        @click="onDelete(task.id)">删除</Button>

                    <Button v-if="allowWrite" @click="editMode = !editMode" :class="{
                        'bg-lime-600 hover:bg-lime-700': editMode,
                        'bg-blue-600 hover:bg-blue-700': !editMode,
                    }">
                        <span v-if="editMode">退出</span>
                        <span v-else>进入</span>
                        更改
                    </Button>
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
                        <TableCell><Textarea @change="writeChanges(task.id, task)" :disabled="!editMode"
                                v-model="task.content" /></TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell class="font-bold">截止日期</TableCell>
                        <TableCell>
                            <Input @change="writeChanges(task.id, task)" :disabled="!editMode" type="datetime-local"
                                v-model="task.deadline" />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell class="font-bold">完成</TableCell>
                        <TableCell class="flex items-center gap-4">
                            <Checkbox @change="writeChanges(task.id, task)" :disabled="!editMode"
                                v-model="task.completed" /> {{ task.completed }}
                        </TableCell>
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
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import type { PropType } from 'vue';
import type { Task } from '~/types/student';

const props = defineProps({
    task: {
        type: Object as PropType<Task>,
        required: true
    }
})

const allowDelete = checkPermission(`/asmre/task/${props.task.id}`, 'delete')
const allowWrite = checkPermission(`/asmre/task/${props.task.id}`, 'write')
const editMode = ref(false)

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

async function writeChanges(taskId: string | undefined, task: Task) {
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

    const resp = await useCustomFetch(`/task/${taskId}`, {
        method: 'PUT',
        body: task
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            icon: 'error',
            title: '更新失败',
            text: resp.data.value || '未知错误',
        })
    } else {
        await Swal.fire({
            icon: 'success',
            title: '更新成功',
            text: '任务已更新',
        })
    }
}
</script>