const Course = ({ course }) => {
  return(
    <div>
    <h2>{course.name}</h2>
    {course.parts.map(parts => <p key={parts.id}>{parts.name} {parts.exercises}</p>)}
    <b>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </div>
  )
}

export default Course