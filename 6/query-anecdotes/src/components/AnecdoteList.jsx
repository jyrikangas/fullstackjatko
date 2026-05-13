import { useQuery } from "@tanstack/react-query"


const AnecdoteList = () => {
    const handleVote = (anecdote) => {
    console.log('vote')
  }
    const { status, data, error} = useQuery({
        queryKey:['anecdotes'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/anecdotes')
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