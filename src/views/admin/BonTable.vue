<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { APIService } from '@/services/ApiService';
import { onMounted, ref } from 'vue';

import type { Bon, Ghiseu } from '@/services/ApiService';

const bonuri = ref<Bon[]>([]);
const ghisee = ref<Ghiseu[]>([]);
const tabel = ref<any>([]);

onMounted(async () => {
    bonuri.value = await APIService.GetAllBonuri();
    ghisee.value = await APIService.GetAllGhisee();

    bonuri.value.forEach(bon => {
        var ghiseuDenumire, ghiseuDescriere;
        ghisee.value.forEach(ghiseu => {
            if (ghiseu.id === bon.idGhiseu){
                ghiseuDenumire = ghiseu.denumire;
                ghiseuDescriere = ghiseu.descriere;
            }
        });

        var row = {id: bon.id, denumire: ghiseuDenumire, descriere: ghiseuDescriere, stare: bon.stare};
        tabel.value.push(row);
    });
})
</script>

<template>
    <DataTable class="mx-10" stripedRows showGridlines paginator :rows="10" :value=tabel>
        <Column field="id", header="ID"></Column>
        <Column field="denumire", header="Ghiseu"></Column>
        <Column field="descriere", header="Descriere"></Column>
        <Column field="stare", header="Stare"></Column>
    </DataTable>
</template>

<style scoped></style>