import { icon } from "@primeuix/themes/aura/avatar";

export interface Ghiseu {
    id: number,
    cod: string,
    denumire: string,
    descriere: string,
    icon: string,
    activ: boolean
}

export interface Bon {
    id: number,
    idGhiseu: number,
    stare: string
}

const GhiseuBaseURL = "http://localhost:5163/api/Ghiseu";
const BonBaseURL = "http://localhost:5163/api/Bon"

export class APIService {
    static async GetAllGhisee(): Promise<Ghiseu[]> {
        const response = await fetch(`${GhiseuBaseURL}/GetAllGhisee`);
        if (!response.ok)
            throw new Error('Response status: ' + response.status);

        const data = await response.json();
        return data;
    }

    static async CreeareBon(id: number): Promise<number> {
        const response = await fetch(`${BonBaseURL}/CreateBon`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id)
        })
        if (!response.ok)
            throw new Error('Response status: ' + response.status);

        const data = await response.json();
        return data;
    }

    static async GetAllBonuri(): Promise<Bon[]> {
        const response = await fetch(`${BonBaseURL}/GetAllBonuri`);
        if (!response.ok)
            throw new Error('Response status: ' + response.status);

        const data = await response.json();
        return data;
    }

    static async GetAllBonuriByGhiseuId(ghiseuId: string): Promise<Bon[]> {
        const response = await fetch(`${BonBaseURL}/GetAllBonuriByGhiseuId/${ghiseuId}`);
        if (!response.ok)
            throw new Error('Response status: ' + response.status);

        const data = await response.json();
        return data;
    }

    static async AsteptareBon(id: number) {
        const response = await fetch(`${BonBaseURL}/MarkBonAsInProgress/${id}`, {
            method: 'PATCH'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async PreluareBon(id: number) {
        const response = await fetch(`${BonBaseURL}/MarkBonAsReceived/${id}`, {
            method: 'PATCH'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async InchidereBon(id: number) {
        const response = await fetch(`${BonBaseURL}/MarkBonAsClosed/${id}`, {
            method: 'PATCH'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async ActivareGhiseu(id: number) {
        const response = await fetch(`${GhiseuBaseURL}/MarkGhiseuAsActive/${id}`, {
            method: 'PATCH'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async DezactivareGhiseu(id: number) {
        const response = await fetch(`${GhiseuBaseURL}/MarkGhiseuAsInactive/${id}`, {
            method: 'PATCH'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async StergereGhiseu(id: number) {
        const response = await fetch(`${GhiseuBaseURL}/DeleteGhiseu/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async EditareGhiseu(ghiseuNou: Ghiseu) {
        const response = await fetch(`${GhiseuBaseURL}/UpdateGhiseu`, {
            method: 'PUT',
            body: JSON.stringify(ghiseuNou),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);
    }

    static async CreeareGhiseu(ghiseuNou: Ghiseu): Promise<number> {
        const response = await fetch(`${GhiseuBaseURL}/AddGhiseu`, {
            method: 'POST',
            body: JSON.stringify({cod: ghiseuNou.cod, denumire: ghiseuNou.denumire, descriere: ghiseuNou.descriere, icon: ghiseuNou.icon}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok)
            throw new Error('Response status: ' + response.status);

        const data = await response.json();
        return data;
    }
}