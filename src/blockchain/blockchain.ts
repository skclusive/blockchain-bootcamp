import Block from "../block";

export default class Blockchain {
  private _blocks: Block[] = [];

  get blocks(): Block[] {
    return this._blocks.slice(0);
  }

  get count() {
    return this._blocks.length;
  }

  addBlock(block: Block): Blockchain {
    this._blocks.push(block);
    return this;
  }

  get recentBlock(): Block | null {
    if (this.count > 0) {
      return this._blocks[this.count - 1];
    }
    return null;
  }

  validateChain(): boolean {
    if (this.count > 0) {
      let previous = this._blocks[0];
      if (!previous.validate()) {
        return false;
      }
      for (let i = 1; i < this.count; i++) {
        const current = this._blocks[i];
        if (!current.validate() && current.prevHash === previous.hash) {
          return false;
        }
        previous = current;
      }
    }
    return true;
  }
}
