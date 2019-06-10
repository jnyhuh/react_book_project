const getMain = require('../capstone/src/components/pages/homePage')

test('get request books', () => {
    expect(getBooksByGenre(fiction)).toBe(200);
  });

test('push book rating', () => {
    expect(pushBookRating(5, "harry potter")).toBe(200);
  });

test('delete book rating', () => {
    expect(deleteBookRating(5, "harry potter")).toBe(200);
  });

test('change password', () => {
    expect(changePassword("oldPassword", "NewPassword")).toBe("password changed successfully");
  });

test('create new user', () => {
    expect(createUser("username", "password", "email@email.com")).toBe("user created");
  });

test('login', () => {
  expect(login("username", "password", "email@email.com")).toBe("logged in");
});

test('render login', () => {
  expect(handleAuthState(authState === STATE_LOGIN)).toBe(this.props.history.push('/login'));
});

test('render sign up', () => {
  expect(handleAuthState(authState != STATE_LOGIN)).toBe(this.props.history.push('/signup'));
});