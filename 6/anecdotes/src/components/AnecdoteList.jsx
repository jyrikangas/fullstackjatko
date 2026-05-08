import { useAnecdotes, useAnecdoteActions } from "../store";

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    
    return (
        <div>
          {anecdotes.toSorted((a1,a2) => a1.votes>a2.votes ? a1 : a2 ).map(anecdote => (
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

export default AnecdoteList