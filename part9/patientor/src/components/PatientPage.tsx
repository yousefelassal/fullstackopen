import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(patientFromApi);
      setLoading(false);
    };
    void fetchPatient();
  }, [id]);

  return (
    <div>
        {loading && <p>loading...</p>}
        {!loading && !patient && <p>no patient found</p>}
        {patient && (
            <>
                <h2>{patient.name}</h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </>
        )}
    </div>
  );
};

export default PatientPage;