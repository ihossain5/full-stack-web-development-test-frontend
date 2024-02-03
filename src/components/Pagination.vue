<template>
  <nav v-if="totalPages > 1">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          @click.prevent="changePage(currentPage - 1)"
          href="#"
          tabindex="-1"
          aria-disabled="true"
          >Previous</a
        >
      </li>

      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" @click.prevent="changePage(page)" href="#">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click.prevent="changePage(currentPage + 1)"
          href="#"
          >Next</a
        >
      </li>
    </ul>
  </nav>
</template>
  
  <script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    changePage: {
      type: Function,
      required: true,
    },
  },
};
</script>
  
    