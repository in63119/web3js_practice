const { Web3 } = require("web3");
const rpcURL = "https://api.baobab.klaytn.net:8651";

const web3 = new Web3(rpcURL);

const account = "0xF959343f3dA502C04423C028816b540cE6af368D";

// 잔액 조회
const getBalance = async () => {
  const balance = await web3.eth.getBalance(account);
  const convert = await web3.utils.fromWei(balance, "ether");
  console.log(convert);
};

// 특정 트랜잭션 조회
const getTx = async () => {
  const tx =
    "0x1bacd17701e35e1a4f5a0fd3581c4b498650088f0434ce48258c146d2712966f";
  const result = await web3.eth.getTransaction(tx);

  console.log(result);
};

// 특정 블록 조회
const getBlock = async () => {
  const blockNum = 41374286;
  const result = await web3.eth.getBlock(blockNum);

  console.log(result);
};

getBlock();
