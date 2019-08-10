import FavBooksPage from  '../src/pages/FavBooksPage'

//jest.mock('../src/pages/FavBooksPage', () => ({ FavBooksPage: ()=> jest.fn() }))

jest.mock('../src/pages/FavBooksPage')

describe('favorite books reducer', () => {
    const initialState = {
        data: null,
        error: null,
        modalShow: false,
        showRecord: false,
    };
    
    it('returns the initial state when an action type is not passed', () => {
        const reducer = FavBooksPage(undefined, {});
        expect(reducer).toEqual(initialState);
    });
});
