

import { create } from 'zustand'
let hideTimeoutId
const useNotificationStore = create((set) => ({
    message: 'Notification message',
    duration: 5,
    visible: false,
    actions: {
        setMessage: message => {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId)
            }
            set(({ message:message, visible: true }))
            hideTimeoutId = setTimeout(() => {
                set({ message: 'timeout!', visible: false })
            }, 5000)

        }

    }
}))

export const useNotifications = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions) 
export const useNotificationVisibility = () => useNotificationStore((state) => state.visible)