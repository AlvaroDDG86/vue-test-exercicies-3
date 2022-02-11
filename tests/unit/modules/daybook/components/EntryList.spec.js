import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList'
import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'

import { createStore } from 'vuex'
const mockRouter = {
    push: jest.fn()
}

describe('EntryList', () => {
    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => (journalState)
    }

    const store = createStore({
        modules: {
            journal: { ...journalMockModule }
        }
    })
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store] // this is a fucking ARRAY
            }
        })
    })

    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('should search by no term setted', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(2)
    });

    test('should search by term', async () => {
        await wrapper.find('input[placeholder="Buscar entrada"]').setValue('Prueba 1')
        expect(wrapper.findAll('entry-stub').length).toBe(1)
    });

    test('should navigate to entry when click', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
    });
});