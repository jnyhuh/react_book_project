import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { withFirebase } from '../Firebase';

const PasswordForgetPage = () => (
  <Row
    style={{
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Col md={6} lg={4}>
      <Card body>
        <PasswordForgetForm />
      </Card>
    </Col>
  </Row>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <div className="text-center pb-4">
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer' }}
            alt="logo"
          />
        </div>
        <FormGroup>
          <Input {...this.props.emailInputProps} value={email} onChange={this.onChange} />
        </FormGroup>
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          disabled={isInvalid}
          type="submit">
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

PasswordForgetFormBase.propTypes = {
  emailInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

PasswordForgetFormBase.defaultProps = {
  emailInputProps: {
    name: 'email',
    type: 'email',
    placeholder: 'Your Email Address',
  },
  onLogoClick: () => {},
};

const PasswordForgetLink = () => (
  <p>
    <Link to={'/pw-forget'}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };