import axios from 'axios';

const URL = 'http://localhost:3001/products';


export async function getProducts() {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
        // throw error;
    }
}