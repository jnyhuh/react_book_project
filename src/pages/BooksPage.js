import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import {
  booksRead,
} from 'demos/dashboardPage';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import SearchInput from 'components/SearchInput';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class BooksPage extends React.Component {
  render() {
    return (
      <Page
        className="Books"
        title="Your Books"
      >
        <Row>
            <Col md="6" sm="4" xs="2">
                <SearchInput />
            </Col>
        </Row>
        <Row>
          <Col md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Books Read</CardHeader>
              <CardBody>
                {booksRead.map(
                  ({ id, image, title, author, right }) => (
                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      author={author}
                      right={right}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default BooksPage;