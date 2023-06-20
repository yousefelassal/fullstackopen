const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Hamada" age={12+10}/>
      <Hello name="Sha3bola" age="10"/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App