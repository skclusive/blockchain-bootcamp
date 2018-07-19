import Transaction from "../transaction";
import Block from "./block";

test("should return 0 when no transaction added to the block", () => {
  const block = new Block();

  expect(block.transactionCount).toBe(0);
});

test("should add the transaction to the block and increase the transaction count", () => {
  const block = new Block().addTransaction(
    new Transaction("Senthilnathan", "Naguvan", 10)
  );

  expect(block.transactionCount).toBe(1);
});

test("should return false if the block is not finalized", () => {
  const block = new Block().addTransaction(
    new Transaction("Senthilnathan", "Naguvan", 10)
  );

  expect(block.validate()).toBe(false);
  expect(block.hash).toBeNull();
});

test("should finalize the block and create the hash for the payload", () => {
  const block = new Block().addTransaction(
    new Transaction("Senthilnathan", "Naguvan", 10)
  );

  block.finalize();

  expect(block.hash).not.toBeNull();
  expect(block.prevHash).toBeNull();
  expect(block.height).toBe(1);
  expect(block.validate()).toBe(true);
});

test("should throw error if called twice", () => {
  const block = new Block().addTransaction(
    new Transaction("Senthilnathan", "Naguvan", 10)
  );
  block.finalize();

  expect(() => block.finalize()).toThrowError(Error);
});

test("should return false if new transaction added after block is finalized", () => {
  const block = new Block().addTransaction(
    new Transaction("Senthilnathan", "Naguvan", 10)
  );
  block.finalize();

  const oldHash = block.hash;

  expect(block.validate()).toBe(true);
  block.addTransaction(new Transaction("Naguvan", "Dev", 10));

  expect(() => block.finalize()).toThrowError(Error);
  const newHash = block.hash;

  expect(oldHash).toBe(newHash);
  expect(block.validate()).toBe(false);
});
