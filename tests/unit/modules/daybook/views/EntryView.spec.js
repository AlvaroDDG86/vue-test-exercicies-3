import { shallowMount } from '@vue/test-utils'
import EntryView from '@/modules/daybook/views/EntryView'
import { getEntryById } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'
import { createStore } from 'vuex'
import Swal from 'sweetalert2'
// Here we are suppling the sweetalert2 import, SHOULD BE DEFFINED OUTSIDE DESCRIBE
jest.mock(
    'sweetalert2',
    () => ({
        fire: jest.fn(),
        showLoading: jest.fn(),
        close: jest.fn()
    })
)

describe('EntryView', () => {
    const mockRouter = {
        push: jest.fn()
    }
    const journalMockModule = {
        namespaced: true,
        getters: {
            getEntryById
        },
        actions: {
            deleteEntry: jest.fn(),
            updateEntry: jest.fn(),
            createEntry: jest.fn()
        },
        state: () => (journalState)
    }
    const store = createStore({
        modules: {
            journal: { ...journalMockModule }
        }
    })
    store.dispatch = jest.fn()
   
    let wrapper
    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '11111'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    })
    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
    test('should render fab component', () => {
        expect(wrapper.findAll('fab-stub').length).toBe(1)
    });
    test('should push the user if id does nott exist', () => {
        shallowMount(EntryView, {
            props: {
                id: 'does not exist'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
    });
    test('should render day, month and year', () => {
        expect(wrapper.vm.day).toBe(19)
        expect(wrapper.vm.month).toBe('Noviembre')
        expect(wrapper.vm.yearDay).toBe('2008, Miércoles')
    });
    test('should save the entry', async () => {
        await wrapper.vm.saveEntry()
        expect(store.dispatch).toHaveBeenCalledWith("journal/updateEntry", {"date": 1227077227978, "id": "11111", "picture": undefined, "text": "Prueba 1"})

    });
    test('should delete on click button', (done) => {
        // here we are mocking the response, not calling it
        Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }) )
        // here we are firing
        wrapper.find('.btn-danger').trigger('click')

        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Si, estoy seguro'
        })
        setTimeout(() => {
            expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "11111")
            expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
            done() 
        });
    });
});