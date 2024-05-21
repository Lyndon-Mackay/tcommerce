<script setup lang="ts">
import { ref, type Ref } from "vue";
import HardwareSelection from "../components/SelectionHardware.vue";

interface hardwareData {
  id: string;
  productName: string;
}

const testdata: Ref<hardwareData[]> = ref([]);

async function requestData() {
  const response = await fetch("http://localhost:3000/products");
  testdata.value = await response.json();
}
requestData();
</script>

<template>
  <h1>Hardware selection</h1>
  <div>
    <HardwareSelection
      v-for="data in testdata"
      :key="data.id"
      :name="data.productName"
      :code="data.id"
    ></HardwareSelection>
  </div>
</template>
<style scoped>
div {
  display: flex;
  gap: 2%;
  flex-wrap: wrap;
  flex-grow: 5;
  justify-content: center;
  align-content: flex-start;
}
</style>
