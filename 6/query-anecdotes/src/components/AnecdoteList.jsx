
import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotify from '../hooks/useNotify'

const AnecdoteList = () => {
    const { vote, status, error, anecdotes } = useAnecdotes()
    const { setNotification, setVisibility } = useNotify()
    if (status === 'pending') {
        return <span> Loading... </span>
    }
    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    const handleVote = (anecdote) => {
        vote(anecdote)
        setNotification(`voted ${anecdote.content}`)
        setVisibility(1)
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