<script setup lang="ts">
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';

    const bonuri = [
        {bon: 1, ghiseu: "G001", descriere: "lmao", stare: "preluat"},
        {bon: 2, ghiseu: "G001", descriere: "lmao", stare: "preluat"},
        {bon: 3, ghiseu: "G001", descriere: "lmao", stare: "preluat"},
    ]
</script>

<template>
    <DataTable :value=bonuri>
        <Column field="bon", header="ID"></Column>
        <Column field="ghiseu", header="Ghiseu"></Column>
        <Column field="descriere", header="Descriere"></Column>
        <Column field="stare", header="Stare"></Column>
    </DataTable>
</template>

<style scoped></style>