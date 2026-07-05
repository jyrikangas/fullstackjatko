import { useAnecdotes } from "../hooks"
const AnecdoteList = ({ anecdotes }) => {
  const { deleteAnecdote } = useAnecdotes()
  const handleDelete = (e) => {
    e.preventDefault()
  }
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}
        <button type='button' onClick={deleteAnecdote(anecdote)}>delete</button>
      </li>)}
      
    </ul>
  </div>
)}

export default AnecdoteList
