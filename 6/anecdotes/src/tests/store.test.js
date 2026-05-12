import {describe, it, expect, beforeEach, vi } from 'vitest'
import {renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
    default: {
        getAll: vi.fn()
    }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useFilter, useAnecdoteActions } from '../store'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: ""})
    vi.clearAllMocks()
})
describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
        const mockAnecdotes = [
            { id: '1', content: 'Anecdote 1', votes: 0 },
            { id: '2', content: 'Anecdote 2', votes: 0 },
            { id: '3', content: 'Anecdote 3', votes: 0 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })
        const {result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })

    it('store provides anecdotes sorted by vote count', async () => {
        const mockAnecdotes = [
            { id: '1', content: 'Anecdote 1', votes: 0 },
            { id: '2', content: 'Anecdote 2', votes: 5 },
            { id: '3', content: 'Anecdote 3', votes: 2 },
        ]
        const sortedAnecdotes = [...mockAnecdotes].sort((a, b) => b.votes - a.votes)
        
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        
        const { result } = renderHook(() => useAnecdoteActions())
        
        await act(async () => {
            await result.current.initialize()
        })
        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        
        expect(anecdotesResult.current).toEqual(sortedAnecdotes)
    })

    it('filtering lists anecdotes that include filter text', async () => {
        const mockAnecdotes = [
            { id: '1', content: 'Anecdote 1', votes: 0 },
            { id: '2', content: 'Anecdote 2', votes: 0 },
            { id: '3', content: 'Anecdote 3', votes: 0 },
        ]
        const filteredAnecdotes = [
            { id: '3', content: 'Anecdote 3', votes: 0 }
        ]
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "3"})
        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        
        expect(anecdotesResult.current).toEqual(filteredAnecdotes)
    })
    
        
})
