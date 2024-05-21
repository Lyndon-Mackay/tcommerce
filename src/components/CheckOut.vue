<script setup lang="ts">
import { computed, ref } from "vue";
import { CartItem, cartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const cartInstance = cartStore();

const { cart } = storeToRefs(cartInstance);

const alertClass = ref(new Map());

const nonEmpty = computed(() => cart.value.length > 0);

function emptyItem(item: string) {
  cartInstance.emptyItem(item);
}
function checkForEmpty(item: string, qty: number) {
  if (qty > 0) {
    return;
  }
  alertClass.value.delete(item);
  cartInstance.emptyItem(item);
}

function removeFlash(carti: CartItem) {
  setTimeout(() => {
    const update = alertClass.value.get(carti.name);
    if (update == null) {
      return;
    }
    alertClass.value.set(carti.name, { qty: update.qty });
  }, 250);
}

function proccessFlash(carti: CartItem) {
  const alertStuff = alertClass.value.get(carti.name);

  if ( alertStuff === undefined) {
    alertClass.value.set(carti.name, { ["increased"]: true, qty: carti.qty });
    removeFlash(carti);
    return;
  }

  if (alertStuff.qty < carti.qty) {
    alertClass.value.set(carti.name, { ["increased"]: true, qty: carti.qty });
    removeFlash(carti);
  } else if (alertStuff.qty > carti.qty) {
    alertClass.value.set(carti.name, { ["decreased"]: true, qty: carti.qty });
    removeFlash(carti);
  }
}

watch(
  () => cartInstance.cart,
  (oldValue) => {
    oldValue.forEach((x) => {
      proccessFlash(x);
    });
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <div v-if="nonEmpty" class="cartHeader">
    <h3>Cart</h3>
    <button @click="cartInstance.clearCart">Clear</button>
  </div>
  <TransitionGroup name="list" tag="ul">
    <li v-for="c in cart" :key="c.name">
      <span>{{ c.name }} </span>
      <input type="number" v-model="c.qty" :id="c.name + '-number'" :class="alertClass.get(c.name)"
        @change="checkForEmpty(c.name, c.qty)" />
      <button @click="emptyItem(c.name)">X</button>
    </li>
  </TransitionGroup>
</template>

<style scoped>
li {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

ul {
  font-size: 3em;
}

li>span {
  font-size: 0.5em;
  align-self: center;
}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-active {
  transform: scale(1.2);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  background-color: red;
}

.list-enter-from {
  background-color: green;
}

h3 {
  padding-left: 40px;
}

li>button {
  display: contents;
  font-size: 0.75em;
}

input:focus:not(.decreased, .increased) {
  background-color: darkcyan;
}

.changed {
  background-color: silver;
}

.decreased:not(.list-enter-from) {
  background-color: red;
}

.increased {
  background-color: darkgreen;
}

.cartHeader {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.cartHeader {
  display: flex;
  align-items: center;
  gap: 25%;
}

.cartHeader>button {
  display: contents;
}
</style>
