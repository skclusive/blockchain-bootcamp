import Transaction from "../transaction";
import Block from "../block";
import Blockchain from "./blockchain";

test("should return true if new block is added to blockchain and the chain is validated", () => {
    const blockchain = new Blockchain();

    blockchain
        .addBlock(
            new Block(blockchain.recentBlock)
                .addTransaction(new Transaction("Senthilnathan", "Naguvan", 10))
                .finalize()
        )
        .addBlock(
            new Block(blockchain.recentBlock)
                .addTransaction(new Transaction("Naguvan", "Dev", 2))
                .finalize()
        );

    expect(blockchain.validateChain()).toBe(true);
});
