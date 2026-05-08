import { create } from 'zustand'

export const useCounterStore = create(set => ({
    counters: {good: 0, neutral: 0, bad: 0, all: 0, average:0, positive: 0
    },
    actions: {
        increment: (counterType) => set(state => ({
            counters: {
                ...state.counters,
                [counterType]: state.counters[counterType] + 1,
                all: state.counters['all'] + 1,
                positive: counterType === 'good' ? (state.counters.positive + 1) : state.counters.positive,
                average: (state.counters.good - state.counters.bad + (counterType === 'good' ? 1 : counterType === 'bad' ? -1 : 0)) / (state.counters.all + 1) 
            }
            
        }))
            
    }
}))

//export const useCounter = () => useCounterStore(state => state.counter)
//export const useCounterControls = () => useCounterStore