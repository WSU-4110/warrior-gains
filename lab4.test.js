const checkRemovePasswordStrength = jest.fn('./lab4');

test('check remove password strength', () => {
  expect(checkRemovePasswordStrength.mock.calls.length).toBe(0);
});