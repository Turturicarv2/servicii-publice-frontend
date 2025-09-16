import axios, { type AxiosResponse } from "axios";
import { authStore } from "@/store/store";

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
const BonBaseURL = "http://localhost:5163/api/Bon";
const UserBaseURL = "http://localhost:5163/api/User";

export class APIService {
    store = authStore();

    async GetAllGhisee(): Promise<Ghiseu[]> {
        const response = await axios.get(`${GhiseuBaseURL}/GetAllGhisee`, {
            headers: {
                Authorization: `Bearer ${this.store.token}`
            }
        });
        return response.data;
    }

    async CreeareBon(id: number): Promise<number> {
        const response = await axios.post(`${BonBaseURL}/CreateBon`, id, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }

    async GetAllBonuri(): Promise<Bon[]> {
        const response = await axios.get(`${BonBaseURL}/GetAllBonuri`, {
            headers: {
                Authorization: `Bearer ${this.store.token}`
            }
        });
        return response.data;
    }

    async GetAllBonuriByGhiseuId(ghiseuId: string): Promise<Bon[]> {
        const response = await axios.get(`${BonBaseURL}/GetAllBonuriByGhiseuId/${ghiseuId}`, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }

    async AsteptareBon(id: number) {
        await axios.patch(`${BonBaseURL}/MarkBonAsInProgress/${id}`, null, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async PreluareBon(id: number) {
        await axios.patch(`${BonBaseURL}/MarkBonAsReceived/${id}`, null, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async InchidereBon(id: number) {
        await axios.patch(`${BonBaseURL}/MarkBonAsClosed/${id}`, null, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async ActivareGhiseu(id: number) {
        await axios.patch(`${GhiseuBaseURL}/MarkGhiseuAsActive/${id}`, null, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async DezactivareGhiseu(id: number) {
        await axios.patch(`${GhiseuBaseURL}/MarkGhiseuAsInactive/${id}`, null, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async StergereGhiseu(id: number) {
        await axios.delete(`${GhiseuBaseURL}/DeleteGhiseu/${id}`, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async EditareGhiseu(ghiseuNou: Ghiseu) {
        await axios.put(`${GhiseuBaseURL}/UpdateGhiseu`, ghiseuNou, {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
    }

    async CreeareGhiseu(ghiseuNou: Ghiseu): Promise<number> {
        const response = await axios.post(`${GhiseuBaseURL}/AddGhiseu`, {
            cod: ghiseuNou.cod, 
            denumire: ghiseuNou.denumire, 
            descriere: ghiseuNou.descriere, 
            icon: ghiseuNou.icon
        },
        {
            headers: {
                Authorization: `Bearer ${this.store.token}`,
                "Content-Type": "application/json"
            }
        });
        
        return response.data;
    }

    async CreareUser(username: string, password: string) {
        const response = await axios.post(`${UserBaseURL}/CreateUser`, {
            username: username,
            password: password
        });
        return response;
    }

    async LogareUser(username: string, password: string): Promise<AxiosResponse> {
        const response = await axios.post(`${UserBaseURL}/LoginUser`, {
            username: username,
            password: password
        });
        return response;
    }
}