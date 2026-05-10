
import { create } from 'zustand'

let hideTimeoutId

const AUTO_HIDE_MS = 5000

const useNotificationStore = create((set) => ({
    message: '',
    visible: false,
    actions: {
        showNotification: (message, duration = AUTO_HIDE_MS) => {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId)
            }

            set({ message, visible: true })

            hideTimeoutId = setTimeout(() => {
                set({ visible: false })
                hideTimeoutId = undefined
            }, duration)
        },
        hideNotification: () => {
            if (hideTimeoutId) {
                clearTimeout(hideTimeoutId)
                hideTimeoutId = undefined
            }

            set({ visible: false })
        }
    }
}))