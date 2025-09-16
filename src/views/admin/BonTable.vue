<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button } from 'primevue';

import { APIService } from '@/services/ApiService';
import { onMounted, ref } from 'vue';

import type { Bon, Ghiseu } from '@/services/ApiService';

const bonuri = ref<Bon[]>([]);
const ghisee = ref<Ghiseu[]>([]);
const tabel = ref<any>([]);
const apiService = new APIService();

onMounted(async () => {
    bonuri.value = await apiService.GetAllBonuri();
    ghisee.value = await apiService.GetAllGhisee();

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

const bonInAsteptare = async (row: any) => {
    await apiService.AsteptareBon(row.id);
    row.stare = 'in asteptare';
}

const bonPreluat = async (row: any) => {
    await apiService.PreluareBon(row.id);
    row.stare = 'preluat';
}

const bonInchis = async (row: any) => {
    await apiService.InchidereBon(row.id);
    row.stare = 'inchis';
}
</script>

<template>
    <h2 class="text-2xl mx-10 my-5">Tabela cu Bonuri:</h2>
    <DataTable class="mx-10" stripedRows showGridlines paginator :rows="10" :value=tabel>
        <Column field="id", header="Bon"></Column>
        <Column field="denumire", header="Ghiseu"></Column>
        <Column field="descriere", header="Descriere"></Column>
        <Column field="stare", header="Stare"></Column>
        <Column header="Actiuni">
            <template #body="tabel">
                <Button @click="bonInAsteptare(tabel.data)" v-if="tabel.data.stare !== 'in asteptare'" label="In Asteptare" severity="warn" class="mr-5"></Button>
                <Button @click="bonPreluat(tabel.data)" v-if="tabel.data.stare !== 'preluat'" label="Preluat" class="mr-5"></Button>
                <Button @click="bonInchis(tabel.data)" v-if="tabel.data.stare !== 'inchis'" label="Inchis" severity="danger"></Button>
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>