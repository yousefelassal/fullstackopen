interface coursePart {
    name: string;
    exerciseCount: number;
}

export default function Content({courseParts}:{courseParts:coursePart[]}) {
  return (
    <div>
        {courseParts.map((part, i) => <p key={i}>{part.name} {part.exerciseCount}</p>)}
    </div>
  )
}
