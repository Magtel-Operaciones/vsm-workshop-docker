import { describe, expect, it, vi } from 'vitest'
import { createWorkdayPreferencesStore } from '../../../src/stores/workdayPreferencesStore.svelte.js'

const createRepository = (initial = { workdayHours: 8 }) => ({
  load: vi.fn(() => initial),
  save: vi.fn(),
})

describe('workdayPreferencesStore', () => {
  it('uses eight hours and exposes the equivalent minutes by default', () => {
    const store = createWorkdayPreferencesStore(createRepository())

    expect(store.workdayHours).toBe(8)
    expect(store.minutesPerWorkDay).toBe(480)
  })

  it('persists a configured workday duration', () => {
    const repository = createRepository()
    const store = createWorkdayPreferencesStore(repository)

    store.setWorkdayHours(7.5)

    expect(store.workdayHours).toBe(7.5)
    expect(store.minutesPerWorkDay).toBe(450)
    expect(repository.save).toHaveBeenCalledWith({ workdayHours: 7.5 })
  })
})