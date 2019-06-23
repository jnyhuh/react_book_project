import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

import { FirebaseContext } from '../components/Firebase';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <FirebaseContext.Consumer>
              { firebase =>
                <AuthForm
                  firebase={firebase}
                  authState={this.props.authState}
                  onChangeAuthState={this.handleAuthState}
                  onLogoClick={this.handleLogoClick}
                />
              }
            </FirebaseContext.Consumer>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
