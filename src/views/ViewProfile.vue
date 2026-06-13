<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import DisplayShow from "@/components/DisplayShow.vue";
import { serviceUser } from "@/services/serviceUser";
import type { UserProfile } from "@/types/UserProfile";

import { Textarea, InputText, Button } from "primevue";
import { serviceUserMedia } from "@/services/serviceUserMedia";
import { serviceMedia } from "@/services/serviceMedia";
import type { Media } from "@/types/Media";

const route = useRoute();
const uid = route.params.uid as string;

const editProfileAllow = ref(false);
const editProfileDisplayName = ref<string | undefined>("");
const editProfileBio = ref<string | undefined>("");

const data = ref<UserProfile | null>(null);

onMounted(async () => {
    data.value = await serviceUser.getProfile(uid);
    editProfileDisplayName.value = data.value?.displayName;
    editProfileBio.value = data.value?.bio;
});

const handleEditToggle = async () => {
    if (editProfileAllow.value) {
        //typescript complains otherwise
        if (!data.value) return;

        const updatedProfile: Omit<UserProfile, "createdAt" | "updatedAt"> = {
            id: data.value.id,
            userId: data.value.userId,

            displayName: editProfileDisplayName.value ?? "",
            bio: editProfileBio.value ?? data.value.bio,
            avatarImageId: data.value.avatarImageId,
            favoriteGenres: data.value.favoriteGenres,
            isProfilePublic: data.value.isProfilePublic,
        };

        await serviceUser.updateProfile(updatedProfile);

        //typescript causing trouble for reasining the variables os we need to make sure that data.value is not null
        if (!data.value) return;
        data.value.displayName = editProfileDisplayName.value ?? "";
        data.value.bio = editProfileBio.value ?? "";

        alert("saving");
    }

    editProfileAllow.value = !editProfileAllow.value;
};

const planning = ref<Media[]>([]);
const watching = ref<Media[]>([]);
const completed = ref<Media[]>([]);
const dropped = ref<Media[]>([]);

const shows = ref<Media[]>([]);
onMounted(async () => {
    const all = await serviceUserMedia.getAll();

    // Split the shows by their status
    const ids_planning = all.filter((x) => x.status === "Suunnittelu");
    const ids_watching = all.filter((x) => x.status === "Katsomassa");
    const ids_completed = all.filter((x) => x.status === "Katsottu");
    const ids_dropped = all.filter((x) => x.status === "Keskeytetty");

    // Tyhse need to be ran in promise.all so we dont get multiple promise responses.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    // after that in filtering because null can be returned instead of Media well just check that
    planning.value = (
        await Promise.all(ids_planning.map((x) => serviceMedia.getById(x.mediaId)))
    ).filter((m): m is Media => m !== null);

    watching.value = (
        await Promise.all(ids_watching.map((x) => serviceMedia.getById(x.mediaId)))
    ).filter((m): m is Media => m !== null);

    completed.value = (
        await Promise.all(ids_completed.map((x) => serviceMedia.getById(x.mediaId)))
    ).filter((m): m is Media => m !== null);

    dropped.value = (
        await Promise.all(ids_dropped.map((x) => serviceMedia.getById(x.mediaId)))
    ).filter((m): m is Media => m !== null);
});
</script>

<template>
    <section class="banner">
        <!-- <img src="https://placehold.co/150" class="profile-image" /> -->
        <img :src="data?.avatarImageId" class="profile-image" />
    </section>
    <section class="section surface">
        <div>
            <template v-if="!editProfileAllow">
                <h3>{{ data?.displayName }}</h3>
                <p>{{ data?.bio }}</p>
            </template>

            <template v-if="editProfileAllow">
                <InputText v-model="editProfileDisplayName"></InputText><br />
                <Textarea v-model="editProfileBio" rows="5"></Textarea>
            </template>
        </div>

        <Button
            :label="editProfileAllow ? 'Tallenna' : 'Muokkaa'"
            :severity="editProfileAllow ? 'primary' : 'secondary'"
            @click="handleEditToggle"
        />
    </section>

    <section class="section">
        <h2>Katsomassa</h2>
        <div class="grid grid-auto" v-if="watching.length > 0">
            <DisplayShow v-for="item in watching" :show="item" />
        </div>
        <p v-else>Ei sarjoja</p>
    </section>

    <section class="section">
        <h2>Katsottu</h2>
        <div class="grid grid-auto" v-if="completed.length > 0">
            <DisplayShow v-for="item in completed" :show="item" />
        </div>
        <p v-else>Ei sarjoja</p>
    </section>

    <section class="section">
        <h2>Suunnittelemassa</h2>
        <div class="grid grid-auto" v-if="planning.length > 0">
            <DisplayShow v-for="item in planning" :show="item" />
        </div>
        <p v-else>Ei sarjoja</p>
    </section>

    <section class="section">
        <h2>Pudotettu</h2>
        <div class="grid grid-auto" v-if="dropped.length > 0">
            <DisplayShow v-for="item in dropped" :show="item" />
        </div>
        <p v-else>Ei sarjoja</p>
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

img {
    max-width: 150px;
    max-height: 150px;
}

Textarea {
    margin-top: 25px;
    width: 50%;
}
</style>
