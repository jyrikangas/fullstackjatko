import { useAnecdotes, useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";
import RemoveButton from "./RemoveButton";
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
          {anecdotes.map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes} votes 
                  <button onClick={() => handleVote(anecdote)}>vote</button>
                  <RemoveButton anecdote = {anecdote}/>
                </div>
            </div>
          ))}
        </div>
    )
}

export default AnecdoteList