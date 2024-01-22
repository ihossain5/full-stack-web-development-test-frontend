<script setup>
import router from "@/router";
import api from "@/services/api";
import { ref } from 'vue';

const loading = ref(false);
const name = ref('');

const addCategory = async () => {
  if (name.value.trim() === '') {
    return;
  }
  try {
    loading.value = true;
    await api.post("/category/store", { name: name.value });

    name.value = '';

  } catch (error) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
    router.push('/category');
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <div class="card-title">Create Category</div>
      <router-link to="/category" class="btn btn-dark"
        >Back</router-link
      >
    </div>
    <div class="card-body">
        <form @submit.prevent="addCategory">
        <div class="mb-3">
          <label for="categoryName" class="form-label">Category Name:</label>
          <input type="text" id="categoryName" v-model="name" class="form-control" required />
        </div>
        <button type="submit" :disabled="loading" class="btn btn-success">Add Category</button>
      </form>
    </div>
  </div>
</template>