export interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface ExerciseInput {
    target: number;
    exerciseHours: number[];
}

const parseExerciseArguments = (args: Array<string>): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const exerciseHours = args.slice(3).map(arg => Number(arg));
    if (!isNaN(target) && exerciseHours.every(arg => !isNaN(arg))) {
        return {
            target,
            exerciseHours
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (exerciseHours: number[], target: number): ExerciseValues => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average >= target / 2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'good' : rating === 2 ? 'not too bad but could be better' : 'bad';

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, exerciseHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (e: unknown) {
    if (e instanceof Error) console.log('Error, something bad happened, message: ', e.message);
}

// already arguments are given through the command line

export default calculateExercises;