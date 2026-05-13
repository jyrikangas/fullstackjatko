import { useQuery, useQueryClient } from '@tanstack/react-query' 

export const useAnecdotes = () => {
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey:['anecdotes'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/anecdotes')
            return response.json()
        }
    })
    console.log(JSON.parse(JSON.stringify(result)))
    if (result.isPending) {
        return []
    };
    
    return result.data
}