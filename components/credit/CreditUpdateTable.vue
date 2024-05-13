<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>操作 ID</TableHead>
                <TableHead>操作对象</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>分数</TableHead>
                <TableHead>
                    创建时间
                    <UTCTimeTip />
                </TableHead>
                <TableHead>
                    修改时间
                    <UTCTimeTip />
                </TableHead>
                <TableHead>理由</TableHead>
                <TableHead>动作</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <!-- 数据展示 -->
            <TableRow v-for="item in creditUpdates">
                <TableCell>{{ item.id }}</TableCell>
                <TableCell>学生：{{ item.student.name }}</TableCell>
                <TableCell>{{ { 'add': '增加', 'reduce': '扣除' }[item.type] }}</TableCell>
                <TableCell>{{ item.number }}</TableCell>
                <TableCell>{{ new Date(item.create_time).toLocaleString() }}</TableCell>
                <TableCell>{{ new Date(item.update_time).toLocaleString() }}</TableCell>
                <TableCell>{{ item.reason }}</TableCell>
                <TableCell class="flex gap-2">
                    <NuxtLink v-if="allowUpdate" :to="`/credit/${item.student.name}/${item.id}`">
                        <Button class="bg-blue-500 hover:bg-blue-700">修改</Button>
                    </NuxtLink>

                    <Button v-if="allowDelete" @click="deleteItem(item.id || 'undefined')"
                        class="bg-red-500 hover:bg-red-700">删除</Button>
                </TableCell>
            </TableRow>

            <!-- 新增 -->
            <TableRow v-if="allowCreate">
                <TableCell>
                    <Input disabled value="系统自动生成" />
                </TableCell>

                <TableCell>
                    <Select v-model="updateObj">
                        <SelectTrigger>
                            <SelectValue placeholder="选择操作对象" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>学生操作对象</SelectLabel>
                                <SelectItem v-for="stu in allowOprationStudents" :value="stu.name">学生：{{ stu.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </TableCell>

                <TableCell>
                    <Select v-model="newCreditUpdate.type">
                        <SelectTrigger>
                            <SelectValue placeholder="选择操作类型" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="add">增加</SelectItem>
                                <SelectItem value="reduce">减少</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </TableCell>

                <TableCell>
                    <Input v-model="newCreditUpdate.number" type="number" />
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Textarea v-model="newCreditUpdate.reason" />
                </TableCell>

                <TableCell>
                    <Button @click="create">提交</Button>
                </TableCell>
            </TableRow>
        </TableBody>

        <TableFooter>
            <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>总分</TableCell>
                <TableCell>
                    <CreditText :credit="credit" />
                </TableCell>
            </TableRow>
        </TableFooter>
    </Table>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
import type { ModelRef, PropType } from 'vue';
import type { CreditUpdate } from '~/types/credit';
import type { Student } from '~/types/student';
import { checkPermission } from '~/utils/permission';
import TableFooter from '../ui/table/TableFooter.vue';

const creditUpdates = defineModel('creditUpdates') as ModelRef<CreditUpdate[]>
const credit = defineModel('credit') as ModelRef<number>
const updateObj = ref('')
const newCreditUpdate = ref({
    type: 'add',
    number: 0
}) as Ref<CreditUpdate>


const props = defineProps({
    allowCreate: {
        type: Boolean,
        default: false
    },
    allowDelete: {
        type: Boolean,
        default: false
    },
    allowUpdate: {
        type: Boolean,
        default: false
    },
    allowOprationStudents: {
        type: Object as PropType<Student[]>,
        default: []
    }
})

async function create() {
    const student = props.allowOprationStudents.find(x => x.name == updateObj.value)
    if (student == undefined) {
        Swal.fire({
            title: '找不到操作对象',
            text: '请设置操作对象',
            icon: 'error'
        })
        return
    }

    newCreditUpdate.value.student = student
    newCreditUpdate.value.create_time = new Date().toISOString()
    newCreditUpdate.value.update_time = new Date().toISOString()

    // 验证权限
    if (!checkPermission(`/asmre/credit/${newCreditUpdate.value.student.name}`, 'create').value) {
        Swal.fire({
            title: '没有权限',
            icon: 'error'
        })
    }

    const resp = await useFetch(`/api/credit/`, {
        method: 'POST',
        body: newCreditUpdate
    })

    if (resp.status.value == 'error') {
        Swal.fire({
            title: '无法提交',
            text: (resp.data.value as any).detail
        })
        return
    }

    await Swal.fire({
        title: '成功',
        icon: 'success'
    })

    useRouter().go(0)
}

async function deleteItem(updateId: string) {
    const resp = await useFetch(`/api/credit/${updateId}`, {
        method: 'DELETE',
        body: {}
    })

    if (resp.status.value != 'success') {
        Swal.fire({
            title: '无法删除',
            text: (resp.data.value as any).detail,
            icon: 'error'
        })
        return
    }

    await Swal.fire({
        title: '成功',
        icon: 'success'
    })

    useRouter().go(0)
}
</script>