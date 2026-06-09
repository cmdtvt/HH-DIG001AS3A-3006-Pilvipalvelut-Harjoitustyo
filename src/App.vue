<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
</script>

<template>
    <header>
        <Navigation></Navigation>
    </header>
    <div class="page">
        <RouterView />
    </div>
</template>
