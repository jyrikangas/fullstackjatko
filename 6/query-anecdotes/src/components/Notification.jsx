import { useEffect } from "react"
import useNotify from "../hooks/useNotify"
const Notification = () => {
  const { notification, visibility, setVisibility } = useNotify()

  useEffect(() => {
    const realTimer = setTimeout(() => {
      setVisibility(0)
    }, 5000)
    return () => clearTimeout(realTimer)
    })

  if (!visibility) {
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