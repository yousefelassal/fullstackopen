const Header = ({course}) => {
  console.log(course)
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}


const Part = ({part, exercises}) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  )
}

//already used reduce in part 2.2
const Total = ({parts}) => {
  return (
    <>
      total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}


export default App