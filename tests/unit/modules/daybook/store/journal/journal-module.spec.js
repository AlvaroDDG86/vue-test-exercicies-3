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
});

describe('Mutations', () => {
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

describe('Getters', () => {
    test('Getter: getEntriesByTerm', () => {
        const store = createVuexStore(journalState)
        const [ entry1 ] = journalState.entries
        // this is not an array, is a property accesed by string
        expect(store.getters['journal/getEntriesByTerm']().length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm'](entry1.text).length).toBe(1)
    });
    test('Getter: getEntryById', () => {
        const store = createVuexStore(journalState)
        const [ entry1 ] = journalState.entries
        // this is not an array, is a property accesed by string
        expect(store.getters['journal/getEntryById']()).toBeUndefined()
        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1)

    });
});

describe('Actions', () => {
    test('Action: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(2)
    });
    test('Action: updateEntry', async () => {
        const store = createVuexStore({ isLoading: true, entries: [{ id: '-Mv3wxwFzQ4vrUoBkEo-', text: "some text", date: 1227077227978}] })
        expect(store.state.journal.entries.length).toBe(1)
        const updatedEntry = {
            "id": "-Mv3wxwFzQ4vrUoBkEo-",
            "date": 1227077227978,
            "text": "Entrada actualizada " + Math.floor(Math.random() * 110)
        }
        await store.dispatch('journal/updateEntry', updatedEntry)
        expect(store.state.journal.entries.length).toBe(1)
        expect(store.state.journal.entries.find(entry => entry.id === updatedEntry.id)).toEqual(updatedEntry)
    });
    test('Action: createEntry', async () => {
        // const store = createVuexStore({ isLoading: true, entries: [] })
        // const updatedEntry = {
        //     "id": "-Mv3wxwFzQ4vrUoBkE2-",
        //     "date": 1227077227978,
        //     "text": "Entrada nueva"
        // }
        // await store.dispatch('journal/createEntry', updatedEntry)
        // expect(store.state.journal.entries.find(entry => entry.id === updatedEntry.id)).toEqual(updatedEntry)
        
    });
    test('Action: deleteEntry', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        
    });
})