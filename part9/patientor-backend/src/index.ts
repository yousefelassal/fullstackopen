import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors()); // eslint-disable-line @typescript-eslint/no-unsafe-call

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});