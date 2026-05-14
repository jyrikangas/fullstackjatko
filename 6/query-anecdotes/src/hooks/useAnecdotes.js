import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query' 
import { createAnecdote, updateAnecdote } from '../requests'
export const useAnecdotes = () => {
    const baseUrl = 'http://localhost:3001/anecdotes'
    const queryClient = useQueryClient()

    const { status, data, error} = useQuery({
        queryKey:['anecdotes'],
        queryFn: async () => {
            const response = await fetch(baseUrl)
            return response.json()
        }
    })
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const updateAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      }
  })
    return {
        status: status,
        anecdotes: data,
        error: error,
        addAnecdote: (content) => newAnecdoteMutation.mutate(content),
        vote: (anecdote) => updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    }
}