import { useState } from 'react'

const getRandomInt = (max) => Math.floor(Math.random() * max);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(Array(anecdotes.length).fill(0))

  const updoot = () => {
    const copy = [...allVotes];
    copy[selected] += 1;
    setAll(copy);
  };

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <Button onClick={updoot} text="Vote" />
      <Button onClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote" />
      <br/>
      has {allVotes[selected]} votes
      <h1>Anecdote with the most votes</h1>
      {anecdotes[allVotes.indexOf(Math.max(...allVotes))]}
    </div>
  )
}

export default App
