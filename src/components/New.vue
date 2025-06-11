<script setup lang="ts">
import type { TableColumnsType } from 'ant-design-vue';

const columns: TableColumnsType = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

interface DataItem {
  key: number;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
</script>

<template>
    <div>
        <div class="flex gap-4 items-center pt-3 h-230 mb-6">
            <div class="flex bg-amber-50 p-4 text-9xl h-full w-300 rounded-2xl text-gray-700 items-center justify-center">ຂ່າວສານ1</div>
            <div class="flex bg-amber-50 p-4 text-9xl h-full w-full rounded-2xl text-gray-700 items-center justify-center">ຂ່າວສານ2</div>
        </div>
        
        <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'operation'">
                    <a>action</a>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped></style>
