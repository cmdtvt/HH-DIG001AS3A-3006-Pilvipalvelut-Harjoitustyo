<script setup lang="ts">
import { Button } from "primevue";
import router from "@/router";
import { hasAuth } from "@/services/hasAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const { user } = hasAuth();

const handleLogout = async () => {
    try {
        await signOut(auth);
        await router.push("/");

        toast.add({
            severity: "success",
            summary: "Kirjauduit ulos",
            detail: "Kiitos käynnistä",
            life: 3000,
        });
    } catch (error) {
        toast.add({
            severity: "err",
            summary: "Epäonnistui",
            detail: "Tapahtui virhe",
            life: 3000,
        });
    }
};
</script>

<template>
    <div class="wrapper">
        <h1>TelkkuTutka</h1>

        <nav class="nav-links">
            <RouterLink to="/">Koti</RouterLink>
            <RouterLink to="/browse">Selaa</RouterLink>
            <!-- <RouterLink to="/AiringToday">Ohjelma</RouterLink> -->

            <RouterLink v-if="user" :to="`/profile/${user.uid}`">Profiili</RouterLink>
            <button v-if="user" @click="handleLogout">Kirjaudu ulos</button>

            <RouterLink v-if="!user" to="/login">Kirjaudu tai rekisteröidy</RouterLink>
            <!-- <RouterLink to="/admin">Admin</RouterLink> -->
        </nav>
    </div>
</template>

<style lang="css" scoped>
.wrapper {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;

    background-color: var(--surface-bg);
    min-height: 75px;
    padding: 0 25px;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

/* Override for default link styling */
/* Also using router-link-active we can target the selected link from vue router */
.nav-links a {
    color: white;
    text-decoration: none;
}

.nav-links a:visited {
    color: white;
}

.nav-links a:hover {
    color: #d0d0d0;
}

.nav-links a.router-link-active {
    border-bottom: 2px solid white;
    font-weight: bold;
}

button {
    background: none;
    border: none;
    color: white;
    font: inherit;
    cursor: pointer;
    padding: 0;
}

button:hover {
    color: #d0d0d0;
}

button.router-link-active {
    border-bottom: 2px solid white;
    font-weight: bold;
}

@media (max-width: 768px) {
    .wrapper {
        grid-template-columns: 1fr;
        justify-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
    }

    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
