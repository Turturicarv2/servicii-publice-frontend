<script setup lang="ts">
import { APIService } from '@/services/ApiService';
import { ref } from 'vue';
import { Button } from 'primevue';

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
    // check user credentials
}
</script>

<template>
    <div class="flex justify-center mt-48">
        <form class="flex justify-center items-center flex-col bg-gray-100 border-2 rounded-lg p-5 gap-5" @submit.prevent="handleSubmit">
            <div class="">
                <label for="Username">Username: </label>
                <input v-model="username" type="text"></input>
            </div>
            
            <div class="">
                <label for="Password">Password: </label>
                <input v-model="password" type="text"></input>
            </div>

            <Button class="mt-5" label="Submit"></Button>
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