import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '@/../tests/unit/mock-data/test-journal-state'

const createVuexStore = (initialState) => {
    return createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })
}

describe('Journal module store', () => {
    test('should set the initial state', () => {
        const store = createVuexStore(journalState)
        
        const { isLoading, entries } = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });

    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', [...journalState.entries])
        expect(store.state.journal.entries.length).toBe(2)
        store.commit('journal/setEntries', [...journalState.entries])
        expect(store.state.journal.entries.length).toBe(4)
        expect(store.state.journal.isLoading).toBeFalsy()
    });
  
    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)

        const entryUpdated = {
            ...journalState.entries[0],
            text: 'text updated'
        }
        store.commit('journal/updateEntry', entryUpdated)
        const { entries } = store.state.journal
        expect(entries.length).toBe(2)
        expect(entries[0].text).toBe('text updated')
        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('mutation: addEntry', () => {
        const store = createVuexStore(journalState)

        const newEntry = {
            id: '33333',
            date: 1227077227972,
            text: 'Prueba 3'
        }
        store.commit('journal/addEntry', newEntry)
        const { entries } = store.state.journal
        expect(entries.length).toBe(3)
        expect(entries.findIndex(item => item.id === newEntry.id)).toBeGreaterThan(-1)
        expect(store.state.journal.isLoading).toBeFalsy()
    });
    
    test('mutation: deleteEntry', () => {
        const store = createVuexStore(journalState)
        
        const id = journalState.entries[0].id
        store.commit('journal/deleteEntry', id)
        const { entries } = store.state.journal
        expect(entries.length).toBe(1)
        expect(entries.findIndex(item => item.id === id)).toBe(-1)
        expect(store.state.journal.isLoading).toBeFalsy()
    });
});