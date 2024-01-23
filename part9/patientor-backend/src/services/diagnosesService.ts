import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

const getSingleDiagnosis = (code: string): Diagnosis | undefined => {
  return data.find(diagnosis => diagnosis.code === code);
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis,
  getSingleDiagnosis
};