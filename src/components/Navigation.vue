<script setup lang="ts">
import { Button } from "primevue";
import router from "@/router";
import { hasAuth } from "@/services/hasAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

const { user } = hasAuth();

const handleLogout = async () => {
    try {
        await signOut(auth);
        await router.push("/");
    } catch (error) {
        alert("error");
    }
};
</script>

<template>
    <div class="wrapper">
        <h1>TelkkuTutka</h1>

        <nav class="nav-links">
            <RouterLink to="/">Koti</RouterLink>
            <RouterLink to="/browse">Selaa</RouterLink>
            <RouterLink to="/AiringToday">Ohjelma</RouterLink>

            <RouterLink v-if="user" :to="`/profile/${user.uid}`">Profiili</RouterLink>
            <Button v-if="user" @click="handleLogout">Kirjaudu ulos</Button>

            <RouterLink v-if="!user" to="/login">Kirjaudu tai rekisteröidy</RouterLink>
            <RouterLink to="/admin">Admin</RouterLink>
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
</style>
