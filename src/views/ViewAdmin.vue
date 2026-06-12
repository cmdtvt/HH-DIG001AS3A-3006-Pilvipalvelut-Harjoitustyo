<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { DataTable, Column, InputText } from "primevue";
import type { User } from "@/types/User";
import type { Media } from "@/types/Media";
import { serviceUser } from "@/services/serviceUser";
import { serviceMedia } from "@/services/serviceMedia";
import CreateShow from "@/components/CreateShow.vue";

const users = ref<User[]>([]);
const shows = ref<Media[]>([]);

// We need to do this in onMounted ebcause we use async in the serviceUser class
onMounted(async () => {
    users.value = await serviceUser.getAll();
    shows.value = await serviceMedia.getAll();
});

/*We can return this to datatable so we can filter content directly from the table*/
const searchUser = ref("");
const filteredUsers = computed(() => {
    const term = searchUser.value.toLowerCase();

    /*We open each user data and search all "rows" from them */
    /*If matching string is found from the "row" we return True so it's included in the filtered */
    return users.value.filter(
        (user) =>
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term),
    );
});

const searchShow = ref("");
const filteredShows = computed(() => {
    const term = searchShow.value.toLowerCase();

    /*We open each user data and search all "rows" from them */
    /*If matching string is found from the "row" we return True so it's included in the filtered */
    return shows.value.filter(
        (show) =>
            show.title.toLowerCase().includes(term) ||
            show.description.toLowerCase().includes(term) ||
            show.type.toLowerCase().includes(term),
    );
});
</script>

<template>
    <section class="section surface">
        <div class="flex row between align-center gap-md section-header">
            <h2>Käyttäjät</h2>
            <InputText v-model="searchUser" placeholder="Etsi käyttäjä" />
        </div>

        <DataTable :value="filteredUsers" paginator :rows="25" responsiveLayout="scroll">
            <Column field="id" header="ID" sortable />
            <Column field="username" header="Username" sortable />
            <Column field="email" header="Email" sortable />
            <Column field="role" header="Role" sortable />
        </DataTable>
    </section>
    <section class="section surface">
        <CreateShow></CreateShow>
        <div class="flex row between align-center gap-md section-header">
            <h2>Sarjat</h2>
            <InputText v-model="searchShow" placeholder="Etsi sarja" />
        </div>

        <DataTable :value="filteredShows" paginator :rows="25" responsiveLayout="scroll">
            <Column field="id" header="ID" sortable />
            <Column field="name" header="Sarja" sortable />
            <Column field="episodes" header="Jaksot" sortable />
            <Column field="Tyyppi" header="jaksot" sortable />
        </DataTable>
    </section>
    <section class="section surface"></section>
    <section class="section surface"></section>
    <section class="section surface"></section>
    <section class="section surface"></section>
</template>

<style scoped></style>
