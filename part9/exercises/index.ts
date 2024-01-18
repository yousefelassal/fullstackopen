import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import calculateExercises from './calculateExercises';
import { ExerciseValues } from './calculateExercises';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({ weight, height, bmi });
  }
});

app.post('/exercises', express.json(), (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const exerciseHours = daily_exercises.map(hours => Number(hours));
    if (exerciseHours.some(hours => isNaN(hours))) {
      res.status(400).json({ error: 'malformatted parameters' });
    } else {
      const exerciseValues: ExerciseValues = calculateExercises(exerciseHours, Number(target));
      res.json(exerciseValues);
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});