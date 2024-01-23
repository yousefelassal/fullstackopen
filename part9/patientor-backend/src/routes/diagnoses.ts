import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  const diagnosis = diagnosesService.getSingleDiagnosis(req.params.code);

  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;