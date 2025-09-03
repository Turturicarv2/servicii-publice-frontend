<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { GhiseuAPI } from '@/services/ApiService';
import type { Ghiseu } from '@/services/ApiService';
import GhiseuCard from '@/views/user/GhiseuCard.vue';

const ghisee = ref<Ghiseu[]>([]);

onMounted(async () => {
    try
    {
        ghisee.value = await GhiseuAPI.GetAllGhisee();
    }
    catch (error: any)
    {
        console.error(error.message);
    }
})
</script>

<template>
    <div class="flex flex-col mt-40">
        <h2 class="text-4xl text-center">Alege Ghiseul</h2>
        <div class="flex px-10 gap-8 flex-wrap justify-center mt-5">
            <GhiseuCard v-for="ghiseu in ghisee" :cod="ghiseu.cod" :denumire="ghiseu.denumire" :id="ghiseu.id"></GhiseuCard>
        </div>
    </div>
</template>
