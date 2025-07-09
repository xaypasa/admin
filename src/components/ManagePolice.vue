<script setup lang="ts">
import { ref, computed } from 'vue'

// Define the police management interface
interface PoliceManagement {
    id: number;
    number: number;
    name: string;
    phoneNumber: string;
    cardNumber: string;
    registrationTime: string;
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    department: string;
    rank: string;
}

const policeData = ref<PoliceManagement[]>([
    {
        id: 1,
        number: 1,
        name: "ທ້າວ ບຸນມີ ຄຳພູ",
        phoneNumber: "020-55667788",
        cardNumber: "P001234",
        registrationTime: "08:15",
        registrationDate: "2025-01-15",
        status: 'pending',
        department: "ຈະລາຈອນນະຄອນຫຼວງ",
        rank: "ສວ."
    },
    {
        id: 2,
        number: 2,
        name: "ນາງ ສຸດາ ພົມມະວົງ",
        phoneNumber: "020-99887766",
        cardNumber: "P005678",
        registrationTime: "14:30",
        registrationDate: "2025-01-14",
        status: 'approved',
        department: "ຈະລາຈອນຊົນນະບົດ",
        rank: "ຮສວ."
    },
    {
        id: 3,
        number: 3,
        name: "ທ້າວ ສົມໃຈ ບຸນມາ",
        phoneNumber: "020-44556677",
        cardNumber: "P009012",
        registrationTime: "09:45",
        registrationDate: "2025-01-13",
        status: 'rejected',
        department: "ຈະລາຈອນນະຄອນຫຼວງ",
        rank: "ສວ."
    },
    {
        id: 4,
        number: 4,
        name: "ນາງ ວັນນີ ສີໄຟ",
        phoneNumber: "020-11223344",
        cardNumber: "P003456",
        registrationTime: "16:20",
        registrationDate: "2025-01-12",
        status: 'approved',
        department: "ຈະລາຈອນແຂວງ",
        rank: "ສວ."
    },
    {
        id: 5,
        number: 5,
        name: "ທ້າວ ອານຸພາບ ມະນີວົງ",
        phoneNumber: "020-77889900",
        cardNumber: "P007890",
        registrationTime: "11:10",
        registrationDate: "2025-01-11",
        status: 'suspended',
        department: "ຈະລາຈອນຊົນນະບົດ",
        rank: "ຮສວ."
    },
])

// State management
const activeFilter = ref('all')
const selectedPolice = ref<PoliceManagement | null>(null)
const showDetailsPopup = ref(false)

// Computed filters
const filteredPolice = computed(() => {
    if (activeFilter.value === 'all') return policeData.value
    return policeData.value.filter(police => police.status === activeFilter.value)
})

const pendingCount = computed(() => policeData.value.filter(p => p.status === 'pending').length)
const approvedCount = computed(() => policeData.value.filter(p => p.status === 'approved').length)
const rejectedCount = computed(() => policeData.value.filter(p => p.status === 'rejected').length)
const suspendedCount = computed(() => policeData.value.filter(p => p.status === 'suspended').length)
const totalCount = computed(() => policeData.value.length)

// Functions
const setFilter = (filter: string) => {
    activeFilter.value = filter
}

const viewDetails = (police: PoliceManagement) => {
    selectedPolice.value = police
    showDetailsPopup.value = true
}

const approvePolice = (police: PoliceManagement) => {
    const index = policeData.value.findIndex(p => p.id === police.id)
    if (index !== -1) {
        policeData.value[index].status = 'approved'
    }
}

const rejectPolice = (police: PoliceManagement) => {
    const index = policeData.value.findIndex(p => p.id === police.id)
    if (index !== -1) {
        policeData.value[index].status = 'rejected'
    }
}

const suspendPolice = (police: PoliceManagement) => {
    const index = policeData.value.findIndex(p => p.id === police.id)
    if (index !== -1) {
        policeData.value[index].status = 'suspended'
    }
}

const closePopup = () => {
    showDetailsPopup.value = false
    selectedPolice.value = null
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        case 'approved': return 'bg-green-100 text-green-800'
        case 'rejected': return 'bg-red-100 text-red-800'
        case 'suspended': return 'bg-orange-100 text-orange-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'pending': return 'ລໍຖ້າອະນຸມັດ'
        case 'approved': return 'ອະນຸມັດແລ້ວ'
        case 'rejected': return 'ປະຕິເສດ'
        case 'suspended': return 'ລະງັບ'
        default: return status
    }
}
</script>

