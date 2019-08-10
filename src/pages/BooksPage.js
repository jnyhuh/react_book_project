import React, { useState } from 'react';
import axios from 'axios';
import Page from 'components/Page';
import { MdSearch } from 'react-icons/md';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, Input, Alert } from 'reactstrap';
import { MdFavorite } from 'react-icons/md';
import BookSearchTable from 'components/BookSearchTable';
import auth0Client from '../Auth';

const BooksPage = () => {
    //fetching the book information
    const API_URL = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/search/'
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState({books: []});
    const [addBooksSuccess, setAddBooksSuccess] = useState('');
    const [addBooksFail, setAddBooksFail] = useState('');

    const fetchBooks = async () => {
      const result = await 
      axios(
        {
            url: `${API_URL}${query}`,
            method: 'get',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
      );
      setBooks(result.data.body);
    }

    const addBooks = (username, isbn, title, author, publication_date, publisher) => {
      const url = 'http://book-tracker-orch1-brave-elephant.mybluemix.net/api/favorites/' + username;
         axios(
            {
                url: url,
                method: 'post',
                data: {
                    "isbn": isbn,
                    "title": title,
                    "author": author,
                    "publication_date": publication_date,
                    "publisher": publisher,
                    "category": "na",
                    "genre": "na"
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'test_token',
                },
            }).then(response => {
                if(response.data.statusCode===200) {
                    console.log('response received')
                    console.log(response)
                    setAddBooksSuccess('success');
                }
                else {
                  console.log('failed to add books', response.data.body)
                  console.log(response)
                  setAddBooksFail('fail');
                }
            })
            .catch(err => {
                  console.log('error', err)
            });
    };

    const bookSearchData = (books) => {
      return(
      books.books.map(book => (
      {
      title: book.title,
      author: bookAuthors(book.author),
      publication_date: book.publication_date,
      publisher: book.publisher,
      isbn: book.isbn,
      favorite: bookIcon(book.isbn, book.title, bookAuthors(book.author), book.publication_date, book.publisher),
      })
      )
      )
    }

    const bookAuthors = (authors) => {
      if (authors.length <= 2) {
        authors = authors.join(' and ')
      }
      else if (authors.length > 2) {
        let lastAuthor = ' and ' + authors.slice(-1);
        authors.pop();
        authors = authors.join(', ');
        authors += lastAuthor;
      };
      return authors;
    }

    const bookIcon = (isbn, title, author, publication_date, publisher) => {
      return(
        <MdFavorite
            size={25}
            className="text-secondary can-click"
            onClick={() => {onAdd(isbn, title, author, publication_date, publisher);}}
          />
        )
      }

    //submit/input handler for the search function
    const onSubmitHandler = (e) => {
      e.preventDefault();
      fetchBooks();
    }

    const onInputChange = (e) => {
      setQuery(e.target.value);
    }

    //getting user information for adding books 
    const fetchUser = () => {
      return auth0Client.getProfile().name
    }

    const UserGreeting = () => {
      return (<Alert color="success">
        Welcome {fetchUser()}! Search for books and add them to your favorites. 
      </Alert>)
    }
    
    const GuestGreeting = () => {
      return (
        <Alert color="info">
          Welcome guest! You can search for books, but you must be logged in to add books to your favorites.
        </Alert>
      );
    }

    function Greeting() {
      if (auth0Client.isAuthenticated()){
        return <UserGreeting />
      }
      else{
       return <GuestGreeting />;
      }
    }

    //Set notification if user added a book
    const NotificationStart = () => {
      return (<Alert color="info">
        Search books here!
      </Alert>)
    }
    
    const NotificationSuccess = () => {
      return (
        <Alert color="success">
          Book added successfully.
        </Alert>
      );
    }

    const NotificationFail = () => {
      return (
        <Alert color="danger">
          Book failed to add.
        </Alert>
      );
    }

    function Notification() {
      if (addBooksSuccess){
        console.log({addBooksSuccess})
        return <NotificationSuccess />
      }
      else if (addBooksFail){
        return <NotificationFail />
      }
      else {
       return <NotificationStart />;
      }
    }

    //add books if a user is logged in
    const onAdd = (isbn, title, author, publication_date, publisher) => {

      if (auth0Client.isAuthenticated()){
        //put in favorites request
        addBooks(fetchUser(), isbn, title, author, publication_date, publisher)
      }
    }
    
    return (
      <Page
      className="Books"
      title="Search for Books"
      >
      <Greeting />
      <Notification />
      <Row>
          <Col md="6" sm="4" xs="2">
          <Form inline className="cr-search-form" onSubmit={onSubmitHandler}>
              <MdSearch
              size="20"
              className="cr-search-form__icon-search text-secondary"
              />
              <Input
              type="search"
              className="cr-search-form__input"
              placeholder="Search..."
              onChange={onInputChange}
              value={query}
              />
              <Button type="submit" color="primary">Search</Button>
          </Form>
          </Col>
      </Row>
      <Col md="12" sm="12" xs="12">
        <Card>
          <CardHeader>Search Results</CardHeader>
          <CardBody>
            <BookSearchTable
              headers={[
                'Title',
                'Author',
                'Date',
                'Publisher',
                'ISBN',
                'Favorite',
              ]}
              bookData={bookSearchData(books)}
            />
          </CardBody>
        </Card>
      </Col>
  </Page>
    );
  }

  export default BooksPage