import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../flight-diary/src/types'

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};

const create = async (entry: NewDiaryEntry) => {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
};

export default {
    getAll,
    create
};