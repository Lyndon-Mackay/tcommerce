import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export interface CartItem {
  name: string;
  qty: number;
}

export const cartStore = defineStore("cart", () => {
  const cart: Ref<CartItem[]> = ref([]);

  function addToCart(item: string) {
    let index = cart.value.findIndex((x) => x.name == item);
    if (index > -1) {
      cart.value[index].qty++;
      return;
    }
    cart.value.push({ name: item, qty: 1 });
  }
  function emptyItem(item: string) {
    cart.value = cart.value.filter((x) => x.name != item);
  }
  function clearCart() {
    cart.value = [];
  }

  return { cart, addToCart, emptyItem, clearCart };
});
