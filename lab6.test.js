const checkRemoveCheck = jest.fn('./lab6');

test('check remove check function', () => {
  expect(checkRemoveCheck.mock.calls.length).toBe(0); 
});