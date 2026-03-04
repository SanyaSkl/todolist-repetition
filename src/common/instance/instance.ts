import axios from "axios";

const token = 'a68e29e2-0a9a-485d-b33a-38d5526f4651'
const apiKey = '1f899b25-ea32-4422-868d-0e025508e3bf'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    }
})