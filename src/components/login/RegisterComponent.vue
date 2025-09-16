<script setup lang="ts">
import { APIService } from '@/services/ApiService';
import { ref } from 'vue';
import { Button } from 'primevue';

const username = ref('');
const password = ref('');
const apiService = new APIService();

const handleSubmit = async () => {
    const response = await apiService.CreareUser(username.value, password.value);
    console.log(response);
}
</script>

<template>
    <div class="flex justify-center mt-48">
        <form class="flex justify-center items-center flex-col bg-gray-100 border-2 rounded-lg p-5 gap-5" @submit.prevent="handleSubmit">
            <h1 class="text-3xl">Register</h1>
            <div class="">
                <label for="Username">Username: </label>
                <input v-model="username" type="text"></input>
            </div>
            
            <div class="">
                <label for="Password">Password: </label>
                <input type="password" v-model="password"></input>
            </div>

            <button class="mt-5"><Button label="Submit"></Button></button>
            <p>Have an account already? <RouterLink class="underline text-green-500" to="/">Sign in here!</RouterLink></p>
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