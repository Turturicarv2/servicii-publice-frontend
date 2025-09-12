<script setup lang="ts">
import { APIService } from '@/services/ApiService';
import { ref } from 'vue';
import { Button } from 'primevue';
import router from '@/router';

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    const response = await APIService.LogareUser(username.value, password.value)
        .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        });

    if (!response) {
        username.value = "";
        password.value = "";
        alert("Wrong username or password. Try again!");
    } else if (response.data === "user") {
        router.push("/user");
    } else if (response.data === "admin") {
        router.push("/admin");
    }
}
</script>

<template>
    <div class="flex justify-center mt-48">
        <form class="flex justify-center items-center flex-col bg-gray-100 border-2 rounded-lg p-5 gap-5" @submit.prevent="handleSubmit">
            <h1 class="text-3xl">Log in</h1>
            <div class="">
                <label for="Username">Username: </label>
                <input v-model="username" type="text"></input>
            </div>
            
            <div class="">
                <label for="Password">Password: </label>
                <input v-model="password" type="password"></input>
            </div>

            <button class="mt-5"><Button label="Submit"></Button></button>
            <p>Don't have an account yet? <RouterLink class="underline text-green-500" to="/register">Sign up here!</RouterLink></p>
        </form>
    </div>
</template>

<style scoped>
    input {
        border: 2px;
        background-color: white;
        margin-left: 20px;
    }
</style>