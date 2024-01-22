<script setup>
import router from "@/router";
import api from "@/services/api";
import { onMounted, ref } from "vue";

const loading = ref(false);
const categories = ref([]);
const category_id = ref(null);
const name = ref("");

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

const addSubCategory = async () => {
  if (name.value.trim() === "") {
    return;
  }
  try {
    loading.value = true;
    await api.post("/subcategory/store", { name: name.value, category_id:category_id.value });

    name.value = "";
  } catch (error) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
    router.push("/sub-category");
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <div class="card-title">Create Sub Category</div>
      <router-link to="/sub-category" class="btn btn-dark">Back</router-link>
    </div>
    <div class="card-body">
      <form @submit.prevent="addSubCategory">
        <div class="mb-3">
          <label for="categorySelect" class="form-label"
            >Select Category:</label
          >
          <select
            v-model="category_id"
            id="categorySelect"
            class="form-select"
            required
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="categoryName" class="form-label"
            >Sub Category Name:</label
          >
          <input
            type="text"
            id="categoryName"
            v-model="name"
            class="form-control"
            required
          />
        </div>
        <button type="submit" :disabled="loading" class="btn btn-success">
          Add Sub Category
        </button>
      </form>
    </div>
  </div>
</template>