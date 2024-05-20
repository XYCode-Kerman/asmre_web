<template>
    <div class="grid grid-cols-4 gap-4">
        <!-- 已有 -->
        <Card v-for="task in tasks" class="shadow-md rounded-lg border-none col-span-2">
            <CardHeader>
                <CardTitle>任务 {{ task.id?.substring(0, 6) }}...</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
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

                        <TableRow>
                            <TableCell class="font-bold">完成时动作</TableCell>
                            <TableCell class="grid grid-cols-4 gap-4">
                                <StudentTaskAction v-for="action in task.actions_when_completed" :action="action"
                                    :key="action.id" />
                            </TableCell>
                        </TableRow>

                        <TableRow>
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
</script>

<style scoped>
td {
    @apply py-3 px-2;
}
</style>