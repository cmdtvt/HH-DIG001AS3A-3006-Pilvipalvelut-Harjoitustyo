<script setup lang="ts">
import { computed, ref } from "vue";
import { Skeleton } from "primevue";
import type { Media } from "@/types/Media";
import UserUpdateShow from "./UserUpdateShow.vue";
import { hasAuth } from "@/services/hasAuth";
const { user } = hasAuth();

const props = defineProps<{
    show: Media;
}>();

const imageLoaded = ref(false);

const fallbackImage = "https://placehold.co/250";
const imageSrc = computed(() =>
    props.show.posterImage?.trim() ? props.show.posterImage : fallbackImage,
);
</script>

<template>
    <div class="CompDisplayShow">
        <div class="image-container">
            <Skeleton v-if="!imageLoaded" width="250px" height="250px" />

            <img
                :src="imageSrc"
                alt="Elokuvan tai sarjan posteri"
                :style="{ display: imageLoaded ? 'block' : 'none' }"
                @load="imageLoaded = true"
                @error="imageLoaded = true"
            />

            <p class="overlay-title">
                {{ props.show.title }}
            </p>

            <div class="overlay-episode flex row between">
                <p v-if="props.show.type === 'TV'">{{ props.show.episodeCount ?? 0 }} Jaksoa</p>
                <UserUpdateShow :show="props.show" v-if="user"></UserUpdateShow>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.CompDisplayShow {
    background-color: var(--surface-bg);
    width: 250px;
    height: 250px;
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
