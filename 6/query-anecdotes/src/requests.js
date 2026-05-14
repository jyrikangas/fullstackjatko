
const baseUrl = 'http://localhost:3001/anecdotes'

export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, votes: 0 })
    }
    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        console.log('Failed to create anecdote');
        
    }
    return response.json()
}
export const updateAnecdote = async (updatedAnecdote) => {
    console.log('requests');
    
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote)
    }
    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
    if (!response.ok) {
        console.log('Failed to update anecdote');
    }
    
    return response.json()
}
    