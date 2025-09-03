<script setup lang="ts">
import { Button } from 'primevue';

defineProps({
    id: Number
})
</script>

<template>
    <div class="flex flex-col">
        <RouterLink class="m-10" to="/">
            <Button label="< Home"></Button>
        </RouterLink>

        <h2 class="text-5xl text-center mt-40">Bonul cu numarul {{ id }} a fost creat cu succes!</h2>
    </div>
</template>

<style scoped></style>