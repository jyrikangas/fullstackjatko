import { useAnecdoteActions } from "../store";

const removeButton = () => {

    const { remove } = useAnecdoteActions()

    const handleRemove = async (anecdote) => {
      setMessage(`You removed ${anecdote.content}`)
      await remove(anecdote.id)
    }
    return (
        <div>
            <button onClick={() => handleRemove(anecdote)}>delete</button>
        </div>
    )
}