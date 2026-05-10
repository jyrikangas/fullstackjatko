import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const RemoveButton = () => {

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