
import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, add } = useAnecdoteActions()

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add({ id: generateId(), content})
    e.target.reset()
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input name="anecdote"/>
        </div>
        <button onClick={addAnecdote}>create</button>
      </form>
    </div>
  )
}

export default App