<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the payment interface
interface PaymentInfo {
    id: number;
    orderNumber: string;
    offenderName: string;
    violationCount: number;
    vehicleType: string;
    paymentTime: string;
    paymentDate: string;
    totalAmount: number;
    status: 'completed' | 'failed' | 'pending';
}

const paymentInfo = ref<PaymentInfo[]>([
    {
        id: 1,
        orderNumber: "PAY001",
        offenderName: "ທ້າວ ສົມຊາຍ ວົງສະຫວັນ",
        violationCount: 2,
        vehicleType: "ລົດໃຫຍ່",
        paymentTime: "10:30",
        paymentDate: "2025-01-15",
        totalAmount: 250000,
        status: 'completed'
    },
    {
        id: 2,
        orderNumber: "PAY002",
        offenderName: "ນາງ ມາລີ ຈັນທະວົງ",
        violationCount: 1,
        vehicleType: "ລົດກະບະ",
        paymentTime: "14:45",
        paymentDate: "2025-01-14",
        totalAmount: 150000,
        status: 'completed'
    },
    {
        id: 3,
        orderNumber: "PAY003",
        offenderName: "ທ້າວ ບຸນມີ ຄຳພູ",
        violationCount: 3,
        vehicleType: "ລົດມໍເຕີໄຊ",
        paymentTime: "09:20",
        paymentDate: "2025-01-13",
        totalAmount: 180000,
        status: 'failed'
    },
    {
        id: 4,
        orderNumber: "PAY004",
        offenderName: "ນາງ ວັນທອງ ຄຳພູ",
        violationCount: 1,
        vehicleType: "ລົດໃຫຍ່",
        paymentTime: "16:15",
        paymentDate: "2025-01-12",
        totalAmount: 200000,
        status: 'pending'
    },
    {
        id: 5,
        orderNumber: "PAY005",
        offenderName: "ທ້າວ ອານຸພາບ ມະນີວົງ",
        violationCount: 2,
        vehicleType: "ລົດກະບະ",
        paymentTime: "11:40",
        paymentDate: "2025-01-11",
        totalAmount: 300000,
        status: 'completed'
    },
])

// Filter state
const activeFilter = ref('all')
const selectedPayment = ref<PaymentInfo | null>(null)
const showDetails = ref(false)

// Computed filters
const filteredPayments = computed(() => {
    if (activeFilter.value === 'all') return paymentInfo.value
    return paymentInfo.value.filter(payment => payment.status === activeFilter.value)
})

const completedCount = computed(() => paymentInfo.value.filter(p => p.status === 'completed').length)
const failedCount = computed(() => paymentInfo.value.filter(p => p.status === 'failed').length)
const pendingCount = computed(() => paymentInfo.value.filter(p => p.status === 'pending').length)
const totalCount = computed(() => paymentInfo.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (payment: PaymentInfo) => {
    selectedPayment.value = payment
    showDetails.value = true
}

const closeDetails = () => {
    showDetails.value = false
    selectedPayment.value = null
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed': return 'bg-green-100 text-green-800'
        case 'failed': return 'bg-red-100 text-red-800'
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'completed': return 'ສຳເລັດ'
        case 'failed': return 'ບໍ່ສຳເລັດ'
        case 'pending': return 'ລໍຖ້າ'
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
            <h2 class="text-2xl font-bold text-gray-800">ລາຍງານຂໍ້ມູນການຊໍາລະ</h2>
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
                @click="setFilter('completed')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'completed' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'completed' ? 'text-white' : 'text-black'">ສຳເລັດ ({{ completedCount }})</span>
            </button>
            <button 
                @click="setFilter('failed')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'failed' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'failed' ? 'text-white' : 'text-black'">ບໍ່ສຳເລັດ ({{ failedCount }})</span>
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

        <!-- Payment Records List -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-4 gap-4">
                <div 
                    v-for="payment in filteredPayments" 
                    :key="payment.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500">{{ payment.orderNumber }}</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        getStatusColor(payment.status)
                                    ]">
                                    {{ getStatusText(payment.status) }}
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ payment.offenderName }}</h3>
                            <div class="space-y-1 text-sm text-gray-600 mb-3">
                                <div>ຂໍ້ຫາ: {{ payment.violationCount }} ຄັ້ງ</div>
                                <div>ຍານພາຫະນະ: {{ payment.vehicleType }}</div>
                                <div class="flex items-center gap-4">
                                    <span>ເວລາ: {{ payment.paymentTime }}</span>
                                    <span>ວັນທີ: {{ payment.paymentDate }}</span>
                                </div>
                                <div class="font-semibold text-blue-600">{{ formatCurrency(payment.totalAmount) }}</div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <button 
                                @click="viewDetails(payment)"
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                ເບິ່ງລາຍລະອຽດ
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredPayments.length === 0" class="col-span-4 text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນການຊໍາລະໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">ລາຍລະອຽດການຊໍາລະ</h3>
                        <button 
                            @click="closeDetails"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div v-if="selectedPayment" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກໃບສັ່ງ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.orderNumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ຜູ້ລະເມີດ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.offenderName }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຈໍານວນຂໍ້ຫາ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.violationCount }} ຄັ້ງ</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດພາຫະນະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.vehicleType }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະການຊໍາລະ</label>
                                <div class="flex items-center gap-2">
                                    <span 
                                        :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            getStatusColor(selectedPayment.status)
                                        ]">
                                        {{ getStatusText(selectedPayment.status) }}
                                    </span>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາຊໍາລະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.paymentTime }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ຊໍາລະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedPayment.paymentDate }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເງິນລວມ</label>
                                <p class="text-lg font-semibold text-blue-600">{{ formatCurrency(selectedPayment.totalAmount) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>