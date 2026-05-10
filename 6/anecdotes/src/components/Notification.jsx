
import { useNotifications } from "../notificationStore"

const Notification = () => {
  const { notification, duration } = useNotifications()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    transition: 'all 500ms linear 5s'
  }

  return <div style={style}> { notification }</div>
}

export default Notification