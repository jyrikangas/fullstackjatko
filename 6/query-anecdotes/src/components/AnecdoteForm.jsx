import { useAnecdotes } from '../useAnecdotes'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { setNotification, setTimer } = useContext(NotificationContext)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    setNotification(`created ${content}`)
    setTimer(5)
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