<script setup lang="ts"></script>

<template>
    <div class="wrapper">
        <h1>TelkkuTutka</h1>

        <nav class="nav-links">
            <RouterLink to="/">Koti</RouterLink>
            <RouterLink to="/Profile">Profiili</RouterLink>
            <RouterLink to="/Register">Register</RouterLink>
            <!-- <RouterLink to="/List">List</RouterLink> -->
            <RouterLink to="/Browse">Selaa</RouterLink>
            <RouterLink to="/Admin">Admin</RouterLink>
            <RouterLink to="/AiringToday">Ohjelma</RouterLink>
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
