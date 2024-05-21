<script setup lang="ts">
import { ref } from "vue";

import { cartStore } from "../stores/cart";

const props = defineProps<{
  finishedType: string;
}>();

const material = ref("");
const height = ref(0);
const width = ref(0);
const glazed = ref(false);
const primed = ref(false);
const thermal = ref(false);

const cartState = cartStore();

function addToCat(e: Event) {
  console.log(e);
  const itemCode =
    props.finishedType +
    material.value +
    height.value +
    width.value +
    glazed.value +
    primed.value +
    thermal.value;
  cartState.addToCart(itemCode);
}
</script>

<template>
  <h1>Enter a custom {{ props.finishedType }}</h1>
  <form @submit.prevent="addToCat($event)">
    <select required v-model="material">
      <option disabled value="">please select your material</option>
      <option value="A">Aluminum</option>
      <option value="T">Timber</option>
    </select>
    <fieldset>
      <legend>dimensions</legend>
      <div>
        <label for="height">height</label>
        <input required min="1000" type="number" id="height" v-model="height" />
      </div>
      <div>
        <label for="width">width</label>
        <input required min="420" type="number" id="width" v-model="width" />
      </div>
    </fieldset>

    <fieldset>
      <legend>glass</legend>
      <label for="glazed">glazed</label>
      <input type="checkbox" id="glazed" v-model="glazed" />
    </fieldset>

    <fieldset v-if="material != ''">
      <legend>options</legend>
      <template v-if="material == 'T'">
        <label for="primed">Primed</label>
        <input type="checkbox" id="primed" v-model="primed" />
      </template>

      <template v-if="material == 'A'">
        <label for="thermal">Thermally Broken</label>
        <input type="checkbox" id="Thermal" v-model="thermal" />
      </template>
    </fieldset>

    <button>submit</button>
  </form>
</template>
<style scoped></style>
