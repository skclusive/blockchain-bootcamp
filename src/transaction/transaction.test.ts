import Transaction from './transaction';

test('should be constructed', () => {
  const tx = new Transaction('Senthilnathan', 'Naguvan', 100);

  expect(tx.sender).toEqual('Senthilnathan');
  expect(tx.receiver).toEqual('Naguvan');
  expect(tx.amount).toEqual(100);
});
