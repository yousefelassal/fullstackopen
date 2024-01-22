import Part from "./Part";
import { CoursePart } from "../types";

export default function Content({courseParts}:{courseParts:CoursePart[]}) {

  return (
    <div>
      {courseParts.map((part) => <Part key={part.name} part={part} />)}
    </div>
  )
}
