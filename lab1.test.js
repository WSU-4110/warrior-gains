const checkDarkMode = jest.fn('./lab1');

test('check dark mode', () => {
  expect(checkDarkMode.mock.calls.length).toBe(0);
});