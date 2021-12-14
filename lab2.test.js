const checkToggleEye = jest.fn('./lab2');

test('check toggle eye', () => {
  expect(checkToggleEye.mock.calls.length).toBe(0);
});