<template>
    <div>
        <!-- Title -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800">ຈັດການຂໍ້ມູນເຈົ້າໜ້າທີ່</h2>
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
            <button 
                @click="setFilter('suspended')"
                :class="[
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    activeFilter === 'suspended' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]">
                <span :class="activeFilter === 'suspended' ? 'text-white' : 'text-black'">ລະງັບ ({{ suspendedCount }})</span>
            </button>
        </div>

        <!-- Police Management Cards -->
        <div class="rounded-lg p-6">
            <div class="grid grid-cols-3 gap-6">
                <div 
                    v-for="police in filteredPolice" 
                    :key="police.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div class="flex flex-col h-full">
                        <!-- Header -->
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm font-medium text-gray-500">{{ police.cardNumber }}</span>
                            <span 
                                :class="[
                                    'px-3 py-1 rounded-full text-xs font-medium',
                                    getStatusColor(police.status)
                                ]">
                                {{ getStatusText(police.status) }}
                            </span>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ police.rank }}{{ police.name }}</h3>
                            <div class="space-y-2 text-sm text-gray-600">
                                <div class="flex justify-between">
                                    <span>ເບີໂທ:</span>
                                    <span>{{ police.phoneNumber }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>ຫົວໜ້າງານ:</span>
                                    <span>{{ police.department }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>ເວລາລົງທະບຽນ:</span>
                                    <span>{{ police.registrationTime }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>ວັນທີ່ລົງທະບຽນ:</span>
                                    <span>{{ police.registrationDate }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-2">
                            <!-- Details Button (always visible) -->
                            <button 
                                @click="viewDetails(police)"
                                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                                ເບິ່ງລາຍລະອຽດ
                            </button>
                            
                            <!-- Management Actions (only for pending status) -->
                            <div v-if="police.status === 'pending'" class="grid grid-cols-2 gap-2">
                                <button 
                                    @click="rejectPolice(police)"
                                    class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                                    ປະຕິເສດ
                                </button>
                                <button 
                                    @click="approvePolice(police)"
                                    class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                                    ອະນຸມັດ
                                </button>
                            </div>
                            
                            <!-- Additional Actions for approved officers -->
                            <div v-else-if="police.status === 'approved'" class="flex justify-center">
                                <button 
                                    @click="suspendPolice(police)"
                                    class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                                    ລະງັບ
                                </button>
                            </div>
                            
                            <!-- Status message for other statuses -->
                            <div v-else class="text-center py-2 text-sm font-medium"
                                 :class="{
                                    'text-red-600': police.status === 'rejected',
                                    'text-orange-600': police.status === 'suspended'
                                 }">
                                {{ police.status === 'rejected' ? '✗ ປະຕິເສດແລ້ວ' : '⚠ ລະງັບແລ້ວ' }}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="filteredPolice.length === 0" class="col-span-3 text-center py-12">
                    <div class="text-gray-500">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                        <p class="text-lg font-medium">ບໍ່ພົບຂໍ້ມູນ</p>
                        <p class="text-sm">ບໍ່ມີຂໍ້ມູນເຈົ້າໜ້າທີ່ໃນໝວດນີ້</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Details Popup -->
        <div v-if="showDetailsPopup" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-neutral-800">ລາຍລະອຽດເຈົ້າໜ້າທີ່</h3>
                    <button @click="closePopup" class="text-neutral-400 hover:text-neutral-600 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div v-if="selectedPolice" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ ແລະ ນາມສະກຸນ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.rank }}{{ selectedPolice.name }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ເລກລະຫັດບັດ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.cardNumber }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ເບີໂທລະສັບ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.phoneNumber }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ຫົວໜ້າງານ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.department }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ຍົດ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.rank }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານະ</label>
                            <div class="flex items-center gap-2">
                                <span 
                                    :class="[
                                        'px-3 py-1 rounded-full text-sm font-medium',
                                        getStatusColor(selectedPolice.status)
                                    ]">
                                    {{ getStatusText(selectedPolice.status) }}
                                </span>
                            </div>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ເວລາລົງທະບຽນ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.registrationTime }}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີ່ລົງທະບຽນ</label>
                            <p class="text-lg font-semibold text-gray-900">{{ selectedPolice.registrationDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>