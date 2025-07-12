<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Define the Legal interface
interface Legal {
    id: number;
    lawName: string;
    articleNumber: string;
    description: string;
    category: string;
    effectiveDate: string;
    createdAt?: string;
    updatedAt?: string;
}

// API base URL
const API_BASE_URL = 'http://localhost:3000/api/admin';

// Reactive data
const legalData = ref<Legal[]>([]);
const searchQuery = ref('');
const showModal = ref(false);
const showDetailsModal = ref(false);
const isEditMode = ref(false);
const selectedLegal = ref<Legal | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const newLegal = ref<Omit<Legal, 'id'>>({
    lawName: '',
    articleNumber: '',
    description: '',
    category: '',
    effectiveDate: ''
});

// Computed property to filter legal data based on search query
const filteredLegalData = computed(() => {
    if (!searchQuery.value) {
        return legalData.value;
    }
    return legalData.value.filter(item =>
        item.lawName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.articleNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// API functions
const fetchLegalData = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(`${API_BASE_URL}/legal`, {
            method: 'GET',
            credentials: 'include', // Include cookies for authentication
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const result = await response.json();
        if (result.code === 10) {
            legalData.value = result.data || [];
        } else {
            error.value = result.message || 'Failed to fetch legal data';
        }
    } catch (err) {
        error.value = 'Network error: Unable to fetch legal data';
        console.error('Error fetching legal data:', err);
    } finally {
        loading.value = false;
    }
};

const createLegalEntry = async (legalEntry: Omit<Legal, 'id'>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/legal`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(legalEntry),
        });
        
        const result = await response.json();
        if (result.code === 10) {
            await fetchLegalData(); // Refresh data
            return { success: true };
        } else {
            return { success: false, message: result.message || 'Failed to create legal entry' };
        }
    } catch (err) {
        return { success: false, message: 'Network error: Unable to create legal entry' };
    }
};

const updateLegalEntry = async (id: number, legalEntry: Omit<Legal, 'id'>) => {
    try {
        const response = await fetch(`${API_BASE_URL}/legal/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(legalEntry),
        });
        
        const result = await response.json();
        if (result.code === 10) {
            await fetchLegalData(); // Refresh data
            return { success: true };
        } else {
            return { success: false, message: result.message || 'Failed to update legal entry' };
        }
    } catch (err) {
        return { success: false, message: 'Network error: Unable to update legal entry' };
    }
};

const deleteLegalEntry = async (id: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/legal/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        
        const result = await response.json();
        if (result.code === 10) {
            await fetchLegalData(); // Refresh data
            return { success: true };
        } else {
            return { success: false, message: result.message || 'Failed to delete legal entry' };
        }
    } catch (err) {
        return { success: false, message: 'Network error: Unable to delete legal entry' };
    }
};

// Functions for CRUD operations
const openAddModal = () => {
    isEditMode.value = false;
    selectedLegal.value = null;
    newLegal.value = { lawName: '', articleNumber: '', description: '', category: '', effectiveDate: '' };
    showModal.value = true;
};

const openEditModal = (legal: Legal) => {
    isEditMode.value = true;
    selectedLegal.value = { ...legal };
    newLegal.value = { 
        lawName: legal.lawName,
        articleNumber: legal.articleNumber,
        description: legal.description,
        category: legal.category,
        effectiveDate: legal.effectiveDate 
    };
    showModal.value = true;
};

const openDetailsModal = (legal: Legal) => {
    selectedLegal.value = { ...legal };
    showDetailsModal.value = true;
};

const closePopups = () => {
    showModal.value = false;
    showDetailsModal.value = false;
    error.value = null;
};

const saveLegal = async () => {
    loading.value = true;
    let result;
    
    if (isEditMode.value && selectedLegal.value) {
        result = await updateLegalEntry(selectedLegal.value.id, newLegal.value);
    } else {
        result = await createLegalEntry(newLegal.value);
    }
    
    if (result.success) {
        closePopups();
    } else {
        error.value = result.message || 'Operation failed';
    }
    
    loading.value = false;
};

const deleteLegal = async (id: number) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບລາຍການນີ້?')) {
        loading.value = true;
        const result = await deleteLegalEntry(id);
        
        if (!result.success) {
            error.value = result.message || 'Failed to delete legal entry';
        }
        
        loading.value = false;
    }
};

// Load data when component mounts
onMounted(async () => {
    await fetchLegalData();
});
</script>

