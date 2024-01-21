import { NewDiaryEntry, Weather, Visibility } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
      throw new Error('Incorrect or missing comment');
    }  
    return comment;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
  };
  
const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
 console.log(object); // now object is no longer unused
 const newEntry: NewDiaryEntry = {
   weather: 'cloudy', // fake the return value
   visibility: 'great',
   date: '2022-1-1',
   comment: 'fake news'
 };

 return newEntry;
};

export default toNewDiaryEntry;