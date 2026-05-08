
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, add } = useAnecdoteActions()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add({ id: generateId(), content, votes: 0})
    e.target.reset()
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes 
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default App