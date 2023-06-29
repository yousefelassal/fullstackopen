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

// const Total = ({course}) => {
//   console.log(course)
//   let part1 = course.parts[0]
//   let part2 = course.parts[1]
//   let part3 = course.parts[2]
//   return (
//     <>
//       <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
//     </>
//   )
// }

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      {/* <Total course={course} /> */}
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