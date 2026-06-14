<script setup lang="ts">
import { ref } from "vue";
import { InputText, Password, Button } from "primevue";
import { serviceUser } from "@/services/serviceUser";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import router from "@/router";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmedPassword = ref("");

const handleRegister = async () => {
    if (password.value == confirmedPassword.value) {
        serviceUser.register({
            username: username.value,
            email: email.value,
            password: password.value,
            role: "User",
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

        console.log("Logged in:", credential.user);

        await router.push(`/profile/${credential.user.uid}`);
    } catch (error) {
        alert("invaluid password");
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

                <Button type="button" label="Register" class="w-full" @click="handleRegister" />
            </form>
        </section>
    </div>
</template>

<style lang="css" scoped>
section {
    width: 400px;
}
</style>
