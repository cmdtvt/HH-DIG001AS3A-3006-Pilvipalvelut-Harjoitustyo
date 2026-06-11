<script setup lang="ts">
import { ref } from "vue";
import { InputText, Password, Button } from "primevue";
import { serviceUser } from "@/services/serviceUser";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmedPassword = ref("");

const handleRegister = () => {
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

const handleLogin = () => {
    alert("login");
};
</script>

<template>
    <section class="section surface">
        <h3>Kirjaudu</h3>

        <form class="flex col gap-md">
            <div class="field">
                <label for="loginEmail">Email</label>
                <InputText
                    id="loginEmail"
                    v-model="loginEmail"
                    type="email"
                    placeholder="Enter email"
                />
            </div>

            <div class="field">
                <label for="loginPassword">Password</label>
                <Password
                    id="loginPassword"
                    v-model="loginPassword"
                    :feedback="false"
                    toggleMask
                    placeholder="Enter password"
                />
            </div>

            <Button type="submit" label="Kirjaudu" @click="handleLogin" />
        </form>
    </section>

    <section class="section surface">
        <h3>Rekisteröidy</h3>

        <form class="flex col gap-md">
            <div class="field">
                <label for="username">Username</label>
                <InputText id="username" v-model="username" placeholder="Enter username" />
            </div>

            <div class="field">
                <label for="email">Email</label>
                <InputText id="email" v-model="email" type="email" placeholder="Enter email" />
            </div>

            <div class="field">
                <label for="password">Password</label>
                <Password
                    id="password"
                    v-model="password"
                    :feedback="false"
                    toggleMask
                    placeholder="Enter password"
                />
            </div>

            <div class="field">
                <label for="confirmedPassword">Confirm Password</label>
                <Password
                    id="confirmedPassword"
                    v-model="confirmedPassword"
                    :feedback="false"
                    toggleMask
                    placeholder="Confirm password"
                />
            </div>

            <Button type="submit" label="Register" icon="pi pi-user-plus" @click="handleRegister" />
        </form>
    </section>
</template>

<style lang="css" scoped></style>
