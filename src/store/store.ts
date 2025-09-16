import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || ""
    }),
    actions: {
        login(jwtToken: string) {
            this.token = jwtToken;
            localStorage.setItem("token", jwtToken);
        },
        logout() {
            this.token = "";
            localStorage.removeItem("token");
        },
        getToken() {
            return this.token;
        }
    }
});