
const baseUrl = 'http://localhost:3001/anecdotes'

export const createNote = async (content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, votes: 0 })
    }
    const response = await fetch(baseUrl, options)
    return response.json()
}
    