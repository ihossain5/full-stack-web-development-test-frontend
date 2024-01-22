<script setup>
import api from "@/services/api";
import { onMounted, ref } from "vue";

const subcategories = ref({});
const loading = ref(true);

const fetchData = async () => {
  try {
    const response = await api.get("/subcategory/all");
    subcategories.value = response.data.data;
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
      <div class="card-title">Sub Category</div>
      <router-link to="/sub-category/create" class="btn btn-primary"
        >Add New</router-link
      >
    </div>
    <div class="card-body">
      <table class="table table-striped text-center">
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Category Name</th>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3">Loading...</td>
          </tr>
          <tr v-else-if="subcategories.length === 0">
            <td colspan="3">Data Not Found</td>
          </tr>
          <tr
            v-else
            v-for="(subcategory, index) in subcategories"
            :key="subcategory.id"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ subcategory.name }}</td>
            <td>{{ subcategory.category_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>