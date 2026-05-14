
import { useAnecdotes } from '../useAnecdotes'
import NotificationContext from '../NotificationContext'
const AnecdoteList = () => {
    
    const { vote, status, error, anecdotes } = useAnecdotes()

    if (status === 'pending') {
        return <span> Loading... </span>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    const { setNotification } = NotificationContext()
    const handleVote = (anecdote) => {
        vote(anecdote)
        setNotification(`voted ${anecdote.content}`)
    }
    
    return ( 
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
    )
}
export default AnecdoteList