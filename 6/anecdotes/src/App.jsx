import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useAnecdoteActions } from './store'
import anecdoteService from './services/anecdotes'

import { useNotificationActions } from './notificationStore'
const App = () => {

  const { initialize } = useAnecdoteActions()

  useEffect(() => { 
    anecdoteService.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  const { setMessage, makeVisible } = useNotificationActions()
  useEffect(() => {
      setMessage(`You voted `)
      makeVisible()
      console.log('asfasfd');
      
  })
  return (
    <div>
      <Notification/>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App