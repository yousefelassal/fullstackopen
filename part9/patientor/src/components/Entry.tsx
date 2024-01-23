import { Entry as EntryType } from "../../../patientor-backend/src/types";
import Diagnoses from "./Diagnoses";
import { MedicalServices, Work, LocalHospital } from "@mui/icons-material";


const Entry = ({entry}:{entry:EntryType}) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryIcon = (entry:EntryType) => {
    switch (entry.type) {
      case "Hospital":
        return <LocalHospital />;
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <MedicalServices />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{
        border:"1px solid black",
        padding:"1em",
        margin:"1em",
        borderRadius:"1em"
    }}>
        <h3 style={{display:"flex", alignItems:"center", gap:"2px"}}>
            {entry.date} {entryIcon(entry)}
        </h3>
        <p>{entry.description}</p>
        <ul>
            {entry.diagnosisCodes?.map(code => (
            <li key={code}>
                {code} <Diagnoses code={code}/>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default Entry;