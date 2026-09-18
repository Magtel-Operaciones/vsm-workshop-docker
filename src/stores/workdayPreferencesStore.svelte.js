import { getPersistedValue, persistValue } from '../utils/persistedState.js'

export const DEFAULT_WORKDAY_HOURS = 8
export const MIN_WORKDAY_HOURS = 1
export const MAX_WORKDAY_HOURS = 24

const STORAGE_KEY = 'vsm-workday-preferences'

const sanitizeHours = (value) => {
  const hours = Number(value)
  if (!Number.isFinite(hours)) return DEFAULT_WORKDAY_HOURS
  return Math.min(MAX_WORKDAY_HOURS, Math.max(MIN_WORKDAY_HOURS, hours))
}

const defaultRepository = {
  load: () => getPersistedValue(STORAGE_KEY, { workdayHours: DEFAULT_WORKDAY_HOURS }),
  save: (value) => persistValue(STORAGE_KEY, value),
}

export function createWorkdayPreferencesStore(repository = defaultRepository) {
  const persisted = repository.load()
  let workdayHours = $state(sanitizeHours(persisted?.workdayHours))

  const setWorkdayHours = (value) => {
    const hours = Number(value)
    if (!Number.isFinite(hours)) return
    workdayHours = sanitizeHours(hours)
    repository.save({ workdayHours })
  }

  return {
    get workdayHours() {
      return workdayHours
    },
    get minutesPerWorkDay() {
      return workdayHours * 60
    },
    setWorkdayHours,
  }
}

export const workdayPreferencesStore = createWorkdayPreferencesStore()
