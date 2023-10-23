const { Web3 } = require("web3");
const rpcURL = "https://api.baobab.klaytn.net:8651";

const web3 = new Web3(rpcURL);

const account = "0xF959343f3dA502C04423C028816b540cE6af368D";

// 잔액 조회
const getBalance = async () => {
  const balance = await web3.eth.getBalance(account);
  console.log(await web3.utils.fromWei(balance, "ether"));
};

// 특정 트랜잭션 조회
const getTx = async (hash) => {
  const result = await web3.eth.getTransaction(hash);
  return result;
};

// 특정 블록 조회
const getBlock = async () => {
  const hash =
    "0x97594192adcb59266021460a62e98d622a485ee900974aff3ef3f402ba3cb347";
  const result = [];
  const txs = (await web3.eth.getBlock(hash)).transactions;

  for (let i = 0; i < txs.length; i++) {
    let tx = await getTx(txs[i]);
    result.push(tx);
  }

  result.map((tx, i) => {
    console.log(`${i}번째 트랜잭션 : `, tx);
  });
};

getBlock();
