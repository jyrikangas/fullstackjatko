import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const RemoveButton = ({ anecdote }) => {

    const { remove } = useAnecdoteActions()
    const { setMessage } = useNotificationActions()
    const handleRemove = async (anecdote) => {
      setMessage(`You removed ${anecdote.content}`)
      await remove(anecdote.id)
    }
    if (anecdote.votes>0) {
        return null
    }
    return (
        <div>
            <button onClick={() => handleRemove(anecdote)}>delete</button>
        </div>
    )
}
export default RemoveButton