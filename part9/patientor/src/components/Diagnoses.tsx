import { useState, useEffect } from "react";
import { Diagnosis } from "../../../patientor-backend/src/types";
import axios from "axios";

const Diagnoses = ({code}:{code:string}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [diagnoses, setDiagnoses] = useState<Diagnosis | undefined>();

    useEffect(() => {
        const fetchDiagnoses = async () => {
        const response = await axios.get<Diagnosis>(
            `http://localhost:3001/api/diagnoses/${code}`
        );
        const data = response.data;
        setDiagnoses(data);
        setLoading(false);
        };
        void fetchDiagnoses();
    }, [code]);

    if (loading) return <span>loading...</span>;
  return (
    <span>{diagnoses?.name}</span>
  );
};

export default Diagnoses;