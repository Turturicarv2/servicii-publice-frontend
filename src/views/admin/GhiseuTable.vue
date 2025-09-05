<script setup lang="ts">
import { DataTable, Column, Button, Dialog, InputText } from 'primevue';
import { APIService, type Ghiseu } from '@/services/ApiService';
import { onMounted, ref } from 'vue';

const ghisee = ref<Ghiseu[]>([]);
const visible = ref(false);

const formGhiseu = ref<Ghiseu>({id: 0, cod: '', denumire: '', descriere: '', icon: '', activ: false});
var editedRow = ref<Ghiseu>({id: 0, cod: '', denumire: '', descriere: '', icon: '', activ: false});

onMounted(async () => {
    ghisee.value = await APIService.GetAllGhisee();
});

const activareGhiseu = async (row: any) => {
    await APIService.ActivareGhiseu(row.id);
    row.activ = true;
}

const dezactivareGhiseu = async (row: any) => {
    await APIService.DezactivareGhiseu(row.id);
    row.activ = false;
}

const stergereGhiseu = async (id: number) => {
    await APIService.StergereGhiseu(id);
    ghisee.value = ghisee.value.filter(ghiseu => ghiseu.id != id);
}

const openDialogEditareGhiseu = (row: Ghiseu) => {
    formGhiseu.value = {...row};
    editedRow = ref(row);
    visible.value = true;
}

const salvareGhiseu = async () => {
    visible.value = false;

    if (formGhiseu.value.id !== 0) {
        await APIService.EditareGhiseu(formGhiseu.value);
        
        editedRow.value.cod = formGhiseu.value.cod;
        editedRow.value.denumire = formGhiseu.value.denumire;
        editedRow.value.descriere = formGhiseu.value.descriere;
        editedRow.value.icon = formGhiseu.value.icon;
    }
    else {
        const ghiseuId = await APIService.CreeareGhiseu(formGhiseu.value);
        console.log(ghiseuId);
        ghisee.value.push({
            id: ghiseuId, 
            cod: formGhiseu.value.cod, 
            denumire: formGhiseu.value.denumire, 
            descriere: formGhiseu.value.descriere, 
            icon: formGhiseu.value.icon, 
            activ: false
        });
    }
}

const openDialogCreeareGhiseu = () => {
    formGhiseu.value = {id: 0, cod: '', denumire: '', descriere: '', icon: '', activ: false};
    visible.value = true;
}
</script>

<template>
    <div class="flex justify-between mx-10 mb-5 mt-10">
        <h2 class="text-2xl">Tabela cu Ghisee:</h2>
        <Button label="Creeaza Ghiseu Nou" @click="openDialogCreeareGhiseu()" class="mr-5"></Button>
    </div>
    <Dialog v-model:visible="visible" maximizable modal header="Editare Ghiseu">
        <div class="flex gap-5 items-center mb-5">
            <label for="cod" class="font-semibold w-24">Cod</label>
            <InputText id="cod" class="flex-auto" v-model="formGhiseu.cod" autocomplete="off" />
        </div>
        <div class="flex gap-5 items-center mb-5">
            <label for="denumire" class="font-semibold w-24">Denumire</label>
            <InputText id="denumire" class="flex-auto" v-model="formGhiseu.denumire" autocomplete="off" />
        </div>
        <div class="flex gap-5 items-center mb-5">
            <label for="descriere" class="font-semibold w-24">Descriere</label>
            <InputText id="descriere" class="flex-auto" v-model="formGhiseu.descriere" autocomplete="off" />
        </div>
        <div class="flex gap-5 items-center mb-5">
            <label for="icon" class="font-semibold w-24">Icon</label>
            <InputText id="icon" class="flex-auto" v-model="formGhiseu.icon" autocomplete="off" />
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Save" variant="outlined" @click="salvareGhiseu()" autofocus />
        </template>
    </Dialog>
    <DataTable class="mx-10" stripedRows showGridlines paginator :rows="10" :value="ghisee">
        <Column header="Cod" field="cod"></Column>
        <Column header="Denumire" field="denumire"></Column>
        <Column header="Descriere" field="descriere"></Column>
        <Column header="Icon" field="icon"></Column>
        <Column header="Activ">
            <template #body="slotProps">
                {{ slotProps.data.activ ? 'Activ' : 'Inactiv' }}
            </template>
        </Column>
        <Column header="Actiuni">
            <template #body="slotProps">
                <Button label="Activare" severity="info" class="mr-5" @click="activareGhiseu(slotProps.data)"></Button>
                <Button label="Dezactivare" severity="info" class="mr-5" @click="dezactivareGhiseu(slotProps.data)"></Button>
                <Button label="Edit" class="mr-5" @click="openDialogEditareGhiseu(slotProps.data)"></Button>
                <Button label="Delete" severity="danger" @click="stergereGhiseu(slotProps.data.id)"></Button>
            </template>
        </Column>
    </DataTable>
</template>

<style scoped></style>