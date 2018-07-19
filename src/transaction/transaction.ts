export interface ITransaction {
    sender: string;
    receiver: string;
    amount: number;
    timestamp: number;
}

export default class Transaction {
    readonly timestamp: number;

    constructor(
        public sender: string,
        public receiver: string,
        public amount: number
    ) {
        this.timestamp = new Date().getTime();
    }

    toString() {
        return `Transaction: ${this.sender} sent ${this.amount} units to ${
            this.receiver
        } at ${this.timestamp}`;
    }

    toJSON(): ITransaction {
        const { timestamp, sender, receiver, amount } = this;
        return { timestamp, sender, receiver, amount };
    }

    static from(data: ITransaction): Transaction {
        const transaction = new Transaction(
            data.sender,
            data.receiver,
            data.amount
        );
        (transaction as any).timestamp = data.timestamp;
        return transaction;
    }
}
