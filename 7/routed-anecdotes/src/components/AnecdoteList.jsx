import { useAnecdotes } from "../hooks"
const AnecdoteList = ({ anecdotes }) => {
  const { deleteAnecdote } = useAnecdotes
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}</li>)}
      <button type='button' onClick={deleteAnecdote(anecdote)}>delete</button>
    </ul>
  </div>
)}

export default AnecdoteList
