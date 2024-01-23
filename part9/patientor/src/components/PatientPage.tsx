import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../../../patientor-backend/src/types";
import { Male, Female } from "@mui/icons-material";
import Diagnoses from "./Diagnoses";

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
              <div style={{
                display:"flex",
                alignItems:"center"
              }}>
                <h2>{patient.name}</h2>
                {patient.gender === 'male' && <Male sx={{color:"blue"}}/>}
                {patient.gender === 'female' && <Female sx={{color:"pink"}}/>}
              </div>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                {patient.entries.map(entry => (
                  <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                      {entry.diagnosisCodes?.map(code => (
                        <li key={code}>
                          {code} <Diagnoses code={code}/>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </>
        )}
    </div>
  );
};

export default PatientPage;