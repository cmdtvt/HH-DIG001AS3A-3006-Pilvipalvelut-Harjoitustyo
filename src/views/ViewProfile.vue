<script setup lang="ts">
import DisplayShow from "@/components/DisplayShow.vue";
</script>

<template>
    <section class="banner">
        <img src="https://placehold.co/150" class="profile-image" />
    </section>
    <section class="section surface">
        <p>Käyttäjän: XXXX profiili</p>
    </section>

    <section class="section">
        <h2>Lempisarjat</h2>
        <div class="grid grid-auto">
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
        </div>
    </section>

    <section class="section">
        <h2>Katsotut sarjat</h2>
        <div class="grid grid-auto">
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
            <DisplayShow />
        </div>
    </section>
</template>

<style lang="css" scoped>
.banner {
    min-height: 350px;
    background: #2a7b9b;
    background: linear-gradient(
        0deg,
        rgba(42, 123, 155, 1) 0%,
        rgba(87, 199, 133, 1) 50%,
        rgba(237, 221, 83, 1) 100%
    );
}
</style>
