<script setup lang="ts">
import { cartStore } from "../stores/cart";

const props = defineProps<{
  code: string;
  name: string;
}>();

const cartState = cartStore();

function addToCart(item: string) {
  cartState.addToCart(item);
}
</script>

<template>
  <div @click="addToCart(props.name)">{{ props.name }}</div>
</template>
<style scoped>
div {
  background-color: rgb(0, 189, 126);
  color: black;
  flex-basis: 33%;
  margin-bottom: 5px;
  font-size: 1.5em;
}
</style>
