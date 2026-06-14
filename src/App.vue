<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import { Toast } from "primevue";
</script>

<template>
    <Toast></Toast>
    <header>
        <Navigation></Navigation>
    </header>
    <div class="page">
        <RouterView />
    </div>
</template>
