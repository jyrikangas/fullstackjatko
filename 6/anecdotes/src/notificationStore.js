
import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    message: "Notification message",
    duration: 5,
    visible: true,
    actions: {
        setMessage: message => set(
            state 0> ({message: message })
        ),
        makeVisible: => set(
            state => ({ visible: true})
        )

    }
}))