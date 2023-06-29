const Header = ({name}) => <h2>{name}</h2>


const Part = ({part, exercises}) => <>{part} {exercises} <br /></>


const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Total = ({parts}) => {
  return (
    <>
      total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
    </>
  )
}

const CourseDetails = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Course = ({ courses }) => {
  console.log(courses)
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <CourseDetails key={course.id} course={course} />)}
    </>
  )
}

export default Course