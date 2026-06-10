<script setup lang="ts">
import { ref, computed } from "vue";
import { DataTable, Column, InputText } from "primevue";
import type { User } from "@/types/User";



const users = ref<User[]>([
    {
        id: "",
        username: "teppo testi",
        email: "teppo.testi@example.com",
        role: "Admin",
        profileId: "0"
    },
]);

/*We can return this to datatable so we can filter content directly from the table*/
const search = ref("");
const filtered = computed(() => {
    const term = search.value.toLowerCase();

    /*We open each user data and search all "rows" from them */
    /*If matching string is found from the "row" we return True so it's included in the filtered */
    return users.value.filter(
        (user) =>
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term) ||
            user.role.toLowerCase().includes(term),
    );
});
</script>

<template>
    <section class="section surface">
        <div class="flex row between align-center gap-md section-header">
            <h2>Käyttäjät</h2>

            <InputText v-model="search" placeholder="Search users..." />
        </div>

        <DataTable :value="filtered" paginator :rows="25" responsiveLayout="scroll">
            <Column field="id" header="ID" sortable />
            <Column field="username" header="Username" sortable />
            <Column field="email" header="Email" sortable />
            <Column field="role" header="Role" sortable />
        </DataTable>
    </section>
    <section class="section surface"></section>
    <section class="section surface"></section>
    <section class="section surface"></section>
    <section class="section surface"></section>
    <section class="section surface"></section>
</template>

<style scoped>
.section-header {
    margin-bottom: 1rem;
}

h2 {
    margin: 0;
}
</style>
