<script setup lang="ts"></script>

<template>

        <div class="wrapper flex row between">
        <h1>TelkkuTutka</h1>
            <nav class="flex row align-center">
                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/Profile">Profile</RouterLink> |
                <RouterLink to="/List">List</RouterLink> |
                <RouterLink to="/Browse">Browse</RouterLink> |
                <RouterLink to="/AiringToday">Airing Today</RouterLink> |
            </nav>
        </div>

</template>

<style lang="css" scoped>

.wrapper {
    background-color: var(--surface-bg);
    min-height: 75px;
    color: white;
    padding-left: 25px;
    padding-right: 25px;
}
</style>
