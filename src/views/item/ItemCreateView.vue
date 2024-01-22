<script setup>
import router from "@/router";
import api from "@/services/api";
import { onMounted, ref } from "vue";

const loading = ref(false);
const subcategories = ref([]);
const sub_category_id = ref(null);
const name = ref("");

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

const addSubCategory = async () => {
  if (name.value.trim() === "") {
    return;
  }
  try {
    loading.value = true;
    await api.post("/item/store", { name: name.value, sub_category_id:sub_category_id.value });

    name.value = "";
  } catch (error) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
    router.push("/item");
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <div class="card-title">Create Item</div>
      <router-link to="/item" class="btn btn-dark">Back</router-link>
    </div>
    <div class="card-body">
      <form @submit.prevent="addSubCategory">
        <div class="mb-3">
          <label for="categorySelect" class="form-label"
            >Select Sub Category:</label
          >
          <select
            v-model="sub_category_id"
            id="categorySelect"
            class="form-select"
            required
          >
            <option
              v-for="subcategory in subcategories"
              :key="subcategory.id"
              :value="subcategory.id"
            >
              {{ subcategory.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="categoryName" class="form-label"
            >Item Name:</label
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
          Add Item
        </button>
      </form>
    </div>
  </div>
</template>