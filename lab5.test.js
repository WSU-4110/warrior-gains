const checkBgToBody = jest.fn('./lab5');

test('check add check function', () => {
  expect(checkBgToBody.mock.calls.length).toBe(0); 
});