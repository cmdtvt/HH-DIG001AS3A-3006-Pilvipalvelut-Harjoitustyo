<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import DisplayShow from "@/components/DisplayShow.vue";
import { serviceUser } from "@/services/serviceUser";
import type { UserProfile } from "@/types/UserProfile";

import { Textarea, InputText, Button, Skeleton } from "primevue";
import { serviceUserMedia } from "@/services/serviceUserMedia";
import { serviceMedia } from "@/services/serviceMedia";
import type { Media } from "@/types/Media";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const route = useRoute();
const uid = route.params.uid as string;

const editProfileAllow = ref(false);
const editProfileDisplayName = ref<string | undefined>("");
const editProfileBio = ref<string | undefined>("");
const editProfileAvatarImage = ref<string | undefined>("");

const data = ref<UserProfile | null>(null);

onMounted(async () => {
    data.value = await serviceUser.getProfile(uid);
    editProfileAvatarImage.value = data.value?.avatarImageId;
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
            avatarImageId: editProfileAvatarImage.value,
            favoriteGenres: data.value.favoriteGenres,
            isProfilePublic: data.value.isProfilePublic,
        };

        await serviceUser.updateProfile(updatedProfile);

        //typescript causing trouble for reasining the variables os we need to make sure that data.value is not null
        if (!data.value) return;
        data.value.displayName = editProfileDisplayName.value ?? "";
        data.value.bio = editProfileBio.value ?? "";

        toast.add({
            severity: "success",
            summary: "Onnistui",
            detail: "Tallennettu",
            life: 3000,
        });
    }

    editProfileAllow.value = !editProfileAllow.value;
};

// Fetching new random profile image from randomfox api
// while the image is being fetched display Skeleton loader in the meanwhile
const loadingImage = ref(false);
const handleChangeImage = async () => {
    try {
        loadingImage.value = true;

        const response = await fetch("https://randomfox.ca/floof/");
        const fox = await response.json();
        const img = new Image();

        // There might be better way to handle this using primevue's components but im not sure
        img.onload = () => {
            editProfileAvatarImage.value = fox.image;
            loadingImage.value = false;
        };

        img.onerror = () => {
            loadingImage.value = false;
        };
        img.src = fox.image;
    } catch (error) {
        loadingImage.value = false;
    }
};

// Code for loading the user's media and displaying it
const planning = ref<Media[]>([]);
const watching = ref<Media[]>([]);
const completed = ref<Media[]>([]);
const dropped = ref<Media[]>([]);

onMounted(async () => {
    const all = await serviceUserMedia.getByUserId(uid);

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
        <div class="profile-image-wrapper">
            <Skeleton v-if="loadingImage" shape="square" size="150px" class="profile-image" />
            <img v-else :src="editProfileAvatarImage" class="profile-image" />
        </div>
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
            v-if="editProfileAllow"
            label="Hae uusi profiilikuva"
            severity="secondary"
            @click="handleChangeImage"
        />

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

.profile-image {
    width: 200px;
    height: 200px;
    /* max-width: 150px;
    max-height: 150px; */
}

.profile-image-wrapper {
    position: relative;
    display: inline-block;
}

.image-action {
    position: absolute;
    top: 10px;
    right: 10px;
}

Textarea {
    margin-top: 25px;
    width: 50%;
}
</style>
