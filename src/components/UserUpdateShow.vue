<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button, Dialog, InputNumber, Select, Textarea, Rating } from "primevue";
import type { Media } from "@/types/Media";
import { serviceUserMedia } from "@/services/serviceUserMedia";
import type { UserMedia } from "@/types/UserMedia";

import { hasAuth } from "@/services/hasAuth";
const { user } = hasAuth();

const props = defineProps<{
    show: Media;
}>();


const visible = ref(false);
const status = ref<"Suunnittelu" | "Katsomassa" | "Katsottu" | "Keskeytetty">("Suunnittelu");
const rating = ref<number | undefined>(undefined);
const watchedEpisodes = ref<number | null>(null);
const notes = ref("");
    
const data = ref<UserMedia | null>();
onMounted(async () => {
    if (!user.value) return;

    data.value = await serviceUserMedia.getById(
        user.value.uid,
        props.show.id
    );

    if (!data.value) return;

    status.value = data.value.status;
    rating.value = data.value.rating;
    watchedEpisodes.value = data.value.watchedEpisodes ?? null;
    notes.value = data.value.notes ?? "";
});

const handleSave = async () => {
    if (!user.value) return;

    await serviceUserMedia.save({
        id: `${user.value.uid}_${props.show.id}`,
        userId: user.value.uid,
        mediaId: props.show.id,

        status: status.value,

        rating: rating.value,
        watchedEpisodes: watchedEpisodes.value ?? undefined,
        notes: notes.value || undefined,
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

            <section>
                <h3>Oma seuranta</h3>

                <div class="grid grid-2 gap-md">
                    <div class="flex col gap-xs">
                        <label>Status</label>

                        <Select
                            v-model="status"
                            :options="['Suunnittelu', 'Katsomassa', 'Katsottu', 'Keskeytetty']"
                        />
                    </div>

                    <div class="flex col gap-xs">
                        <label>Katsottuja jaksoja</label>

                        <InputNumber
                            v-model="watchedEpisodes"
                            :min="0"
                            :max="show.episodeCount ?? 9999"
                            showButtons
                        />
                    </div>

                    <div class="flex col gap-xs">
                        <label>Muistiinpanot</label>

                        <Textarea v-model="notes" rows="4" />
                    </div>

                   <div class="flex col gap-xs">
                        <label>Arvosana</label>

                        <Rating v-model="rating" />
                    </div>
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
