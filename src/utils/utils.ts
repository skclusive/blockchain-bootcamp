import util from "util";
import fs from "fs";
import path from "path";
import crypto from "crypto";

import Blockchain from "../blockchain";
import Block, { IBlockData } from "../block";

export function sha256Hash(data: string): string {
    const hash = crypto.createHash("sha256");
    hash.update(data);
    return hash.digest("hex");
}

export async function saveChain(
    file: string,
    blockchain: Blockchain
): Promise<boolean> {
    try {
        const writeFileAsync = util.promisify(fs.writeFile);
        await writeFileAsync(
            path.resolve(file),
            JSON.stringify(blockchain.blocks, null, 2)
        );
        return true;
    } catch (ex) {
        console.error(`Error while writing blocks to file ${ex}`);
        throw ex;
    }
}

export async function loadChain(file: string): Promise<Blockchain> {
    let blockchain = new Blockchain();
    try {
        const readFileAsync = util.promisify(fs.readFile);
        let data = await readFileAsync(path.resolve(file), {
            encoding: "utf8"
        });
        let blocks = JSON.parse(data as string) as IBlockData[];
        for (let item of blocks) {
            blockchain.addBlock(Block.from(blockchain.recentBlock, item));
        }
    } catch (ex) {
        console.error(`Error while loading blocks from file ${ex}`);
        throw ex;
    }
    return blockchain;
}
