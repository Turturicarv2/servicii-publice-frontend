<script setup lang="ts">
import { APIService, type Bon, type Ghiseu } from '@/services/ApiService';
import Header from '@/views/admin/Header.vue';
import { onMounted, ref } from 'vue';
import { DataTable, Column, Button } from 'primevue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const bonuri = ref<Bon[]>([]);
const ghiseu = ref<Ghiseu>({id: 0, cod: "", denumire: "", descriere: "", icon: "", activ: false});

onMounted(async () => {
    bonuri.value = await APIService.GetAllBonuriByGhiseuId(props.id);
    const ghisee = await APIService.GetAllGhisee();

    ghisee.forEach((row) => {
        if (row.id.toString() == props.id) {
            ghiseu.value = row;
        }
    })
});

const bonInAsteptare = async (row: any) => {
    await APIService.AsteptareBon(row.id);
    row.stare = 'in asteptare';
}

const bonPreluat = async (row: any) => {
    await APIService.PreluareBon(row.id);
    row.stare = 'preluat';
}

const bonInchis = async (row: any) => {
    await APIService.InchidereBon(row.id);
    row.stare = 'inchis';
}
</script>

<template>
    <Header></Header>
    <h1 class="ml-10 my-5 text-4xl">Bonuri pentru {{ ghiseu.cod }} {{ ghiseu.denumire }}:</h1>
    <DataTable class="mx-10" stripedRows showGridlines paginator :rows="10" :value=bonuri>
        <Column field="id", header="Bon"></Column>
        <Column field="stare", header="Stare"></Column>
        <Column field="createdAt", header="Creat La"></Column>
        <Column field="modifiedAt", header="Modificat La"></Column>
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