<script setup lang="ts">
import BonTable from '@/views/admin/BonTable.vue';
import GhiseuTable from '@/views/admin/GhiseuTable.vue';
import { Button } from 'primevue';
</script>

<template>
    <div class="flex flex-col mt-68">
        <h1 class="text-4xl text-center my-5">Welcome Admin!</h1>
        <div class="flex justify-center gap-8 mt-10">
            <RouterLink to="/admin/ghisee">
                <Button label="Ghisee"></Button>
            </RouterLink>
            <RouterLink to="/admin/bon">
                <Button label="Bonuri"></Button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>