import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const { notification, timer, setTimer } = useContext(NotificationContext)

  if (timer===0) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={style}>
      {notification}!
    </div>
  )
}

export default Notification