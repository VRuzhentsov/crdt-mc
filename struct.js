
type Transaction = {
  timestamp : number,
  author : string,
  message : string
}

type Block = {
  hash : string | null,
  prevHash : string | null,
  index : number,
  txs : Array<Transaction>
}

type Blockchain = {
  chain: Array<Block>;
}


export const Genesis : Block = {
  hash: "",
  prevHash: null,
  index: 0,
  txs: []
};
