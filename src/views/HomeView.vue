<script setup>
import api from "@/services/api";
import { onMounted, ref } from "vue";

const menus = ref({});
const loading = ref(true);

const fetchData = async () => {
  try {
    const response = await api.get("/menu");
    menus.value = response.data.data;
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
<!-- Category Table -->
<h2>Category</h2>
<table class="table table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Discount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in menus" :key="category.id">
        <td>{{ category.name }}</td>
        <td>{{ category.discount }}</td>
      </tr>

      <!-- Subcategory Table -->
      <tr v-for="category in menus" :key="category.id">
        <td colspan="2">
          <h3>Subcategories</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subcategory in category.subcategories" :key="subcategory.id">
                <td>{{ subcategory.name }}</td>
                <td>{{ subcategory.discount }}</td>
              </tr>

              <!-- Item Table -->
              <tr v-for="subcategory in category.subcategories" :key="subcategory.id">
                <td colspan="2">
                  <h4>Items</h4>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in subcategory.items" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.discount }}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <!-- End of Item Table -->
            </tbody>
          </table>
        </td>
      </tr>
      <!-- End of Subcategory Table -->

    </tbody>
  </table>
</template>

