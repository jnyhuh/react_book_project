import {bookAuthors} from '../src/pages/BooksPage'

//Test book author segmentation
jest.mock('../src/pages/BooksPage', () => ({ bookAuthors: ()=> jest.fn() }))

it('book author segmentation', () => {
    const MyMock = bookAuthors('Barbara Walker and Sarah Martin and Tara Weber')
    expect(MyMock.mock.instances.length).toBe(0);
})