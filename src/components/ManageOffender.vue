<script setup lang="ts">
import { ref, computed } from 'vue';
import imageicon from './icons/imageicon.vue';
import inforicon from './icons/inforicon.vue';
import nosymboi from './icons/nosymboi.vue';
import yessyboi from './icons/yessyboi.vue';

// Define the payment management interface
interface PaymentManagement {
    id: number;
    orderNumber: string;
    offenderName: string;
    violationCount: number;
    vehicleType: string;
    paymentTime: string;
    paymentDate: string;
    totalAmount: number;
    status: 'pending' | 'approved' | 'rejected' | 'review';
    hasImage: boolean;
}

const paymentData = ref<PaymentManagement[]>([
    {
        id: 1,
        orderNumber: "PAY001",
        offenderName: "ທ້າວ ສົມຊາຍ ວົງສະຫວັນ",
        violationCount: 2,
        vehicleType: "ລົດໃຫຍ່",
        paymentTime: "10:30",
        paymentDate: "2025-01-15",
        totalAmount: 250000,
        status: 'pending',
        hasImage: true
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
        status: 'approved',
        hasImage: true
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
        status: 'review',
        hasImage: false
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
        status: 'rejected',
        hasImage: true
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
        status: 'pending',
        hasImage: true
    },
])

// State management
const activeFilter = ref('all')
const selectedPayment = ref<PaymentManagement | null>(null)
const showImagePopup = ref(false)
const showDetailsPopup = ref(false)

// Computed filters
const filteredPayments = computed(() => {
    if (activeFilter.value === 'all') return paymentData.value
    return paymentData.value.filter(payment => payment.status === activeFilter.value)
})

const pendingCount = computed(() => paymentData.value.filter(p => p.status === 'pending').length)
const approvedCount = computed(() => paymentData.value.filter(p => p.status === 'approved').length)
const rejectedCount = computed(() => paymentData.value.filter(p => p.status === 'rejected').length)
const reviewCount = computed(() => paymentData.value.filter(p => p.status === 'review').length)
const totalCount = computed(() => paymentData.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewImage = (payment: PaymentManagement) => {
    selectedPayment.value = payment
    showImagePopup.value = true
}

const viewDetails = (payment: PaymentManagement) => {
    selectedPayment.value = payment
    showDetailsPopup.value = true
}

const approvePayment = (payment: PaymentManagement) => {
    const index = paymentData.value.findIndex(p => p.id === payment.id)
    if (index !== -1) {
        paymentData.value[index].status = 'approved'
    }
}

const rejectPayment = (payment: PaymentManagement) => {
    const index = paymentData.value.findIndex(p => p.id === payment.id)
    if (index !== -1) {
        paymentData.value[index].status = 'rejected'
    }
}

const closePopups = () => {
    showImagePopup.value = false
    showDetailsPopup.value = false
    selectedPayment.value = null
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        case 'approved': return 'bg-green-100 text-green-800'
        case 'rejected': return 'bg-red-100 text-red-800'
        case 'review': return 'bg-blue-100 text-blue-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'pending': return 'ລໍຖ້າອະນຸມັດ'
        case 'approved': return 'ອະນຸມັດແລ້ວ'
        case 'rejected': return 'ປະຕິເສດ'
        case 'review': return 'ກວດຄືນ'
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
            <h2 class="text-2xl font-bold text-gray-800">ຈັດການການຊໍາລະ</h2>
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
                @click="setFilter('pending')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'pending' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'pending' ? 'text-white' : 'text-black'">ລໍຖ້າອະນຸມັດ ({{ pendingCount }})</span>
            </button>
            <button 
                @click="setFilter('review')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'review' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'review' ? 'text-white' : 'text-black'">ກວດຄືນ ({{ reviewCount }})</span>
            </button>
            <button 
                @click="setFilter('approved')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'approved' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'approved' ? 'text-white' : 'text-black'">ອະນຸມັດແລ້ວ ({{ approvedCount }})</span>
            </button>
            <button 
                @click="setFilter('rejected')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'rejected' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'rejected' ? 'text-white' : 'text-black'">ປະຕິເສດ ({{ rejectedCount }})</span>
            </button>
        </div>

        <!-- Payment Management Cards -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-3 gap-6">
                <div 
                    v-for="payment in filteredPayments" 
                    :key="payment.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <!-- Header -->
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm font-medium text-gray-500">{{ payment.orderNumber }}</span>
                            <span 
                                :class="[
                                    'px-3 py-1 rounded-full text-xs font-medium',
                                    getStatusColor(payment.status)
                                ]">
                                {{ getStatusText(payment.status) }}
                            </span>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ payment.offenderName }}</h3>
                            <div class="space-y-2 text-sm text-gray-600">
                                <div class="flex justify-between">
                                    <span>ຂໍ້ຫາ:</span>
                                    <span>{{ payment.violationCount }} ຄັ້ງ</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>ຍານພາຫະນະ:</span>
                                    <span>{{ payment.vehicleType }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>ເວລາ:</span>
                                    <span>{{ payment.paymentTime }} | {{ payment.paymentDate }}</span>
                                </div>
                                <div class="flex justify-between font-semibold text-blue-600 text-base">
                                    <span>ເງິນລວມ:</span>
                                    <span>{{ formatCurrency(payment.totalAmount) }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-2">
                            <!-- Top Row -->
                            <button 
                                @click="viewImage(payment)"
                                :disabled="!payment.hasImage"
                                class="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <imageicon class="w-4 h-4" />
                                <span class="text-xs">ຮູບ</span>
                            </button>
                            <button 
                                @click="viewDetails(payment)"
                                class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <inforicon class="w-4 h-4" />
                                <span class="text-xs">ລາຍລະອຽດ</span>
                            </button>
                            
                            <!-- Bottom Row - Only show for pending/review status -->
                            <template v-if="payment.status === 'pending' || payment.status === 'review'">
                                <button 
                                    @click="rejectPayment(payment)"
                                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <nosymboi class="w-4 h-4" />
                                    <span class="text-xs">ປະຕິເສດ</span>
                                </button>
                                <button 
                                    @click="approvePayment(payment)"
                                    class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    <yessyboi class="w-4 h-4" />
                                    <span class="text-xs">ອະນຸມັດ</span>
                                </button>
                            </template>
                            <!-- Status message for completed actions -->
                            <template v-else>
                                <div class="col-span-2 text-center py-2 text-sm font-medium"
                                     :class="payment.status === 'approved' ? 'text-green-600' : 'text-red-600'">
                                    {{ payment.status === 'approved' ? '✓ ອະນຸມັດແລ້ວ' : '✗ ປະຕິເສດແລ້ວ' }}
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredPayments.length === 0" class="col-span-3 text-center py-12">
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

        <!-- Image Popup -->
        <div v-if="showImagePopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-neutral-800">ຮູບພາບການຊໍາລະ</h3>
                    <button @click="closePopups" class="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="bg-neutral-50 p-6 rounded-xl">
                    <div class="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-200">
                        <span class="text-neutral-400">ຮູບພາບການຊໍາລະ - {{ selectedPayment?.orderNumber }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Popup -->
        <div v-if="showDetailsPopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-neutral-800">ລາຍລະອຽດການຊໍາລະ</h3>
                    <button @click="closePopups" class="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
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
                            <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະ</label>
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
</template>