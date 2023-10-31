import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts/";

export const getAllAccounts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const getAccountById = async (idAccount) => {
    try {
        const response = await axios.get(`${API_URL}${idAccount}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const getAccountByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/name,==,${name}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const registrarAccount = async (account) => {
    try {
        const response = await axios.post(API_URL, {
            email: String(account.email).trim(),
            name: String(account.name).trim(),
            password: String(account.password).trim()
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error){
        console.error("Error al registrar la cuenta", error);
        throw error;
    }
}




