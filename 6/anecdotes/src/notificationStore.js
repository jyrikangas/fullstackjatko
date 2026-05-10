

import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    message: "Notification message",
    duration: 5,
    visible: true,
    actions: {
        setMessage: message => set(
            () => ({message: message })
        ),
        makeVisible: () => set(
            ({ visible: true})
        )

    }
}))

export const useNotifications = () => useNotificationStore((state) => state.message)