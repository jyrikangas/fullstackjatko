import { useAnecdotes } from '../useAnecdotes'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification, setVisibility } = useContext(NotificationContext)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    if (length(content)<5){
      setNotification(`Failed to create anecdote ${content} - anecdote must be at least 5 characters`)
      setVisibility(1)
    }
    setNotification(`created ${content}`)
    setVisibility(1)
    addAnecdote(content)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm