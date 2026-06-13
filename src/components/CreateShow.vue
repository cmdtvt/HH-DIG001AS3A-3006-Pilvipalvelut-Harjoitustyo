<script setup lang="ts">
import { computed, ref } from "vue";
import { Button, Dialog, InputText, Textarea, Select, InputNumber } from "primevue";

import { serviceMedia } from "@/services/serviceMedia";
import type { Media } from "@/types/Media";

const visible = ref(false);

const title = ref("");
const description = ref("");
const type = ref<"Movie" | "TV">("TV");
const genres = ref("");
const episodeCount = ref<number | null>(null);
const posterImage = ref("");

const handleCreate = async () => {
    try {
        const media: Omit<Media, "createdAt" | "updatedAt"> = {
            title: title.value,
            description: description.value,
            type: type.value,

            genres: genres.value
                .split(",")
                .map((genre) => genre.trim())
                .filter(Boolean),

            ...(type.value === "TV" ? { episodeCount: episodeCount.value ?? 0 } : {}),

            posterImage: posterImage.value,
        };

        serviceMedia.create(media);

        title.value = "";
        description.value = "";
        type.value = "TV";
        genres.value = "";
        episodeCount.value = null;
        posterImage.value = "";

        visible.value = false;
    } catch (error) {
        alert("creating fdailed");
    }
};

// using coputed here which automatically re calculates itself depending on the return values inside
// this basically checks that all fields are set in the create new show / media form.
const isValid = computed(() => {
    return (
        title.value.trim().length > 0 &&
        description.value.trim().length > 0 &&
        genres.value.trim().length > 0 &&
        posterImage.value.trim().length > 0 &&
        (type.value === "Movie" || (type.value === "TV" && episodeCount.value != null))
    );
});
</script>

<template>
    <Button label="Lisää sarja" icon="pi pi-plus" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="Lisää media" :style="{ width: '40rem' }">
        <div class="form flex col">
            <div class="flex col">
                <label>Nimi*</label>
                <InputText v-model="title" fluid :invalid="title.trim().length === 0" />
            </div>

            <div class="flex col">
                <label>Kuvaus*</label>
                <Textarea
                    v-model="description"
                    rows="4"
                    fluid
                    :invalid="description.trim().length === 0"
                />
            </div>

            <div class="flex col">
                <label>Tyyppi*</label>
                <Select
                    v-model="type"
                    :options="['Movie', 'TV']"
                    :invalid="type.trim().length === 0"
                />
            </div>

            <div class="flex col">
                <label>Genret*</label>
                <InputText
                    v-model="genres"
                    placeholder="Drama, Comedy, Action"
                    fluid
                    :invalid="genres.trim().length === 0"
                />
            </div>

            <div class="flex col">
                <label>Jaksojen määrä*</label>
                <InputNumber
                    v-model="episodeCount"
                    :min="1"
                    fluid
                    :invalid="episodeCount == null"
                />
            </div>

            <div class="flex col">
                <label>Poster Kuva*</label>
                <InputText v-model="posterImage" fluid :invalid="posterImage.trim().length === 0" />
            </div>
        </div>

        <template #footer>
            <Button label="Peruuta" severity="secondary" @click="visible = false" />

            <Button label="Tallenna" :disabled="!isValid" @click="handleCreate" />
        </template>
    </Dialog>
</template>

<style scoped></style>
