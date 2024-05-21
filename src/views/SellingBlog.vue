<script setup lang="ts">
import axios from "axios";

import { ref } from "vue";

const postContent = ref("");
const num = ref(1);
const blogArticles = ref();

async function retrieve() {
  const blogs = await axios.get("http://localhost:3000/blog");

  blogArticles.value = blogs.data;
  
}

function send() {
  const json = { id: num.value, content: postContent.value };
  postContent.value = "";

  axios
    .post(`http://localhost:3000/blog/${num.value}`, json)
    .then((e) => console.log("yay", e))
    .catch((e) => console.log(e.message));
}
function summary(test: string): string {
  return test.slice(0, 30);
}
retrieve();
</script>

<template>
  <h1>Welcome to the blog</h1>

  <article v-for="p in blogArticles" :key="p.id">
    <h2>
      <RouterLink :to="'blog/' + p.id">{{ p.title }}</RouterLink>
    </h2>
    <p>{{ summary(p.content) }}...</p>
  </article>

  <Teleport to="#app">
    <div>
    <form @submit.prevent="send">
      <label for="newpost">Message to send</label>
      <textarea name="newpost" id="post contest" v-model="postContent" placeholder="Something to post"></textarea>
      <button>submit</button>
    </form>
  </div>
  </Teleport>
</template>

<style scoped>
textarea {
  width: 300px;
  height: 200px;
}

label,
textarea {
  display: block;
}

label {
  font-size: 1.33em;
}
div{
  grid-area: K;
}

</style>
