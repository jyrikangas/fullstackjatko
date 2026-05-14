import AnecdoteList from './/components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from './requests'
const App = () => {
  const baseUrl = 'http://localhost:3001/anecdotes'

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      }
  })
  const handleVote = (anecdote) => {
        const updatedAnecdote = {...anecdote, votes:anecdote.votes + 1}
        updateAnecdoteMutation.mutate(updatedAnecdote)

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