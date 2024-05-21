<script setup lang="ts">
import axios from "../services/posts";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps<{ id: string }>();

const blogArticle = ref();
const postId = ref(route.params.id);

async function retrieve() {
  const response = await axios
    .get(`http://localhost:3000/blog/${props.id}`)
    .catch(() => {
      router.push({ name: "Noblog" });
    });

  if (response == undefined || response.status !== 200) {
    router.push({ name: "Noblog" });
    return;
  }
  blogArticle.value = response.data;
}
watch(
  () => route.params.id,
  (newId) => {
    postId.value = newId;
  },
);

retrieve();
</script>
<template>
  <article v-if="blogArticle != null">
    <h3>{{ blogArticle.title }}</h3>
    <p>{{ blogArticle.content }}</p>
  </article>
</template>
