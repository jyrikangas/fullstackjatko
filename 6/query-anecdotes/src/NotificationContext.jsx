import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('Notification')

    const [visibility, setVisibility] = useState(0)
    return (
        <NotificationContext.Provider value={{ notification, setNotification, timer: visibility, setVisibility }}>
            {props.children}
        </NotificationContext.Provider>
    )
}