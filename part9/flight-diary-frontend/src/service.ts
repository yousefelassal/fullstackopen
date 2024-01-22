import axios from 'axios';
import { DiaryEntry } from '../../flight-diary/src/types'

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};

export default {
    getAll,
};