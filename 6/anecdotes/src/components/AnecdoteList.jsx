import { useAnecdotes, useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const { setMessage } = useNotificationActions()
    const handleVote = async (anecdote) => {
      await vote(anecdote.id)
      setMessage(`You voted for ${anecdote.content}`)
    }
    return (
        <div>
          {anecdotes.toSorted((a1,a2) => a2.votes-a1.votes).map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes} votes 
                  <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
          ))}
        </div>
    )
}

export default AnecdoteList