import AnecdoteList from './/components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
const App = () => {
const baseUrl = 'http://localhost:3001/anecdotes'
  const handleVote = (anecdote) => {
    console.log('vote')
  }
  
  
    const { status, data, error} = useQuery({
        queryKey:['anecdotes'],
        queryFn: async () => {
            const response = await fetch(baseUrl)
            return response.json()
        }
    })
    if (status === 'pending') {
        return <span> Loading... </span>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    
    const anecdotes = data
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                  </div>
                </div>
      ))}
        </div>
    </div>
  )
}

export default App