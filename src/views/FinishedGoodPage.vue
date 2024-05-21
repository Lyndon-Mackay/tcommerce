<script setup lang="ts">
import { ref, type Ref } from "vue";
import FormFinishedEntry from "../components/FormFinishedEntry.vue";

interface comptab {
  name: string;
}

const tabs: comptab[] = [{ name: "Door" }, { name: "window" }];
const currenttab: Ref<number> = ref(0);
</script>

<template>
  <div>
    <button
      v-for="(tab, index) in tabs"
      :key="tab.name"
      @click="currenttab = index"
    >
      {{ tab.name }}
    </button>
  </div>
  <KeepAlive>
    <FormFinishedEntry
      :finishedType="tabs[currenttab].name"
    ></FormFinishedEntry>
  </KeepAlive>
</template>
