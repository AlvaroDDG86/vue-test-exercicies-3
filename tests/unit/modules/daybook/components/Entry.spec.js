import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'

const mockRouter = {
    push: jest.fn()
}
const factory = (options) => {
    return shallowMount(Entry, {
        props: {
            entry: {
                id: '22222',
                date: 1227077227990,
                text: 'Prueba 2'
            }
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        },
        ...options
    })
}
describe('Entry', () => {
    test('should match with snapshot', () => {
        const wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    });
    
    test('should navigate onClick', () => {
        const wrapper = factory()
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: '22222' }})
    });

    test('should render a correct year, month and day', () => {
        const wrapper = factory()
        expect(wrapper.vm.day).toBeGreaterThan(0)
        expect(wrapper.vm.day).toBeLessThan(32)
        expect(typeof wrapper.vm.month).toBe('string')
        expect(typeof wrapper.vm.yearDay).toBe('string')
    });

    test('should render the text smaller than 130 or 130 + ...', () => {
        const wrapper = shallowMount(Entry, {
            props: {
                entry: {
                    id: '22222asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
                    date: 1227077227990,
                    text: 'Prueba 2'
                }
            }})
        expect(wrapper.vm.shortText.length).toBeLessThan(134)
    });
});