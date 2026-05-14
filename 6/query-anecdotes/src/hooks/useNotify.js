import { useContext } from "react"
import NotificationContext from "../NotificationContext"
export const useNotify = () => {
    const { notification, setNotification, visibility, setVisibility } = useContext(NotificationContext)
    return { notification, setNotification, visibility, setVisibility }
}

export default useNotify
    