import {describe, it, expect, beforeEach, vi } from 'vitest'
import {renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
    default: {
        getAll: vi.fn()
    }
}))

describe('useAnecdoteActions', () => {
    it('initialize loads anecdotes from service', async () => {
        const mockAnecdotes = [
            { id: '1', content: 'Anecdote 1', votes: 0 },
            { id: '2', content: 'Anecdote 2', votes: 0 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })
        const {result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual()
    })
})
