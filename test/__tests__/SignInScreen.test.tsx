import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react-native';
import { SignInScreen } from '../../src/SignInScreen';
import { FuegoBase } from '../mocks/firebase_mocks';
import sinon from 'sinon';

let sandbox: sinon.SinonSandbox;
beforeEach(() => {
  sandbox = sinon.createSandbox();
});
afterEach(() => {
  sandbox.restore();
});

const testEmail = 'spoon@spoon.spoon';
const testPassword = 'spoon 1';
test('SignIn screen has a form that calls sign in', async () => {
  const f = new FuegoBase();
  // @ts-ignore
  sandbox.spy(f);
  const { getByTestId, getByText, queryByTestId } = render(<SignInScreen firebase={f} />);

  const input = getByTestId('username-input');
  fireEvent.changeText(input, testEmail);

  await wait(() => expect(queryByTestId('username-input')).toBeTruthy());

  const passInput = getByTestId('password-input');
  fireEvent.changeText(passInput, testPassword);

  const result = getByTestId('username-input');
  expect(result).toMatchSnapshot();
  expect(result.props.value).toBe(testEmail);

  const signup = getByText('Sign Up');
  fireEvent.press(signup);

  // @ts-ignore
  expect(f.signupWithEmail.calledOnce).toEqual(true);
});

test('SignIn screen has a form that does stuff', async () => {
  const f = new FuegoBase();
  // @ts-ignore
  sandbox.spy(f);
  const { getByTestId, getByText, queryByTestId } = render(<SignInScreen firebase={f} />);
  const testEmail = 'spoon@spoon.spoon';
  const testPassword = 'spoon 1';

  const input = getByTestId('username-input');
  fireEvent.changeText(input, testEmail);

  await wait(() => expect(queryByTestId('username-input')).toBeTruthy());

  const passInput = getByTestId('password-input');
  fireEvent.changeText(passInput, testPassword);

  const result = getByTestId('username-input');
  expect(result).toMatchSnapshot();
  expect(result.props.value).toBe(testEmail);

  const signup = getByText('Sign Up');
  fireEvent.press(signup);

  // @ts-ignore
  expect(f.signupWithEmail.calledOnce).toEqual(true);
});
