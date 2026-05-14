
import { useAnecdotes } from '../useAnecdotes'
const AnecdoteList = () => {
    
    const { vote, status, error, anecdotes } = useAnecdotes()

    if (status === 'pending') {
        return <span> Loading... </span>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    
    return ( 
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                  </div>
                </div>
      ))}
        </div>
    )
}
export default AnecdoteList