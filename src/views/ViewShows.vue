<script setup lang="ts">
import DisplayShow from "@/components/DisplayShow.vue";
import { serviceMedia } from "@/services/serviceMedia";
import { onMounted, ref } from "vue";
import type { Media } from "@/types/Media";

const data = ref<Media[]>();
onMounted(async () => {
    data.value = await serviceMedia.getAll();
});
</script>

<template>
    <section class="section">
        <h2>Lempisarjat</h2>
        <div class="grid grid-auto">
            <DisplayShow v-for="item in data" :show="item" />
        </div>
    </section>
</template>

<style lang="css" scoped></style>
