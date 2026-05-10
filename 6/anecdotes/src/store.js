
import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

// const getId = () => (100000 * Math.random()).toFixed(0)


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    add: anecdote => set(
        state => ({ anecdotes: [...state.anecdotes, anecdote] })
      ),
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, {...anecdote, votes:  anecdote.votes + 1 }
      )
      set(
        state => ({
          anecdotes: state.anecdotes.map(anecdote =>
            anecdote.id === id ? updated : anecdote
          )
        }))
      },
  setFilter: value => set(() => ({ filter: value })),
  initialize: anecdotes => set(() => ({ anecdotes }))
  }
  

}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
