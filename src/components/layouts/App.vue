
<script setup>
import Navbar from "../Navbar.vue";
</script>

<template>
  <Navbar></Navbar>
 <div class="container">
    <div class="row">
        <div class="col-md-12 p-5 mt-5">
            <slot></slot>
        </div>
    </div>
 </div>
</template>