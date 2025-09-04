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

    static async CreeareBon(id: number) {
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
}