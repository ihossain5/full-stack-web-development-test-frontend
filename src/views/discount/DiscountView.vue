<script setup>
import Pagination from "@/components/Pagination.vue";
import api from "@/services/api";
import { onMounted, ref } from "vue";

const discounts = ref({});
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchData = async (page = 1) => {
  try {
    const response = await api.get(`/discount/all?page=${page}`);
    discounts.value = response.data.data.data;
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
      <div class="card-title">All Discount</div>
      <router-link to="/discount/create" class="btn btn-primary"
        >Add New</router-link
      >
    </div>
    <div class="card-body">
      <table class="table table-striped text-center ">
        <thead>
          <th>#</th>
          <th>Discount Type</th>
          <th>Category/Subcategory/Item Name</th>
          <th>Discount Value</th>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4">Loading...</td>
          </tr>
          <tr v-else-if="discounts.length === 0">
            <td colspan="4">Data Not Found</td>
          </tr>
          <tr v-else v-for="(discount, index) in discounts" :key="discount.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ discount.discount_type }}</td>
            <td>{{ discount.discountable_name ?? 'N/A' }}</td>
            <td>{{ discount.value }}</td>
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