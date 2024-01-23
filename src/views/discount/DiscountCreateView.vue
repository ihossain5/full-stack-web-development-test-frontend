<script setup>
import router from "@/router";
import api from "@/services/api";
import { onMounted, ref } from 'vue';

const loading = ref(false);
const discountValue = ref('');
const selectedDiscountType = ref('All Menu Discount');
const discountable_id = ref(null);
const categories = ref([]);
const subcategories = ref([]);
const items = ref([]);


const fetchData = async () => {
  try {
    const categoriesResponse = await api.get("/category/all");
    const subcategoriesResponse = await api.get("/subcategory/all");
    const itemsResponse = await api.get("/item/all");

    categories.value = categoriesResponse.data.data;
    subcategories.value = subcategoriesResponse.data.data;
    items.value = itemsResponse.data.data;
  } catch (e) {
    alert("Error fetching data");
  }
};

onMounted(() => {
  fetchData();
});

const addDiscount = async () => {

  try {
    loading.value = true;
    await api.post("/discount/store", { value: discountValue.value, discountable_id:discountable_id.value, discount_type:selectedDiscountType.value});


  } catch (error) {
    alert("Something went wrong");
  } finally {
    loading.value = false;
    router.push('/discount');
  }
};
</script>

<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <div class="card-title">Create Discount</div>
      <router-link to="/discount" class="btn btn-dark"
        >Back</router-link
      >
    </div>
    <div class="card-body">
        <form @submit.prevent="addDiscount">
        <div class="mb-3">
        <label for="discountType" class="form-label">Select Discount Type:</label>
        <select v-model="selectedDiscountType" id="discountType" class="form-select" required>
          <option value="All Menu Discount">All Menu Discount</option>
          <option value="Category">Category Discount</option>
          <option value="SubCategory">SubCategory Discount</option>
          <option value="Item">Item Discount</option>
        </select>
      </div>


    <div v-if="selectedDiscountType === 'Category'" class="mb-3">
      <label for="categorySelect" class="form-label">Select Category:</label>
      <select v-model="discountable_id" id="categorySelect" class="form-select" required>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>


    <div v-if="selectedDiscountType === 'SubCategory'" class="mb-3">
      <label for="subcategorySelect" class="form-label">Select Subcategory:</label>
      <select v-model="discountable_id" id="subcategorySelect" class="form-select" required>
        <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.name }}</option>
      </select>
    </div>


    <div v-if="selectedDiscountType === 'Item'" class="mb-3">
      <label for="itemSelect" class="form-label">Select Item:</label>
      <select v-model="discountable_id" id="itemSelect" class="form-select" required>
        <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </div>

    <div class="mb-3">
          <label for="discountValue" class="form-label"
            >Discount Value:</label
          >
          <input
            type="number"
            id="discountValue"
            v-model="discountValue"
            class="form-control"
            required
          />
        </div>

        <button type="submit" :disabled="loading" class="btn btn-success">Add Discount</button>
      </form>
    </div>
  </div>
</template>