import { useContext, useEffect } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const { notification, visibility, setVisibility } = useContext(NotificationContext)

  useEffect(() => {
    const realTimer = setTimeout(() => {
      setVisibility(0)
    }, 5000)
    return () => clearTimeout(realTimer)
    })

  if (visibility===0) {
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