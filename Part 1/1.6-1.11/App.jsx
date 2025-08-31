import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => <tr><th>{text}</th><th>{value}</th></tr>

const Statistics = ({good, neutral, bad}) =>{
  let total = good+bad+neutral
  if(total!=0){
  return(
    <table>
      <tbody>
      <StatisticLine text={"good"} value={good}/>
      <StatisticLine text={"Neutral"} value={neutral}/>
      <StatisticLine text={"bad"} value={bad}/>
      <StatisticLine text={"all"} value={total}/>
      <StatisticLine text={"average"} value={(good-bad)/total}/>
      <StatisticLine text={"positive"} value={good/total *100+"%"}/>
      </tbody>
    </table>
  )}
  return(
    <div>
      No feedback given!
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick= {() => setGood(good+1)} text = 'Good' />
      <Button onClick= {() => setNeutral(neutral+1)} text = 'Neutral' />
      <Button onClick= {() => setBad(bad+1)} text = 'Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App