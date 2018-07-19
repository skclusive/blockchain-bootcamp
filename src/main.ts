import Transaction from "./transaction";
import Block from "./block";
import Blockchain from "./blockchain";
import { sha256Hash, saveChain, loadChain } from "./utils";

export default async function main() {
    // Creating List
    let mylist = [1, 1, 2, 3, 5, 8];
    console.log(`\nLength: ${mylist.length}`);

    // Appending to List
    mylist.push(13);
    console.log("\nList Elements: ", mylist);

    // Slicing list
    console.log("\nSlicing List");

    console.log("slice(1,3): ", mylist.slice(1, 3));
    console.log("slice(0,3): ", mylist.slice(0, 3));
    console.log("slice(-1): ", mylist.slice(-1));
    console.log("slice(-2): ", mylist.slice(-2));

    // Iterating list
    console.log("\nIterating List");
    for (let item of mylist) {
        console.log(item);
    }

    // Dict
    let person = { name: "Senthilnathan", country: "India", age: 34 };
    console.log("\nDict: ", person);

    // Creating hash for a string

    console.log(
        "\nHash for 'Blockchain is simple': ",
        sha256Hash("Blockchain is simple")
    );

    // Creating first block

    let txn1 = new Transaction("Senthilnathan", "Naguvan", 10);

    console.log("\n" + txn1.toString());

    let txn2 = new Transaction("Naguvan", "Dev", 20);

    console.log("\n" + txn2.toString());

    let myblockchain = new Blockchain();

    let block = new Block(myblockchain.recentBlock);

    block.addTransaction(txn1);

    block.addTransaction(txn2);

    console.log(`\nTransaction Count: ${block.transactionCount}`);

    block.finalize();

    console.log(`\nValidate Block: ${block.validate()}`);

    // let txn3 = new Transaction("Pardha", "Vinita", 30);

    // block.addTransaction(txn3);

    console.log(`\nTransaction Count: ${block.transactionCount}`);

    console.log(`\nValidate Block (Before Finalize): ${block.validate()}`);

    try {
        block.finalize();
    } catch (err) {
        console.log(`Expected error. re calling finalize throws error`);
    }

    console.log(`\nValidate Block (After Finalize): ${block.validate()}`);

    myblockchain.addBlock(block);

    myblockchain.validateChain();

    // Creating second block

    txn1 = new Transaction("Naguvan", "Sasha", 50);

    block = new Block(myblockchain.recentBlock);

    block.addTransaction(txn1);

    block.finalize();

    myblockchain.addBlock(block);

    console.log(`\nLength of Blockchain: ${myblockchain.count}`);

    console.log(`myblockchain is valid: ${myblockchain.validateChain()}`);

    // Save blockchain to file

    if (await saveChain("./data/blockchain.json", myblockchain)) {
        console.log(
            "\nBlockchain saved successfully into file blockchain.json"
        );
    }

    console.log(`myblockchain blocks: ${myblockchain.count}`);

    // Load blockchain from file

    console.log("\nLoad Blockchain from file");

    let newblockchain = await loadChain("./data/blockchain.json");

    console.log(`newblockchain blocks: ${newblockchain.count}`);

    console.log(`newblockchain is valid: ${newblockchain.validateChain()}`);
}
