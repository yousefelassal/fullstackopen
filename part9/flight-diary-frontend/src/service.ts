import axios, { AxiosError } from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../flight-diary/src/types'

const baseUrl = 'http://localhost:3000/api/diaries';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};

const create = async (entry: NewDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, entry);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
            const err = error as AxiosError<ValidationError>;
            throw err.response?.data || 'Unknown error';
        } else {
            throw error;
        }
    }
};

export default {
    getAll,
    create
};