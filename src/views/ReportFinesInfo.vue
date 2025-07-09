<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the fines interface
interface FineInfo {
    id: number;
    orderNumber: string;
    offenderName: string;
    issuingOfficer: string;
    violationCount: number;
    category: string;
    article: string;
    vehicleType: string;
    fineTime: string;
    fineDate: string;
    totalAmount: number;
    status: 'issued' | 'paid' | 'overdue' | 'cancelled';
}

const fineInfo = ref<FineInfo[]>([
    {
        id: 1,
        orderNumber: "F001",
        offenderName: "ທ້າວ ສົມຊາຍ ວົງສະຫວັນ",
        issuingOfficer: "ສວ.ບຸນມີ ຄຳພູ",
        violationCount: 1,
        category: "ໝວດ 5",
        article: "ມາດຕາ 42",
        vehicleType: "ລົດໃຫຍ່",
        fineTime: "08:45",
        fineDate: "2025-01-15",
        totalAmount: 250000,
        status: 'issued'
    },
    {
        id: 2,
        orderNumber: "F002",
        offenderName: "ນາງ ມາລີ ຈັນທະວົງ",
        issuingOfficer: "ສວ.ວັນນີ ສີໄຟ",
        violationCount: 2,
        category: "ໝວດ 3",
        article: "ມາດຕາ 28",
        vehicleType: "ລົດກະບະ",
        fineTime: "14:30",
        fineDate: "2025-01-14",
        totalAmount: 180000,
        status: 'paid'
    },
    {
        id: 3,
        orderNumber: "F003",
        offenderName: "ທ້າວ ບຸນມີ ຄຳພູ",
        issuingOfficer: "ສວ.ສຸດາ ພົມມະວົງ",
        violationCount: 1,
        category: "ໝວດ 7",
        article: "ມາດຕາ 65",
        vehicleType: "ລົດມໍເຕີໄຊ",
        fineTime: "16:20",
        fineDate: "2025-01-13",
        totalAmount: 120000,
        status: 'overdue'
    },
    {
        id: 4,
        orderNumber: "F004",
        offenderName: "ນາງ ວັນທອງ ຄຳພູ",
        issuingOfficer: "ສວ.ອານຸພາບ ມະນີວົງ",
        violationCount: 3,
        category: "ໝວດ 4",
        article: "ມາດຕາ 35",
        vehicleType: "ລົດໃຫຍ່",
        fineTime: "11:15",
        fineDate: "2025-01-12",
        totalAmount: 300000,
        status: 'paid'
    },
    {
        id: 5,
        orderNumber: "F005",
        offenderName: "ທ້າວ ພູຄຳ ສີວິໄລ",
        issuingOfficer: "ສວ.ບຸນທຽນ ວົງສະຫວັດ",
        violationCount: 2,
        category: "ໝວດ 6",
        article: "ມາດຕາ 58",
        vehicleType: "ລົດກະບະ",
        fineTime: "13:40",
        fineDate: "2025-01-11",
        totalAmount: 200000,
        status: 'cancelled'
    },
])

// Filter state
const activeFilter = ref('all')
const selectedFine = ref<FineInfo | null>(null)
const showDetails = ref(false)

// Computed filters
const filteredFines = computed(() => {
    if (activeFilter.value === 'all') return fineInfo.value
    return fineInfo.value.filter(fine => fine.status === activeFilter.value)
})

const issuedCount = computed(() => fineInfo.value.filter(f => f.status === 'issued').length)
const paidCount = computed(() => fineInfo.value.filter(f => f.status === 'paid').length)
const overdueCount = computed(() => fineInfo.value.filter(f => f.status === 'overdue').length)
const cancelledCount = computed(() => fineInfo.value.filter(f => f.status === 'cancelled').length)
const totalCount = computed(() => fineInfo.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (fine: FineInfo) => {
    selectedFine.value = fine
    showDetails.value = true
}

const closeDetails = () => {
    showDetails.value = false
    selectedFine.value = null
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'issued': return 'bg-blue-100 text-blue-800'
        case 'paid': return 'bg-green-100 text-green-800'
        case 'overdue': return 'bg-red-100 text-red-800'
        case 'cancelled': return 'bg-gray-100 text-gray-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'issued': return 'ປັບໄໝແລ້ວ'
        case 'paid': return 'ຊໍາລະແລ້ວ'
        case 'overdue': return 'ໝົດກຳນົດ'
        case 'cancelled': return 'ຍົກເລີກ'
        default: return status
    }
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lo-LA').format(amount) + ' ກີບ'
}
</script>

<template>
    <div>
        <!-- Title -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">ລາຍງານຂໍ້ມູນການປັບໄໝ</h2>
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
                @click="setFilter('issued')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'issued' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'issued' ? 'text-white' : 'text-black'">ປັບໄໝແລ້ວ ({{ issuedCount }})</span>
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
                @click="setFilter('overdue')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'overdue' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'overdue' ? 'text-white' : 'text-black'">ໝົດກຳນົດ ({{ overdueCount }})</span>
            </button>
            <button 
                @click="setFilter('cancelled')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'cancelled' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'cancelled' ? 'text-white' : 'text-black'">ຍົກເລີກ ({{ cancelledCount }})</span>
            </button>
        </div>

        <!-- Fine Records List -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-4 gap-4">
                <div 
                    v-for="fine in filteredFines" 
                    :key="fine.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500">{{ fine.orderNumber }}</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        getStatusColor(fine.status)
                                    ]">
                                    {{ getStatusText(fine.status) }}
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ fine.offenderName }}</h3>
                            <div class="space-y-1 text-sm text-gray-600 mb-3">
                                <div>ເຈົ້າໜ້າທີ່: {{ fine.issuingOfficer }}</div>
                                <div>ຂໍ້ຫາ: {{ fine.violationCount }} ຄັ້ງ</div>
                                <div>{{ fine.category }} {{ fine.article }}</div>
                                <div>ຍານພາຫະນະ: {{ fine.vehicleType }}</div>
                                <div class="flex items-center gap-4">
                                    <span>ເວລາ: {{ fine.fineTime }}</span>
                                    <span>ວັນທີ: {{ fine.fineDate }}</span>
                                </div>
                                <div class="font-semibold text-orange-600">{{ formatCurrency(fine.totalAmount) }}</div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <button 
                                @click="viewDetails(fine)"
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                ເບິ່ງລາຍລະອຽດ
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredFines.length === 0" class="col-span-4 text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນການປັບໄໝໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">ລາຍລະອຽດການປັບໄໝ</h3>
                        <button 
                            @click="closeDetails"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div v-if="selectedFine" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກໃບສັ່ງ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.orderNumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ຜູ້ລະເມີດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.offenderName }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເຈົ້າໜ້າທີ່ປັບໄໝ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.issuingOfficer }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຈໍານວນຂໍ້ຫາ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.violationCount }} ຄັ້ງ</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ໝວດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.category }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ມາດຕາ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.article }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດພາຫະນະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.vehicleType }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະ</label>
                                <div class="flex items-center gap-2">
                                    <span 
                                        :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            getStatusColor(selectedFine.status)
                                        ]">
                                        {{ getStatusText(selectedFine.status) }}
                                    </span>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາປັບໄໝ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.fineTime }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ປັບໄໝ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedFine.fineDate }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເງິນປັບລວມ</label>
                                <p class="text-xl font-bold text-orange-600">{{ formatCurrency(selectedFine.totalAmount) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>