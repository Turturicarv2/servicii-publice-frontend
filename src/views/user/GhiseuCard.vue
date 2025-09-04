<script setup lang="ts">
import { Card, Button } from 'primevue';
import { APIService } from '@/services/ApiService';
import router from '@/router';
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    cod: String,
    denumire: String
})

const creeareBon = async () => {
    const bonId = await APIService.CreeareBon(props.id);
    router.push({path: `/bonCreeat/${bonId}`});
} 
</script>

<template>
    <Card class="w-64">
        <template #title>{{ props.cod }}</template>
        <template #subtitle>{{ props.denumire }}</template>
        <template #footer>
            <Button label="Creeare Bon" @click="creeareBon"></Button>
        </template>
    </Card>
</template>

<style scoped></style>