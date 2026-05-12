
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
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(
        state => ({
          anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
        }))
      }
  }
  

}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
