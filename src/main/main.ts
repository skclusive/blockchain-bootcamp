import Transaction from '../transaction';
import Block from '../block';
import Blockchain from '../blockchain';
import {sha256Hash, saveChain, loadChain} from '../utils';

export default async function main() {
  // Creating List
  let mylist = [1, 1, 2, 3, 5, 8];
  console.info(`\nLength: ${mylist.length}`);

  // Appending to List
  mylist.push(13);
  console.info('\nList Elements: ', mylist);

  // Slicing list
  console.info('\nSlicing List');

  console.info('slice(1,3): ', mylist.slice(1, 3));
  console.info('slice(0,3): ', mylist.slice(0, 3));
  console.info('slice(-1): ', mylist.slice(-1));
  console.info('slice(-2): ', mylist.slice(-2));

  // Iterating list
  console.info('\nIterating List');
  for (let item of mylist) {
    console.info(item);
  }

  // Dict
  let person = {name: 'Senthilnathan', country: 'India', age: 34};
  console.info('\nDict: ', person);

  // Creating hash for a string

  console.info(
    '\nHash for "Blockchain is simple": ',
    sha256Hash('Blockchain is simple')
  );

  // Creating first block

  let txn1 = new Transaction('Senthilnathan', 'Naguvan', 10);

  console.info('\n' + txn1.toString());

  let txn2 = new Transaction('Naguvan', 'Dev', 20);

  console.info('\n' + txn2.toString());

  let myblockchain = new Blockchain();

  let block = new Block(myblockchain.recentBlock);

  block.addTransaction(txn1);

  block.addTransaction(txn2);

  console.info(`\nTransaction Count: ${block.transactionCount}`);

  block.finalize();

  console.info(`\nValidate Block: ${block.validate()}`);

  // let txn3 = new Transaction("Pardha", "Vinita", 30);

  // block.addTransaction(txn3);

  console.info(`\nTransaction Count: ${block.transactionCount}`);

  console.info(`\nValidate Block (Before Finalize): ${block.validate()}`);

  try {
    block.finalize();
  } catch (err) {
    console.info(`Expected error. re calling finalize throws error`);
  }

  console.info(`\nValidate Block (After Finalize): ${block.validate()}`);

  myblockchain.addBlock(block);

  myblockchain.validateChain();

  // Creating second block

  txn1 = new Transaction('Naguvan', 'Sasha', 50);

  block = new Block(myblockchain.recentBlock);

  block.addTransaction(txn1);

  block.finalize();

  myblockchain.addBlock(block);

  console.info(`\nLength of Blockchain: ${myblockchain.count}`);

  console.info(`myblockchain is valid: ${myblockchain.validateChain()}`);

  // Save blockchain to file

  if (await saveChain('./data/blockchain.json', myblockchain)) {
    console.info('\nBlockchain saved successfully into file blockchain.json');
  }

  console.info(`myblockchain blocks: ${myblockchain.count}`);

  // Load blockchain from file

  console.info('\nLoad Blockchain from file');

  let newblockchain = await loadChain('./data/blockchain.json');

  console.info(`newblockchain blocks: ${newblockchain.count}`);

  console.info(`newblockchain is valid: ${newblockchain.validateChain()}`);
}
