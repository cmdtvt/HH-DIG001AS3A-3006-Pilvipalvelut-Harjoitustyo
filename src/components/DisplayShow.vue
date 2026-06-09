<script setup lang="ts">
import { Button } from "primevue";

interface Props {
    id: number;
    title: string;
    image: string;
    currentEpisodes: number;
    totalEpisodes: number;
}

const props = withDefaults(defineProps<Props>(), {
    id: 0,
    title: "Title not set",
    image: "https://placehold.co/250",
    currentEpisodes: 5,
    totalEpisodes: 12,
});
</script>

<template>
    <div class="CompDisplayShow">
        <div class="image-container">
            <img :src="image" />

            <p class="overlay-title">
                {{ title }}
            </p>

            <div class="overlay-episode">{{ currentEpisodes }} / {{ totalEpisodes }} Episodes</div>
        </div>

        <Button severity="secondary" label="Open" />
    </div>
</template>

<style lang="css" scoped>
.CompDisplayShow {
    background-color: var(--surface-bg);
    max-width: 250px;
}

.image-container {
    position: relative;
}

.image-container img {
    display: block;
    width: 100%;
}

.overlay-title {
    position: absolute;
    top: 0;
    left: 0;

    margin: 0;
    padding: 0.5rem 0.75rem;

    color: white;
    background: rgba(0, 0, 0, 0.7);
}

/* Bottom episode info */
.overlay-episode {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 0.75rem;

    color: white;

    background: rgba(0, 0, 0, 0.7);
}
</style>
