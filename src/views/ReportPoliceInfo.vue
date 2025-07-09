<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PoliceInfo } from '../data/policeTypes'

const policeinfo = ref<PoliceInfo[]>([
    {
        id: 1,
        number: 1,
        name: "ທ້າວ ສົມຊາຍ ວົງສະຫວັນ",
        phonenumber: "020-55667788",
        cardnumber: "P001234",
        time: "08:15",
        date: "2025-01-15",
        status: 'online'
    },
    {
        id: 2,
        number: 2,
        name: "ນາງ ສຸດາ ພົມມະວົງ",
        phonenumber: "020-99887766",
        cardnumber: "P005678",
        time: "14:30",
        date: "2025-01-15",
        status: 'online'
    },
    {
        id: 3,
        number: 3,
        name: "ທ້າວ ບຸນມີ ຄຳພູ",
        phonenumber: "020-44556677",
        cardnumber: "P009012",
        time: "09:45",
        date: "2025-01-14",
        status: 'offline'
    },
    {
        id: 4,
        number: 4,
        name: "ນາງ ວັນນີ ສີໄຟ",
        phonenumber: "020-11223344",
        cardnumber: "P003456",
        time: "16:20",
        date: "2025-01-14",
        status: 'online'
    },
    {
        id: 5,
        number: 5,
        name: "ທ້າວ ອານຸພາບ ມະນີວົງ",
        phonenumber: "020-77889900",
        cardnumber: "P007890",
        time: "11:10",
        date: "2025-01-13",
        status: 'offline'
    },
])

// Filter state
const activeFilter = ref('all')
const selectedPolice = ref<PoliceInfo | null>(null)
const showDetails = ref(false)

// Computed filters
const filteredPolice = computed(() => {
    if (activeFilter.value === 'all') return policeinfo.value
    return policeinfo.value.filter(police => police.status === activeFilter.value)
})

const onlineCount = computed(() => policeinfo.value.filter(p => p.status === 'online').length)
const offlineCount = computed(() => policeinfo.value.filter(p => p.status === 'offline').length)
const totalCount = computed(() => policeinfo.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (police: PoliceInfo) => {
    selectedPolice.value = police
    showDetails.value = true
}

const closeDetails = () => {
    showDetails.value = false
    selectedPolice.value = null
}
</script>

<template>
    <div>
        <!-- Title -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">ລາຍງານຂໍ້ມູນຕໍາຫຼວດ</h2>
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-2 mb-8">
            <button 
                @click="setFilter('all')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'all' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'all' ? 'text-white' : 'text-black'">ທັງໝົດ({{ totalCount }})</span>
            </button>
            <button 
                @click="setFilter('online')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'online' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'online' ? 'text-white' : 'text-black'">ອອນລາຍ ({{ onlineCount }})</span>
            </button>
            <button 
                @click="setFilter('offline')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'offline' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'offline' ? 'text-white' : 'text-black'">ອອຟລາຍ ({{ offlineCount }})</span>
            </button>
        </div>

        <!-- Police Records List -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-4 gap-4">
                <div 
                    v-for="police in filteredPolice" 
                    :key="police.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <div class="flex items-center gap-4 mb-2">
                                <span class="text-sm font-medium text-gray-500">ລະຫັດ: {{ police.cardnumber }}</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        police.status === 'online' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    ]">
                                    {{ police.status === 'online' ? 'ອອນລາຍ' : 'ອອຟລາຍ' }}
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ police.name }}</h3>
                            <div class="space-y-1 text-sm text-gray-600 mb-3">
                                <div>ໂທ: {{ police.phonenumber }}</div>
                                <div>ເວລາ: {{ police.time }}</div>
                                <div>ວັນທີ: {{ police.date }}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button 
                                @click="viewDetails(police)"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                <span class="text-white">ເບິ່ງລາຍລະອຽດ</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredPolice.length === 0" class="text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນຕໍາຫຼວດໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">ລາຍລະອຽດເຈົ້າໜ້າທີ່ຕໍາຫຼວດ</h3>
                        <button 
                            @click="closeDetails"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div v-if="selectedPolice" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ ແລະ ນາມສະກຸນ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.name }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກລະຫັດບັດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.cardnumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເບີໂທລະສັບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.phonenumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະ</label>
                                <div class="flex items-center gap-2">
                                    <span 
                                        :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            selectedPolice.status === 'online' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        ]">
                                        {{ selectedPolice.status === 'online' ? 'ອອນລາຍ' : 'ອອຟລາຍ' }}
                                    </span>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາເຂົ້າລະບົບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.time }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ເຂົ້າລະບົບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>