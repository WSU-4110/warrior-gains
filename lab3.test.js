const checkToggle = jest.fn('./lab3');

test('check toggle function', () => {
  expect(checkToggle.mock.calls.length).toBe(0);
});