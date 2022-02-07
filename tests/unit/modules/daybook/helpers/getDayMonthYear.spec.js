import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'

describe('getDayMonthYear', () => {
    test('should return the correct format from dateString', () => {
        const dateString = '01/01/2021'
        expect(getDayMonthYear(dateString)).toEqual({ day: 1, month: 'Enero', yearDay: '2021, Viernes' })
    });
});