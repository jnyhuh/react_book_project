import {fetchBooks} from '../src/pages/BooksPage'
//fetchBooksOnSearch
jest.mock('../src/pages/BooksPage', () => ({ fetchBooks: ()=> jest.fn() }))

it(`Retrieve Books from fetchBooks`, async () => {
    const result = await fetchBooks()
    await expect(result.data).toBeUndefined
})
