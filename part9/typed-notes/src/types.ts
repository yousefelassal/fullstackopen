interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}
  
interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}
  
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
  
interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  kind: "special";
  requirements: string[];
}
  
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;