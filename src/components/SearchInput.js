import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Button, Form, Input } from 'reactstrap';

const SearchInput = () => {
  return (
    <Form inline className="cr-search-form" onSubmit={this.onFormSubmit}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search for books here!"
        value={this.state.volume}
        onChange={e => this.setState({ volume: e.target.value })}
      />
      <Button type="submit" color="primary">Search</Button>
    </Form>
  );
};

export default SearchInput;