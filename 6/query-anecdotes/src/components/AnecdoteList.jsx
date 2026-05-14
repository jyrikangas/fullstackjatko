
import { useAnecdotes } from '../useAnecdotes'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
const AnecdoteList = () => {
    const { vote, status, error, anecdotes } = useAnecdotes()
    const { setNotification } = useContext(NotificationContext)
    
    if (status === 'pending') {
        return <span> Loading... </span>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

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