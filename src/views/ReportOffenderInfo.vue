<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the offender interface
interface OffenderInfo {
    id: number;
    number: number;
    name: string;
    phonenumber: string;
    cardnumber1: string; // ລະຫັດ ຂສ
    cardnumber2: string; // ລະຫັດ ນວ
    time: string;
    date: string;
    status: 'paid' | 'unpaid' | 'pending';
}

const offenderInfo = ref<OffenderInfo[]>([
    {
        id: 1,
        number: 1,
        name: "ທ້າວ ພູຄຳ ສີວິໄລ",
        phonenumber: "020-12345678",
        cardnumber1: "KS001234",
        cardnumber2: "NV567890",
        time: "09:15",
        date: "2025-01-15",
        status: 'unpaid'
    },
    {
        id: 2,
        number: 2,
        name: "ນາງ ມາລີ ຈັນທະວົງ",
        phonenumber: "020-87654321",
        cardnumber1: "KS002345",
        cardnumber2: "NV678901",
        time: "14:30",
        date: "2025-01-14",
        status: 'paid'
    },
    {
        id: 3,
        number: 3,
        name: "ທ້າວ ສົມໃຈ ບຸນມາ",
        phonenumber: "020-11223344",
        cardnumber1: "KS003456",
        cardnumber2: "NV789012",
        time: "16:45",
        date: "2025-01-13",
        status: 'pending'
    },
    {
        id: 4,
        number: 4,
        name: "ນາງ ວັນທອງ ຄຳພູ",
        phonenumber: "020-55667788",
        cardnumber1: "KS004567",
        cardnumber2: "NV890123",
        time: "11:20",
        date: "2025-01-12",
        status: 'paid'
    },
    {
        id: 5,
        number: 5,
        name: "ທ້າວ ບຸນທຽນ ວົງສະຫວັດ",
        phonenumber: "020-99887766",
        cardnumber1: "KS005678",
        cardnumber2: "NV901234",
        time: "13:05",
        date: "2025-01-11",
        status: 'unpaid'
    },
])

// Filter state
const activeFilter = ref('all')
const selectedOffender = ref<OffenderInfo | null>(null)
const showDetails = ref(false)

// Computed filters
const filteredOffenders = computed(() => {
    if (activeFilter.value === 'all') return offenderInfo.value
    return offenderInfo.value.filter(offender => offender.status === activeFilter.value)
})

const paidCount = computed(() => offenderInfo.value.filter(o => o.status === 'paid').length)
const unpaidCount = computed(() => offenderInfo.value.filter(o => o.status === 'unpaid').length)
const pendingCount = computed(() => offenderInfo.value.filter(o => o.status === 'pending').length)
const totalCount = computed(() => offenderInfo.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (offender: OffenderInfo) => {
    selectedOffender.value = offender
    showDetails.value = true
}

const closeDetails = () => {
    showDetails.value = false
    selectedOffender.value = null
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'paid': return 'bg-green-100 text-green-800'
        case 'unpaid': return 'bg-red-100 text-red-800'
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'paid': return 'ຊໍາລະແລ້ວ'
        case 'unpaid': return 'ຍັງບໍ່ຊໍາລະ'
        case 'pending': return 'ລໍຖ້າ'
        default: return status
    }
}
</script>

<template>
    <div>
        <!-- Title -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">ລາຍງານຂໍ້ມູນຜູ້ລະເມີດ</h2>
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
                @click="setFilter('paid')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'paid' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'paid' ? 'text-white' : 'text-black'">ຊໍາລະແລ້ວ ({{ paidCount }})</span>
            </button>
            <button 
                @click="setFilter('unpaid')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'unpaid' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'unpaid' ? 'text-white' : 'text-black'">ຍັງບໍ່ຊໍາລະ ({{ unpaidCount }})</span>
            </button>
            <button 
                @click="setFilter('pending')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'pending' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'pending' ? 'text-white' : 'text-black'">ລໍຖ້າ ({{ pendingCount }})</span>
            </button>
        </div>

        <!-- Offender Records List -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-4 gap-4">
                <div 
                    v-for="offender in filteredOffenders" 
                    :key="offender.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500">ລໍາດັບ: {{ offender.number }}</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        getStatusColor(offender.status)
                                    ]">
                                    {{ getStatusText(offender.status) }}
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ offender.name }}</h3>
                            <div class="space-y-1 text-sm text-gray-600 mb-3">
                                <div>ໂທ: {{ offender.phonenumber }}</div>
                                <div>ຂສ: {{ offender.cardnumber1 }}</div>
                                <div>ນວ: {{ offender.cardnumber2 }}</div>
                                <div class="flex items-center gap-4">
                                    <span>ເວລາ: {{ offender.time }}</span>
                                    <span>ວັນທີ: {{ offender.date }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <button 
                                @click="viewDetails(offender)"
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                ເບິ່ງລາຍລະອຽດ
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredOffenders.length === 0" class="col-span-4 text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນຜູ້ລະເມີດໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">ລາຍລະອຽດຜູ້ລະເມີດ</h3>
                        <button 
                            @click="closeDetails"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div v-if="selectedOffender" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ ແລະ ນາມສະກຸນ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.name }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເບີໂທລະສັບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.phonenumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກລະຫັດບັດ ຂສ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.cardnumber1 }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກລະຫັດບັດ ນວ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.cardnumber2 }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະການຊໍາລະ</label>
                                <div class="flex items-center gap-2">
                                    <span 
                                        :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            getStatusColor(selectedOffender.status)
                                        ]">
                                        {{ getStatusText(selectedOffender.status) }}
                                    </span>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາລະເມີດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.time }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ລະເມີດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedOffender.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>