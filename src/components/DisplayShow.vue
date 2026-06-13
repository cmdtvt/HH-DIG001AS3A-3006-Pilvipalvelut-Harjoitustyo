<script setup lang="ts">
import { Button } from "primevue";
import type { Media } from "@/types/Media";
import { computed } from "vue";

const props = defineProps<{
    show: Media;
}>();

//FIXME: this just does not work at all
const fallbackImage = "https://placehold.co/250";
const imageSrc = computed(() =>
    props.show.posterImage?.trim() ? props.show.posterImage : fallbackImage,
);
</script>

<template>
    <div class="CompDisplayShow">
        <div class="image-container">
            <img :src="imageSrc" alt="poster" />

            <p class="overlay-title">
                {{ props.show.title }}
            </p>

            <div v-if="props.show.type === 'TV'" class="overlay-episode">
                {{ props.show.episodeCount ?? 0 }} Episodes
            </div>
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
    max-height: 250px;
    overflow-y: hidden;
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
