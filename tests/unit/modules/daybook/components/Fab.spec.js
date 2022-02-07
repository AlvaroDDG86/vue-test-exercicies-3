import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab'


const factory = (options) => {
    return shallowMount(Fab, {
        ...options
    })
}
describe('About', () => {
    test('should render the component', () => {
        const wrapper = factory()
        expect(wrapper.html()).toMatchSnapshot()
    });
    
    test('Should render the default icon', () => {
        const wrapper = factory()
        expect(wrapper.find('.fa-plus').exists()).toBeTruthy()
    })
    
    test('should render the prop icon "fa-cogs" passed', () => {
        const iconName = 'fa-cogs'
        const wrapper = factory({
            props: {
                icon: iconName
            }
        })
        expect(wrapper.find('.' + iconName).exists()).toBeTruthy()
    });
    
    
    test('should emit on click', () => {
        const wrapper = factory()
        wrapper.find('.btn').trigger('click')
        expect(wrapper.emitted('on:click').length).toBe(1)
    });
})