<script setup lang="ts">
import { ref } from "vue";
import { InputText, Password, Button } from "primevue";
import { serviceUser } from "@/services/serviceUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import router from "@/router";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmedPassword = ref("");

const handleRegister = async () => {
    if (password.value !== confirmedPassword.value) {
        toast.add({
            severity: "warn",
            summary: "Virhe",
            detail: "Salasanat eivät täsmää",
            life: 3000,
        });
        return;
    }

    try {
        const user = await serviceUser.register({
            username: username.value,
            email: email.value,
            password: password.value,
            role: "User",
        });

        toast.add({
            severity: "success",
            summary: "Onnistui",
            detail: "Tili luotu",
            life: 3000,
        });

        await router.push(`/profile/${user.id}`);

        // username.value = "";
        // email.value = "";
        // password.value = "";
        // confirmedPassword.value = "";
    } catch (error) {
        console.error(error);

        toast.add({
            severity: "error",
            summary: "Rekisteröinti epäonnistui",
            detail: "Tilin luonti epäonnistui",
            life: 5000,
        });
    }
};

//Login logic

const loginEmail = ref("");
const loginPassword = ref("");

const handleLogin = async () => {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            loginEmail.value,
            loginPassword.value,
        );

        toast.add({
            severity: "success",
            summary: "Kirjautuminen onnistui",
            detail: `Tervetuloa ${credential.user.email}`,
            life: 3000,
        });

        await router.push(`/profile/${credential.user.uid}`);
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Kirjautuminen epäonnistui",
            detail: "Virheellinen sähköposti tai salasana",
            life: 4000,
        });
    }
};
</script>

<template>
    <div class="flex row gap-lg center align-stretch">
        <section class="section surface">
            <h3>Kirjaudu</h3>

            <form class="flex col gap-md">
                <div class="flex col gap-xs">
                    <label for="loginEmail">Email</label>
                    <InputText
                        id="loginEmail"
                        v-model="loginEmail"
                        type="email"
                        placeholder="Enter email"
                        fluid
                    />
                </div>

                <div class="flex col gap-xs">
                    <label for="loginPassword">Password</label>
                    <Password
                        id="loginPassword"
                        v-model="loginPassword"
                        :feedback="false"
                        placeholder="Enter password"
                        toggleMask
                        fluid
                    />
                </div>

                <Button type="button" label="Kirjaudu" class="w-full" @click="handleLogin" />
            </form>
        </section>

        <div class="flex center">
            <p>tai</p>
        </div>

        <section class="section surface">
            <h3>Rekisteröidy</h3>

            <form class="flex col gap-md">
                <div class="flex col gap-xs">
                    <label for="username">Username</label>
                    <InputText
                        id="username"
                        v-model="username"
                        placeholder="Enter username"
                        class="w-full"
                    />
                </div>

                <div class="flex col gap-xs">
                    <label for="email">Email</label>
                    <InputText
                        id="email"
                        v-model="email"
                        type="email"
                        placeholder="Enter email"
                        class="w-full"
                    />
                </div>

                <div class="flex col gap-xs">
                    <label for="password">Password</label>
                    <Password
                        id="password"
                        v-model="password"
                        :feedback="false"
                        placeholder="Enter password"
                        toggleMask
                        fluid
                    />
                </div>

                <div class="flex col gap-xs">
                    <label for="confirmedPassword">Confirm Password</label>
                    <Password
                        id="confirmedPassword"
                        v-model="confirmedPassword"
                        :feedback="false"
                        placeholder="Confirm password"
                        toggleMask
                        fluid
                    />
                </div>

                <Button type="button" label="Rekisteröidy" class="w-full" @click="handleRegister" />
            </form>
        </section>
    </div>
</template>

<style lang="css" scoped>
section {
    width: 400px;
}
</style>
