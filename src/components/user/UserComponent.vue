<script setup lang="ts">
import { Button } from 'primevue';
</script>

<template>
    <div class="flex flex-col mt-68">
        <h1 class="text-7xl text-center px-28">Elibereaza bon</h1>
        <div class="flex justify-center gap-8 mt-10">
            <RouterLink to="/user/creeareBon">
                <Button label="Persoana Fizica"></Button>
            </RouterLink>
            <RouterLink to="/user/creeareBon">
                <Button label="Persoana Juridica"></Button>
            </RouterLink>
        </div>
    </div>
</template>
