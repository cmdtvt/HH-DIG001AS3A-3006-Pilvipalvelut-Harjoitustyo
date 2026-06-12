<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import DisplayShow from "@/components/DisplayShow.vue";
import { serviceUser } from "@/services/serviceUser";
import type { UserProfile } from "@/types/UserProfile";

import { Textarea, InputText, Button } from "primevue";
import { handle } from "@primeuix/themes/aura/imagecompare";
import { serverTimestamp } from "firebase/firestore";

const route = useRoute();
const uid = route.params.uid as string;

const editProfileAllow = ref(true);
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
        const temp: Omit<UserProfile, 'createdAt' | 'updatedAt'> = {
            id: "",
            userId: "",
            displayName: "",
            favoriteGenres: [],
            isProfilePublic: false,

        }

        serviceUser.updateProfile(temp)
        alert("saving")
    }

    editProfileAllow.value = !editProfileAllow.value;
};
</script>

<template>
    <section class="banner">
        <!-- <img src="https://placehold.co/150" class="profile-image" /> -->
        <img :src="data?.avatarImageId" class="profile-image" />
        <Button
            :label="editProfileAllow ? 'Tallenna' : 'Muokkaa'"
            :severity="editProfileAllow ? 'primary' : 'secondary'"
            @click="handleEditToggle"
        />
    </section>
    <section class="section surface" v-if="!editProfileAllow">
        <h3>{{ data?.displayName }}</h3>
        <p>{{ data?.bio }}</p>
    </section>

    <section class="section surface" v-if="editProfileAllow">
        <InputText :value="editProfileDisplayName"></InputText>
        <Textarea :value="editProfileBio"></Textarea>
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

img {
    max-width: 150px;
    max-height: 150px;
}
</style>
