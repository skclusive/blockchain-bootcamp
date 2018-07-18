import chai from "chai";

const assert = chai.assert;
const expect = chai.expect;

import Transaction from "../src/transaction";
import Block from "../src/block";
import Blockchain from "../src/blockchain";
import { sha256Hash } from "../src/utils";

declare var describe: any;
declare var it: any;

describe("Helper", function() {
    describe("sha256Hash", function() {
        it("should return true when hash value equals for the given input", function() {
            assert.equal(sha256Hash("Test"), sha256Hash("Test"));
        });

        it("should return true when hash value not equals for the given input", function() {
            assert.notEqual(sha256Hash("Test"), sha256Hash("test"));
        });
    });
});

describe("Transaction", function() {
    let tx = new Transaction("Satheesh", "Chaitra", 10);

    it("should be constructed", function() {
        assert.equal(tx.sender, "Satheesh");
        assert.equal(tx.receiver, "Chaitra");
        assert.equal(tx.amount, 10);
    });
});

describe("Block", function() {
    let tx = new Transaction("Satheesh", "Chaitra", 10);
    let newtx = new Transaction("Chaitra", "Nala", 10);
    let block = new Block();

    describe("getTransactionCount", function() {
        it("should return 0 when no transaction added to the block", function() {
            assert.equal(block.transactionCount, 0);
        });
    });

    describe("add_transaction", function() {
        it("should add the transaction to the block and increase the transaction count", function() {
            block.addTransaction(tx);
            assert.equal(block.transactionCount, 1);
        });
    });

    describe("validate", function() {
        it("should return false if the block is not finalized", function() {
            assert.isFalse(block.validate());
            assert.isNull(block.hash);
        });
    });

    describe("finalize", function() {
        it("should finalize the block and create the hash for the payload", function() {
            assert.isFalse(block.validate());
            block.finalize();
            assert.isNotNull(block.hash);
            assert.isNull(block.prevHash);
            assert.equal(block.height, 1);
            assert.isTrue(block.validate());
        });

        it("should throw error if called twice", function() {
            expect(() => block.finalize()).throws(Error);
        });

        it("should return false if new transaction added after block is finalized", function() {
            let old_hash = block.hash;
            assert.isTrue(block.validate());
            block.addTransaction(newtx);
            expect(() => block.finalize()).throws(Error);
            let new_hash = block.hash;
            assert.equal(old_hash, new_hash);
            assert.equal(block.validate(), false);
        });
    });
});

describe("Blockchain", function() {
    let tx = new Transaction("Satheesh", "Chaitra", 10);
    let newtx = new Transaction("Chaitra", "Nala", 10);
    let block = new Block();
    block.addTransaction(tx);
    block.finalize();
    let blockchain = new Blockchain();
    blockchain.addBlock(block);

    describe("validate_chain", function() {
        it("should return true if new block is added to blockchain and the chain is validated", function() {
            let newBlock = new Block(blockchain.recentBlock);
            let newTx = new Transaction("Jeeva", "Satheesh", 2);
            newBlock.addTransaction(newTx);
            newBlock.finalize();
            blockchain.addBlock(newBlock);
            assert.isTrue(blockchain.validateChain());
        });
    });
});
