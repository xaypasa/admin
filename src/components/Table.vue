<script setup lang="ts">
import { ref } from 'vue'
import LoginView from '@/components/LoginView.vue' // Import the component to display
import Payment from './Payment.vue'
import jasonData from '../data/jasonData'
import type { DataItem } from '../data/jasonData'

const jason = ref<DataItem[]>(jasonData)

// Reactive variable to track the active component
const activeComponent = ref('table') // Default to 'table'

// Function to handle row click
const handleRowClick = (component: string) => {
    activeComponent.value = component // Set the active component
}
</script>
<template>
    <div class="overflow-x-auto rounded mt-[2px]">
        <!-- Conditionally Render Components -->
        <div v-if="activeComponent === 'table'">
            <table class="table table-xs table-pin-rows table-pin-cols text-base">
                <thead>
                    <tr>
                        <th class="text-lg">ລໍາດັບ</th>
                        <td class="text-lg">ຊື່</td>
                        <td class="text-lg">ນາມສະກຸນ</td>
                        <td class="text-lg">company</td>
                        <td class="text-lg">location</td>
                        <td class="text-lg">Last Login</td>
                        <td class="text-lg">Favorite Color</td>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Example Row -->
                    <tr @click="handleRowClick('payment')"
                        class="hover:bg-base-200 transition-colors duration-200 hover:rounded-lg cursor-pointer"
                        >
                        <th class="text-sm">1</th>
                        <td v-for="item in jason" :key="item.id" class="text-base">{{ item.id }}</td>
                        
                    </tr>
                </tbody>
            
            </table>
        </div>

        <!-- Render LoginView Component -->
        <div v-else-if="activeComponent === 'payment'">
            <Payment />
        </div>
    </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>