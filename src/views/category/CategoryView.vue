<script setup>
import api from "@/services/api";
import { onMounted, ref } from "vue";

const categories = ref({});
const loading = ref(true);

const fetchData = async () => {
  try {
    const response = await api.get("/category/all");
    categories.value = response.data.data;
  } catch (e) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

</script>

<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <div class="card-title">All Category</div>
      <router-link to="/category-create" class="btn btn-primary"
        >Add New</router-link
      >
    </div>
    <div class="card-body">
      <table class="table table-striped text-center ">
        <thead>
          <th>#</th>
          <th>Name</th>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="2">Loading...</td>
          </tr>
          <tr v-else-if="categories.length === 0">
            <td colspan="2">Data Not Found</td>
          </tr>
          <tr v-else v-for="(category, index) in categories" :key="category.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ category.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>