<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import listicon from './icons/listicon.vue';
import ReportPoliceInfo from '@/views/ReportPoliceInfo.vue';
import ReportOffenderInfo from '@/views/ReportOffenderInfo.vue';
import ReportFinesInfo from '@/views/ReportFinesInfo.vue';
import ReportIncomeInfo from '@/views/ReportIncomeInfo.vue';
import ReportPayInfo from '@/views/ReportPayInfo.vue';

const activeTab = ref('police'); // Default active tab

// Function to change active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
}
</script>


<template>
    <div>
        <h6 class="text-4xl text-neutral-950 font-bold">ລາຍງານ</h6>
    </div>

    <div class="grid auto-cols-max grid-flow-col">
        <div class="pt-9 pr-9">
            <button 
              @click="setActiveTab('police')" 
              class="btn py-6 text-neutral-950" 
              :class="activeTab === 'police' ? 'bg-blue-500 text-white' : 'bg-zinc-300'">
              <span class="flex text-black">ລາຍງານຂໍ້ມູນຕໍາຫຼວດ <listicon /></span>
            </button>
        </div>
        <div class="p-9">
            <button 
              @click="setActiveTab('offender')" 
              class="btn py-6 text-neutral-950" 
              :class="activeTab === 'offender' ? 'bg-blue-500 text-white' : 'bg-zinc-300'">
              <span class="flex text-black">ລາຍງານຂໍ້ມູນຜູ້ລະເມີດ <listicon /></span>
            </button>
        </div>
        <div class="p-9">
            <button 
              @click="setActiveTab('payment')" 
              class="btn py-6 text-neutral-950" 
              :class="activeTab === 'payment' ? 'bg-blue-500 text-white' : 'bg-zinc-300'">
              <span class="flex text-black">ລາຍງານຂໍ້ມູນການຊໍາລະ <listicon /></span>
            </button>
        </div>
        <div class="p-9">
            <button 
              @click="setActiveTab('income')" 
              class="btn py-6 text-neutral-950" 
              :class="activeTab === 'income' ? 'bg-blue-500 text-white' : 'bg-zinc-300'">
              <span class="flex text-black">ລາຍງານຂໍ້ມູນລາຍຮັບ <listicon /></span>
            </button>
        </div>
        <div class="p-9">
            <button 
              @click="setActiveTab('fines')" 
              class="btn py-6 text-neutral-950" 
              :class="activeTab === 'fines' ? 'bg-blue-500 text-white' : 'bg-zinc-300'">
              <span class="flex text-black">ລາຍງານຂໍ້ມູນການປັບໄໝ <listicon /></span>
            </button>
        </div>
    </div>

    <div class="flex justify-center">
        <div class="py-5">
            <ReportPoliceInfo v-if="activeTab === 'police'" />
            <ReportOffenderInfo v-if="activeTab === 'offender'" />
            <ReportPayInfo v-if="activeTab === 'payment'" />
            <ReportIncomeInfo v-if="activeTab === 'income'" />
            <ReportFinesInfo v-if="activeTab === 'fines'" />
        </div>
    </div>
</template>


<style scoped>
.tab {
  display: inline-flex;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}
</style>