import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/pets/";

export const getAllPets = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const getPetById = async (idPet) => {
    try {
        const response = await axios.get(`${API_URL}${idPet}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const getPetByAccount = async (account) => {
    try {
        const response = await axios.get(`${API_URL}/account,==,${account}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos", error);
        throw error;
    }
}

export const registrarPet = async (pet) => {
    try {
        const response = await axios.post(API_URL, {
            name: String(pet.name).trim(),
            nickname: String(pet.nickname).trim(),
            hunger: String(pet.hunger).trim(),
            energy: String(pet.energy).trim(),
            health: String(pet.health).trim(),
            happiness: String(pet.happiness).trim(),
            account: String(pet.account).trim()
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error){
        console.error("Error al registrar la mascota", error);
        throw error;
    }
}

export const actualizarPet = async (idPet, pet) => {
    try {
        const response = await axios.put(`${API_URL}${idPet}`, {
            name: String(pet.name).trim(),
            nickname: String(pet.nickname).trim(),
            hunger: String(pet.hunger).trim(),
            energy: String(pet.energy).trim(),
            health: String(pet.health).trim(),
            happiness: String(pet.happiness).trim(),
            account: String(pet.account).trim(),
            id: pet.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error){
        console.error("Error al registrar la mascota", error);
        throw error;
    }
}