<template>
    <div class="container mx-auto p-6 bg-gray-50 min-h-screen">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800">ຈັດການດ້ານກົດໝາຍ</h1>
            <button @click="openAddModal" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                + ເພີ່ມກົດໝາຍໃໝ່
            </button>
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
                placeholder="ຄົ້ນຫາ (ຊື່ກົດໝາຍ, ມາດຕາ, ປະເພດ)..." 
                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
        </div>

        <!-- Legal Table -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-200 text-gray-700">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ຊື່ກົດໝາຍ</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ມາດຕາ</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ປະເພດ</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold uppercase">ວັນທີມີຜົນ</th>
                        <th class="py-3 px-6 text-center text-sm font-semibold uppercase">ຈັດການ</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600">
                    <tr v-for="legal in filteredLegalData" :key="legal.id" class="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                        <td class="py-4 px-6">{{ legal.lawName }}</td>
                        <td class="py-4 px-6">{{ legal.articleNumber }}</td>
                        <td class="py-4 px-6">
                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{{ legal.category }}</span>
                        </td>
                        <td class="py-4 px-6">{{ legal.effectiveDate }}</td>
                        <td class="py-4 px-6 text-center">
                            <button @click="openDetailsModal(legal)" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors mr-2">
                                <span class="text-white">ລາຍລະອຽດ</span>
                            </button>
                            <button @click="openEditModal(legal)" class="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors mr-2">
                                <span class="text-white">ແກ້ໄຂ</span>
                            </button>
                            <button @click="deleteLegal(legal.id)" class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded-md transition-colors">
                                <span class="text-white">ລົບ</span>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="filteredLegalData.length === 0 && !loading">
                        <td colspan="5" class="text-center py-10 text-gray-500">
                            <p class="text-lg">ບໍ່ພົບຂໍ້ມູນ</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Add/Edit Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ isEditMode ? 'ແກ້ໄຂຂໍ້ມູນກົດໝາຍ' : 'ເພີ່ມກົດໝາຍໃໝ່' }}</h2>
                
                <!-- Error Message in Modal -->
                <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {{ error }}
                </div>
                
                <form @submit.prevent="saveLegal">
                    <div class="grid grid-cols-1 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ກົດໝາຍ</label>
                            <input 
                                type="text" 
                                v-model="newLegal.lawName" 
                                class="w-full p-3 border border-gray-300 rounded-lg text-black" 
                                required
                                :disabled="loading"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ມາດຕາ</label>
                            <input 
                                type="text" 
                                v-model="newLegal.articleNumber" 
                                class="w-full p-3 border border-gray-300 rounded-lg" 
                                required
                                :disabled="loading"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ລາຍລະອຽດ</label>
                            <textarea 
                                v-model="newLegal.description" 
                                rows="3" 
                                class="w-full p-3 border border-gray-300 rounded-lg"
                                required
                                :disabled="loading"
                            ></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດ</label>
                            <input 
                                type="text" 
                                v-model="newLegal.category" 
                                class="w-full p-3 border border-gray-300 rounded-lg" 
                                required
                                :disabled="loading"
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີມີຜົນບັງຄັບໃຊ້</label>
                            <input 
                                type="date" 
                                v-model="newLegal.effectiveDate" 
                                class="w-full p-3 border border-gray-300 rounded-lg" 
                                required
                                :disabled="loading"
                            >
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end gap-4">
                        <button 
                            type="button" 
                            @click="closePopups" 
                            class="py-2 px-4 bg-gray-400 text-gray-800 rounded-lg hover:bg-gray-600"
                            :disabled="loading"
                        >
                            <span class="text-black">ຍົກເລີກ</span>
                        </button>
                        <button 
                            type="submit" 
                            class="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            :disabled="loading"
                        >
                            <span v-if="loading" class="flex items-center">
                                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                ກຳລັງບັນທຶກ...
                            </span>
                            <span v-else>{{ isEditMode ? 'ບັນທຶກການແກ້ໄຂ' : 'ເພີ່ມ' }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Details Modal -->
        <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">ລາຍລະອຽດກົດໝາຍ</h2>
                    <button @click="closePopups" class="text-black hover:text-gray-700 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div v-if="selectedLegal" class="space-y-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ກົດໝາຍ</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedLegal.lawName }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ມາດຕາ</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedLegal.articleNumber }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ລາຍລະອຽດ</label>
                        <p class="text-base text-gray-800">{{ selectedLegal.description }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ປະເພດ</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedLegal.category }}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <label class="block text-sm font-medium text-gray-700 mb-1">ວັນທີມີຜົນ</label>
                        <p class="text-lg font-semibold text-gray-900">{{ selectedLegal.effectiveDate }}</p>
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <button type="button" @click="closePopups" class="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        <span class="text-black">ປິດ</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>