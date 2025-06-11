<script setup lang="ts">
// Import from TypeScript data file with proper typing
import jasonData from '../data/jasonData'
import type { DataItem } from '../data/jasonData'
import { ref } from 'vue'

// Use the imported data with proper typing
const jason = ref<DataItem[]>(jasonData)
</script>

<template>
    <h3>Data from TypeScript File</h3>
    
    <!-- Data display -->
    <div v-if="jason && jason.length > 0">
        <div v-for="item in jason" :key="item.id" class="data-item">
           <strong>ID:</strong> {{ item.id }} | 
           <strong>Name:</strong> {{ item.surname }} | 
           <strong>Price:</strong> ${{ item.price }}
        </div>
    </div>
    
    <!-- No data state -->
    <div v-else>No data available</div>
</template>

<style scoped>
.data-item {
  padding: 8px;
  margin: 4px 0;
  border-bottom: 1px solid #eee;
}
</style>