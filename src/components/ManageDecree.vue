<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Define the Decree interface
interface Decree {
    id: number;
    rule_type: string;
    price: number;
    mardtar_id?: number;
    cartypes_id?: number;
    muad_id?: number;
    // Joined data
    mardtar_name?: string;
    cartype_name?: string;
    muad_name?: string;
}

interface DecreeStats {
    general: {
        total_decrees: number;
        average_price: number;
        min_price: number;
        max_price: number;
        total_rule_types: number;
    };
    ruleTypes: Array<{
        rule_type: string;
        count: number;
        avg_price: number;
    }>;
}

// API base URL
const API_BASE_URL = 'http://localhost:3000/api/admin';

// Reactive data
const decreeData = ref<Decree[]>([]);
const decreeStats = ref<DecreeStats | null>(null);
const searchQuery = ref('');
const showDetailsModal = ref(false);
const showStatsModal = ref(false);
const selectedDecree = ref<Decree | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

// Computed property to filter decree data based on search query
const filteredDecreeData = computed(() => {
    if (!searchQuery.value) {
        return decreeData.value;
    }
    return decreeData.value.filter(item =>
        item.rule_type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.id.toString().includes(searchQuery.value)
    );
});

// API functions
const fetchDecreeData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(`${API_BASE_URL}/decree`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        if (result.code === 10) {
            decreeData.value = result.data || [];
        } else {
            error.value = result.message || 'Failed to fetch decree data';
        }
    } catch (err) {
        error.value = 'Network error: Unable to fetch decree data';
        console.error('Error fetching decree data:', err);
    } finally {
        loading.value = false;
    }
};

const fetchDecreeStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/decree/stats`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        if (result.code === 10) {
            decreeStats.value = result.data;
        } else {
            error.value = result.message || 'Failed to fetch decree statistics';
        }
    } catch (err) {
        error.value = 'Network error: Unable to fetch decree statistics';
        console.error('Error fetching decree stats:', err);
    }
};

// Helper functions
const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LAK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

const openDetailsModal = (decree: Decree) => {
    selectedDecree.value = { ...decree };
    showDetailsModal.value = true;
};

const openStatsModal = async () => {
    await fetchDecreeStats();
    showStatsModal.value = true;
};

const closeModals = () => {
    showDetailsModal.value = false;
    showStatsModal.value = false;
    error.value = null;
};

// Load data when component mounts
onMounted(async () => {
    await fetchDecreeData();
});
</script>

<template>
    <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">ຂໍ້ມູນລະບຽບກົດຫມາຍ (Decree)</h1>
            <div class="flex gap-4">
                <button @click="fetchDecreeData" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    🔄 ໂຫຼດຂໍ້ມູນໃໝ່
                </button>
                <button @click="openStatsModal" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    📊 ສະຖິຕິ
                </button>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p>{{ error }}</p>
            <button @click="error = null" class="ml-2 text-red-500 hover:text-red-700">×</button>
        </div>

        <!-- Loading Spinner -->
        <div v-if="loading" class="flex justify-center items-center mb-6">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">ກຳລັງໂຫລດ...</span>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="ຄົ້ນຫາ (ປະເພດກົດຫມາຍ, ID)..." 
                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-700">ຈຳນວນທັງໝົດ</h3>
                <p class="text-2xl font-bold text-blue-600">{{ decreeData.length }}</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-700">ຜົນການຄົ້ນຫາ</h3>
                <p class="text-2xl font-bold text-green-600">{{ filteredDecreeData.length }}</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-700">ຄ່າທຳນຽມສູງສຸດ</h3>
                <p class="text-xl font-bold text-red-600">
                    {{ decreeData.length > 0 ? formatPrice(Math.max(...decreeData.map(d => d.price))) : '0' }}
                </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-gray-700">ຄ່າທຳນຽມຕ່ຳສຸດ</h3>
                <p class="text-xl font-bold text-orange-600">
                    {{ decreeData.length > 0 ? formatPrice(Math.min(...decreeData.map(d => d.price))) : '0' }}
                </p>
            </div>
        </div>

        <!-- Decree Table -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-200 text-gray-700">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ID</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ປະເພດກົດຫມາຍ</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ຄ່າທຳນຽມ</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ມາດຕາ ID</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ປະເພດລົດ ID</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ເມືອງ ID</th>
                        <th class="py-3 px-6 text-center text-sm font-semibold uppercase">ຈັດການ</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600">
                    <tr v-for="decree in filteredDecreeData" :key="decree.id" class="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                        <td class="py-4 px-6 font-medium">{{ decree.id }}</td>
                        <td class="py-4 px-6">
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {{ decree.rule_type }}
                            </span>
                        </td>
                        <td class="py-4 px-6">
                            <span class="font-semibold text-green-600">{{ formatPrice(decree.price) }}</span>
                        </td>
                        <td class="py-4 px-6">
                            <span class="text-sm">{{ decree.mardtar_id || 'N/A' }}</span>
                        </td>
                        <td class="py-4 px-6">
                            <span class="text-sm">{{ decree.cartypes_id || 'N/A' }}</span>
                        </td>
                        <td class="py-4 px-6">
                            <span class="text-sm">{{ decree.muad_id || 'N/A' }}</span>
                        </td>
                        <td class="py-4 px-6 text-center">
                            <button @click="openDetailsModal(decree)" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors">
                                <span class="text-white">ລາຍລະອຽດ</span>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="filteredDecreeData.length === 0 && !loading">
                        <td colspan="7" class="text-center py-10 text-gray-500">
                            <p class="text-lg">ບໍ່ພົບຂໍ້ມູນ</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">ລາຍລະອຽດກົດຫມາຍ</h2>
                    <button @click="closeModals" class="text-black hover:text-gray-700 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div v-if="selectedDecree" class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ID</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedDecree.id }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດກົດຫມາຍ</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedDecree.rule_type }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ຄ່າທຳນຽມ</label>
                        <p class="text-lg font-semibold text-green-600">{{ formatPrice(selectedDecree.price) }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ມາດຕາ ID</label>
                        <p class="text-base text-gray-800">{{ selectedDecree.mardtar_id || 'N/A' }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດລົດ ID</label>
                        <p class="text-base text-gray-800">{{ selectedDecree.cartypes_id || 'N/A' }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ເມືອງ ID</label>
                        <p class="text-base text-gray-800">{{ selectedDecree.muad_id || 'N/A' }}</p>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button type="button" @click="closeModals" class="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        <span class="text-black">ປິດ</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Modal -->
        <div v-if="showStatsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">ສະຖິຕິຂໍ້ມູນກົດຫມາຍ</h2>
                    <button @click="closeModals" class="text-black hover:text-gray-700 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div v-if="decreeStats" class="space-y-6">
                    <!-- General Stats -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">ສະຖິຕິທົ່ວໄປ</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <p class="text-2xl font-bold text-blue-600">{{ decreeStats.general.total_decrees }}</p>
                                <p class="text-sm text-gray-600">ຈຳນວນທັງໝົດ</p>
                            </div>
                            <div class="text-center">
                                <p class="text-2xl font-bold text-green-600">{{ decreeStats.general.total_rule_types }}</p>
                                <p class="text-sm text-gray-600">ປະເພດກົດຫມາຍ</p>
                            </div>
                            <div class="text-center">
                                <p class="text-xl font-bold text-orange-600">{{ formatPrice(decreeStats.general.average_price) }}</p>
                                <p class="text-sm text-gray-600">ຄ່າທຳນຽມເຉລີ່ຍ</p>
                            </div>
                            <div class="text-center">
                                <p class="text-xl font-bold text-red-600">{{ formatPrice(decreeStats.general.max_price) }}</p>
                                <p class="text-sm text-gray-600">ຄ່າທຳນຽມສູງສຸດ</p>
                            </div>
                        </div>
                    </div>

                    <!-- Rule Type Stats -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">ສະຖິຕິຕາມປະເພດກົດຫມາຍ</h3>
                        <div class="max-h-60 overflow-y-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="text-left">
                                        <th class="py-2 px-3 text-sm font-medium text-gray-600">ປະເພດ</th>
                                        <th class="py-2 px-3 text-sm font-medium text-gray-600">ຈຳນວນ</th>
                                        <th class="py-2 px-3 text-sm font-medium text-gray-600">ຄ່າເຉລີ່ຍ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="stat in decreeStats.ruleTypes" :key="stat.rule_type" class="border-t">
                                        <td class="py-2 px-3 text-sm">{{ stat.rule_type }}</td>
                                        <td class="py-2 px-3 text-sm font-semibold">{{ stat.count }}</td>
                                        <td class="py-2 px-3 text-sm text-green-600">{{ formatPrice(stat.avg_price) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button type="button" @click="closeModals" class="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        <span class="text-black">ປິດ</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add any additional styles here */
</style> 