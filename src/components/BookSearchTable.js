import React from 'react';
import PropTypes from 'utils/propTypes';
import { Table } from 'reactstrap';

const BookSearchTable = ({ headers, bookData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {bookData.map(({ title, author, publication_date, publisher, isbn, favorite }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">{title}</td>
            <td className="align-middle text-center">{author}</td>
            <td className="align-middle text-center">{publication_date}</td>
            <td className="align-middle text-center">{publisher}</td>
            <td className="align-middle text-center">{isbn}</td> 
            <td className="align-middle text-center">{favorite}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

BookSearchTable.propTypes = {
  headers: PropTypes.node,
  bookData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      publication_date: PropTypes.int,
      publisher: PropTypes.string,
      isbn: PropTypes.string,
    })
  ),
};

BookSearchTable.defaultProps = {
  headers: [],
  bookData: [],
};

export default BookSearchTable;
