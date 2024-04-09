import axios from 'axios';

const URL = 'http://localhost:3001/products';


export async function addProduct(product) {
    try {
        const response = await axios.post(URL, {
            body: product
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
        // throw error;
    }
}