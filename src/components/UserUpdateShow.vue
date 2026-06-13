<script setup lang="ts">
import { ref } from "vue";
import { Button, Dialog, InputNumber, Select, Textarea, Rating } from "primevue";
import type { Media } from "@/types/Media";
import { serviceUserMedia } from "@/services/serviceUserMedia";

const props = defineProps<{
    show: Media;
}>();

const visible = ref(false);

const status = ref<"Suunnittelu" | "Katsomassa" | "Katsottu" | "Keskeytetty">("Suunnittelu");
const rating = ref<number | undefined>(undefined);
const watchedEpisodes = ref<number | null>(null);
const notes = ref("");

const handleSave = async () => {
    serviceUserMedia.save({
        status: status.value,
        id: "",
        userId: "",
        mediaId: "10",
    });
};
</script>

<template>
    <Button severity="secondary" label="Lisää" @click="visible = true" />

    <Dialog v-model:visible="visible" modal :header="show.title" :style="{ width: '50rem' }">
        <div class="flex col gap-md">
            <section class="flex row">
                <img :src="show.posterImage" :alt="show.title" style="max-width: 250px" />

                <div class="info flex col">
                    <p>{{ show.type }}</p>
                    <p><strong>Kuvaus: </strong>{{ show.description }}</p>
                    <p><strong>Genret: </strong>{{ show.genres.join(", ") }}</p>

                    <p v-if="show.type === 'TV'">
                        <strong>Episodes:</strong>
                        {{ show.episodeCount }}
                    </p>
                </div>
            </section>

            <section class="flex col">
                <h3>Oma seuranta</h3>

                <div class="field">
                    <label>Status</label>

                    <Select
                        v-model="status"
                        :options="['Suunnittelu', 'Katsomassa', 'Katsottu', 'Keskeytetty']"
                    />
                </div>

                <div class="field">
                    <label>Arvosana</label>
                    <Rating v-model="rating" />
                </div>

                <div v-if="show.type === 'TV'" class="field">
                    <label>Katsottuja jaksoja</label>

                    <InputNumber
                        v-model="watchedEpisodes"
                        :min="0"
                        :max="show.episodeCount ?? 9999"
                        showButtons
                    />
                </div>

                <div class="field">
                    <label>Muistiinpanot</label>

                    <Textarea v-model="notes" rows="4" />
                </div>
            </section>
        </div>

        <template #footer>
            <Button label="Peruuta" severity="secondary" @click="visible = false" />

            <Button label="Tallenna" @click="handleSave" />
        </template>
    </Dialog>
</template>

<style scoped>
.info {
    margin-left: 25px;
}
</style>
