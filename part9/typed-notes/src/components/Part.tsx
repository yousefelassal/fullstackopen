import { CoursePart } from "../types"

export default function Part({part}:{part:CoursePart}) {

  function assertNever(value: never): never {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  return (
    <div>
      <h3>{part.name} {part.exerciseCount}</h3>
      {(() => {
        switch (part.kind) {
          case "basic":
            return <p style={{fontStyle:'italic'}}>{part.description}</p>
          case "group":
            return <p>project exercises {part.groupProjectCount}</p>
          case "background":
            return <>
                <p style={{fontStyle:'italic'}}>{part.description}</p>
                <p>{part.backgroundMaterial}</p>
            </>
          case "special":
            return <>
                <p style={{fontStyle:'italic'}}>{part.description}</p>
                <p>required skills: {part.requirements.join(', ')}</p>
            </>
          default:
            return assertNever(part)
        }
      })()}
    </div>
  )
}
