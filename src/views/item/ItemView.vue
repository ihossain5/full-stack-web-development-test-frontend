<script setup>
import Pagination from "@/components/Pagination.vue";
import api from "@/services/api";
import { onMounted, ref } from "vue";

const items = ref({});
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchData = async (page = 1) => {
  try {
    const response = await api.get(`/item/all?page=${page}`);
    items.value = response.data.data.data;
    totalPages.value = response.data.data.meta.last_page;
  } catch (e) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const changePage = (page) => {
  currentPage.value = page;
  fetchData(page);
};
</script>
<template>
    <div class="card">
      <div class="card-body d-flex justify-content-between">
        <div class="card-title">All Item</div>
        <router-link to="/item/create" class="btn btn-primary">Add New</router-link>
      </div>
      <div class="card-body">
        <table class="table table-striped text-center">
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Sub Category Name</th>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3">Loading...</td>
          </tr>
          <tr v-else-if="items.length === 0">
            <td colspan="3">Data Not Found</td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in items"
            :key="item.id"
          >
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.subcategory_name }}</td>
          </tr>
        </tbody>
      </table>
      <pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :changePage="changePage"
      ></pagination>
      </div>
    </div>
  </template>