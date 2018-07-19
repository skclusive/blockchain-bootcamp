import Transaction from '../transaction';
import Block from '../block';
import Blockchain from '../blockchain';
import {sha256Hash, saveChain, loadChain} from '../utils';

export default async function main() {
  const blockchain = new Blockchain();

  // Creating first block
  const block = new Block(blockchain.recentBlock)
    .addTransaction(new Transaction('Senthilnathan', 'Naguvan', 10))
    .addTransaction(new Transaction('Naguvan', 'Dev', 20))
    .finalize();

  console.info(`\nValidate Block: ${block.validate()}`);
  console.info(`\nTransaction Count: ${block.transactionCount}`);

  console.info(`\nValidate Block (Before Finalize): ${block.validate()}`);

  try {
    block.finalize();
  } catch (err) {
    console.info(`Expected error. re calling finalize throws error`);
  }

  console.info(`\nValidate Block (After Finalize): ${block.validate()}`);

  blockchain.addBlock(block);

  blockchain.validateChain();

  // Creating second block

  blockchain.addBlock(
    new Block(blockchain.recentBlock)
      .addTransaction(new Transaction('Naguvan', 'Sasha', 50))
      .finalize()
  );

  console.info(`\nLength of Blockchain: ${blockchain.count}`);
  console.info(`myblockchain is valid: ${blockchain.validateChain()}`);

  // Save blockchain to file

  if (await saveChain('./data/blockchain.json', blockchain)) {
    console.info('\nBlockchain saved successfully into file blockchain.json');
  }

  console.info(`myblockchain blocks: ${blockchain.count}`);

  // Load blockchain from file

  console.info('\nLoad Blockchain from file');

  const newblockchain = await loadChain('./data/blockchain.json');

  console.info(`newblockchain blocks: ${newblockchain.count}`);
  console.info(`newblockchain is valid: ${newblockchain.validateChain()}`);
}
