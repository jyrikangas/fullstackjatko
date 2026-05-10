
import { useNotifications, useNotificationVisibility } from "../notificationStore"

const Notification = () => {
  const message  = useNotifications()
  const visible = useNotificationVisibility()
  if (!visible) return null
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
    
  }

  return <div style={style}> { message } </div>
}

export default Notification