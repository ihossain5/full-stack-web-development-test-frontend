import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/category/CategoryView.vue";
import CategoryCreateView from "../views/category/CategoryCreateView.vue";
import SubCategoryView from "../views/sub-category/SubCategoryView.vue";
import SubCategoryCreateView from "../views/sub-category/SubCategoryCreateView.vue";
import ItemView from "../views/item/ItemView.vue";
import ItemCreateView from "../views/item/ItemCreateView.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: HomeView,
        }, {
            path: "/category",
            name: "category",
            component: CategoryView,
        },
        {
            path: "/category-create",
            name: "category-create",
            component: CategoryCreateView,
        },
        {
            path: "/sub-category",
            name: "sub-category",
            component: SubCategoryView,
        },
        {
            path: "/sub-category/create",
            name: "sub-category-create",
            component: SubCategoryCreateView,
        },
        {
            path: "/item",
            name: "item",
            component: ItemView,
        },
        {
            path: "/item/create",
            name: "item-create",
            component: ItemCreateView,
        },

    ],
});

export default router;