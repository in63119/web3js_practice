require("dotenv").config();

const { Web3 } = require("web3");
const rpcURL = "https://api.baobab.klaytn.net:8651"; // 클레이튼 바오밥 테스트넷
const web3 = new Web3(rpcURL);

const abi = require("./abi.json");
const ca = "0x52139e61ebB2D740a99Cd577c12B72A4c1C783e9"; // Contract Address
const account = "0xF959343f3dA502C04423C028816b540cE6af368D"; // 내 Address
const privateKey = process.env.PRIVATEKEY; // .env.example에 자신의 비밀키를 넣으세요. 파일명에서 '.example'을 꼭 지우고 사용하세요! (.env 만 사용)

const contract = new web3.eth.Contract(abi, ca);
const message =
  "여러분 블록체인에서 트랜잭션 전송할 때 디지털 서명이 쓰입니다!";

const getHelloWorld = async () => {
  const result = await contract.methods.getGreeting().call();
  console.log(result);
};

const setHelloWorld = async () => {
  const setGreeting = await contract.methods.setGreeting(message).encodeABI();
  const estimate = await contract.methods.setGreeting(message).estimateGas({
    from: account,
  });

  const signTx = (
    await web3.eth.accounts.signTransaction(
      {
        from: account,
        to: ca,
        gas: estimate,
        gasPrice: await web3.eth.getGasPrice(),
        data: setGreeting,
      },
      privateKey
    )
  ).rawTransaction;

  await web3.eth.sendSignedTransaction(signTx).then((hash, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("성공!!!!", hash);
      return hash;
    }
  });

  getHelloWorld();
};

// getHelloWorld();
setHelloWorld();
