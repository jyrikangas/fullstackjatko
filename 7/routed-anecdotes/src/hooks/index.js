import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import { data } from 'react-router-dom'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }

  return { input:{
    type,
    value,
    onChange},
    reset
  }
}

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])
  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])
  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(data => setAnecdotes(anecdotes.concat(data)))
  }
  return { anecdotes, addAnecdote }
}
