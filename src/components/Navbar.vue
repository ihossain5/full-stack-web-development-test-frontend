<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (targetRoute) => {
  return route.path === targetRoute;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Menu</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
        <router-link to="/category" class="nav-link" :class="{ 'active': isActive('/category') }" >Category</router-link>
        <router-link to="/sub-category" class="nav-link" :class="{ 'active': isActive('/sub-category') }">Sub Category</router-link>
        <router-link to="/item" class="nav-link" :class="{ 'active': isActive('/item') }">Item</router-link>
        <router-link to="/discount" class="nav-link" :class="{ 'active': isActive('/discount') }">Discount</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>