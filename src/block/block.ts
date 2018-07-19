import Transaction from "../transaction";
import { sha256Hash } from "../utils";

export interface IBlockHash {
  hash: string;
  timestamp: number;
  prevHash: string | null;
  transactions: number;
}

export interface IBlockData {
  hash: string | null;
  height: number;
  timestamp: number;
  prevHash: string | null;
  transactions: Transaction[];
}

export default class Block {
  private _transactions: Transaction[];
  private _hash: string | null;

  readonly height: number;
  readonly prevHash: string | null;
  readonly timestamp: number;

  constructor(block: Block | null = null) {
    this._transactions = [];
    this.prevHash = block ? block.hash : null;
    this.height = block ? block.height + 1 : 1;
    this._hash = null;
    this.timestamp = new Date().getTime();
  }

  get hash(): string | null {
    return this._hash;
  }

  get hashTransactions(): string {
    return sha256Hash(JSON.stringify(this._transactions));
  }

  get payloadHash(): string {
    return this.hashTransactions;
  }

  get transactionCount(): number {
    return this._transactions.length;
  }

  addTransaction(transaction: Transaction): Block {
    this._transactions.push(transaction);
    return this;
  }

  get hashBlock(): string {
    const hash: IBlockHash = {
      hash: this.payloadHash,
      timestamp: this.timestamp,
      prevHash: this.prevHash,
      transactions: this.transactionCount
    };
    return sha256Hash(JSON.stringify(hash));
  }

  finalize(): Block {
    if (!this._hash) {
      this._hash = this.hashBlock;
    } else {
      throw new Error("Block already finalized");
    }
    return this;
  }

  validate(): boolean {
    return this.hash === this.hashBlock;
  }

  toJSON(): IBlockData {
    return {
      hash: this._hash,
      height: this.height,
      timestamp: this.timestamp,
      prevHash: this.prevHash,
      transactions: this._transactions
    };
  }

  static from(recent: Block | null, data: IBlockData): Block {
    const block = new Block(recent);
    block._hash = data.hash;
    (block as any).prevHash = data.prevHash;
    (block as any).height = data.height;
    (block as any).timestamp = data.timestamp;
    block._transactions = data.transactions.map(t => Transaction.from(t));
    return block;
  }
}
