
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
    