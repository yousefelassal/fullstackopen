import data from "../../data/patients";
import { Patient, NonSensitivePatient, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return data;
};

const getPatient = (id:string): Patient | undefined => {
  return data.find(patient => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: PatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    data.push(newPatient);
    return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient
};