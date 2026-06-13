<script setup lang="ts">
import DisplayShow from "@/components/DisplayShow.vue";
import { serviceMedia } from "@/services/serviceMedia";
import { onMounted, ref } from "vue";
import type { Media } from "@/types/Media";

import { hasAuth } from "@/services/hasAuth";

const { user } = hasAuth();

const data = ref<Media[]>();
onMounted(async () => {
    data.value = await serviceMedia.getAll();
});
</script>

<template>
    <section class="section surface" v-if="!user">
        <h2>Kirjaudu sisään</h2>
        <p>Kirjaudu sisään tai luo tili jotta pystyt pitämään kirjaa ohjelmistasi!</p>
    </section>
    <section class="section">
        <h2>Uudet sarjat</h2>
        <div class="grid grid-auto">
            <DisplayShow v-for="item in data" :show="item" />
        </div>
    </section>
</template>

<style lang="css" scoped></style>
