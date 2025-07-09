<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the income interface
interface IncomeInfo {
    id: number;
    orderNumber: string;
    offenderName: string;
    violationCount: number;
    vehicleType: string;
    incomeTime: string;
    incomeDate: string;
    totalAmount: number;
    category: 'traffic' | 'parking' | 'speeding' | 'other';
}

const incomeInfo = ref<IncomeInfo[]>([
    {
        id: 1,
        orderNumber: "INC001",
        offenderName: "ທ້າວ ສົມຊາຍ ວົງສະຫວັນ",
        violationCount: 1,
        vehicleType: "ລົດໃຫຍ່",
        incomeTime: "08:30",
        incomeDate: "2025-01-15",
        totalAmount: 250000,
        category: 'traffic'
    },
    {
        id: 2,
        orderNumber: "INC002",
        offenderName: "ນາງ ມາລີ ຈັນທະວົງ",
        violationCount: 2,
        vehicleType: "ລົດກະບະ",
        incomeTime: "14:20",
        incomeDate: "2025-01-14",
        totalAmount: 180000,
        category: 'parking'
    },
    {
        id: 3,
        orderNumber: "INC003",
        offenderName: "ທ້າວ ບຸນມີ ຄຳພູ",
        violationCount: 1,
        vehicleType: "ລົດມໍເຕີໄຊ",
        incomeTime: "16:45",
        incomeDate: "2025-01-13",
        totalAmount: 120000,
        category: 'speeding'
    },
    {
        id: 4,
        orderNumber: "INC004",
        offenderName: "ນາງ ວັນທອງ ຄຳພູ",
        violationCount: 3,
        vehicleType: "ລົດໃຫຍ່",
        incomeTime: "11:10",
        incomeDate: "2025-01-12",
        totalAmount: 300000,
        category: 'traffic'
    },
    {
        id: 5,
        orderNumber: "INC005",
        offenderName: "ທ້າວ ອານຸພາບ ມະນີວົງ",
        violationCount: 2,
        vehicleType: "ລົດກະບະ",
        incomeTime: "13:25",
        incomeDate: "2025-01-11",
        totalAmount: 200000,
        category: 'other'
    },
])

// Filter state
const activeFilter = ref('all')
const selectedIncome = ref<IncomeInfo | null>(null)
const showDetails = ref(false)

// Computed filters
const filteredIncomes = computed(() => {
    if (activeFilter.value === 'all') return incomeInfo.value
    return incomeInfo.value.filter(income => income.category === activeFilter.value)
})

const trafficCount = computed(() => incomeInfo.value.filter(i => i.category === 'traffic').length)
const parkingCount = computed(() => incomeInfo.value.filter(i => i.category === 'parking').length)
const speedingCount = computed(() => incomeInfo.value.filter(i => i.category === 'speeding').length)
const otherCount = computed(() => incomeInfo.value.filter(i => i.category === 'other').length)
const totalCount = computed(() => incomeInfo.value.length)
const totalIncome = computed(() => incomeInfo.value.reduce((sum, income) => sum + income.totalAmount, 0))

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (income: IncomeInfo) => {
    selectedIncome.value = income
    showDetails.value = true
}

const closeDetails = () => {
    showDetails.value = false
    selectedIncome.value = null
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'traffic': return 'bg-blue-100 text-blue-800'
        case 'parking': return 'bg-purple-100 text-purple-800'
        case 'speeding': return 'bg-red-100 text-red-800'
        case 'other': return 'bg-gray-100 text-gray-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getCategoryText = (category: string) => {
    switch (category) {
        case 'traffic': return 'ການຈະລາຈອນ'
        case 'parking': return 'ຈອດລົດ'
        case 'speeding': return 'ຂັບໄວ'
        case 'other': return 'ອື່ນໆ'
        default: return category
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
            <h2 class="text-2xl font-bold text-gray-800">ລາຍງານຂໍ້ມູນລາຍຮັບ</h2>
            <p class="text-lg text-green-600 font-semibold mt-2">ລາຍຮັບລວມ: {{ formatCurrency(totalIncome) }}</p>
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
                @click="setFilter('traffic')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'traffic' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'traffic' ? 'text-white' : 'text-black'">ການຈະລາຈອນ ({{ trafficCount }})</span>
            </button>
            <button 
                @click="setFilter('parking')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'parking' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'parking' ? 'text-white' : 'text-black'">ຈອດລົດ ({{ parkingCount }})</span>
            </button>
            <button 
                @click="setFilter('speeding')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'speeding' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'speeding' ? 'text-white' : 'text-black'">ຂັບໄວ ({{ speedingCount }})</span>
            </button>
            <button 
                @click="setFilter('other')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'other' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'other' ? 'text-white' : 'text-black'">ອື່ນໆ ({{ otherCount }})</span>
            </button>
        </div>

        <!-- Income Records List -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-4 gap-4">
                <div 
                    v-for="income in filteredIncomes" 
                    :key="income.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-medium text-gray-500">{{ income.orderNumber }}</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        getCategoryColor(income.category)
                                    ]">
                                    {{ getCategoryText(income.category) }}
                                </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ income.offenderName }}</h3>
                            <div class="space-y-1 text-sm text-gray-600 mb-3">
                                <div>ຂໍ້ຫາ: {{ income.violationCount }} ຄັ້ງ</div>
                                <div>ຍານພາຫະນະ: {{ income.vehicleType }}</div>
                                <div class="flex items-center gap-4">
                                    <span>ເວລາ: {{ income.incomeTime }}</span>
                                    <span>ວັນທີ: {{ income.incomeDate }}</span>
                                </div>
                                <div class="font-semibold text-green-600">{{ formatCurrency(income.totalAmount) }}</div>
                            </div>
                        </div>
                        <div class="mt-auto">
                            <button 
                                @click="viewDetails(income)"
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                ເບິ່ງລາຍລະອຽດ
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredIncomes.length === 0" class="col-span-4 text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນລາຍຮັບໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetails" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-xl font-bold text-gray-800">ລາຍລະອຽດລາຍຮັບ</h3>
                        <button 
                            @click="closeDetails"
                            class="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div v-if="selectedIncome" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເລກໃບສັ່ງ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.orderNumber }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ຜູ້ຊໍາລະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.offenderName }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ຈໍານວນຂໍ້ຫາ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.violationCount }} ຄັ້ງ</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດພາຫະນະ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.vehicleType }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ໝວດຫມູ່ການລະເມີດ</label>
                                <div class="flex items-center gap-2">
                                    <span 
                                        :class="[
                                            'px-3 py-1 rounded-full text-sm font-medium',
                                            getCategoryColor(selectedIncome.category)
                                        ]">
                                        {{ getCategoryText(selectedIncome.category) }}
                                    </span>
                                </div>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາລາຍຮັບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.incomeTime }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ລາຍຮັບ</label>
                                <p class="text-lg font-semibold text-gray-900">{{ selectedIncome.incomeDate }}</p>
                            </div>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <label class="block text-sm font-medium text-gray-700 mb-1">ເງິນລວມ</label>
                                <p class="text-lg font-semibold text-green-600">{{ formatCurrency(selectedIncome.totalAmount) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>