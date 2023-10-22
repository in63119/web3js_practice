require("dotenv").config();

const { Web3 } = require("web3");
const rpcURL = "https://api.baobab.klaytn.net:8651"; // 클레이튼 바오밥 테스트넷
const web3 = new Web3(rpcURL);

const abi = require("./abi.json");
const ca = "컨트랙트 주소"; // Contract Address
const account = "내 주소"; // 내 Address
const privateKey = process.env.PRIVATEKEY; // .env.example에 자신의 비밀키를 넣으세요. 파일명에서 '.example'을 꼭 지우고 사용하세요! (.env 만 사용)

const contract = new web3.eth.Contract(abi, ca);
const message = "세상아 안녕"; // HelloWorld 대신 변경하고픈 메시지를 넣으세요.

const getHelloWorld = async () => {
  const result = await contract.methods.getGreeting().call();

  console.log(result);
};

const setHelloWorld = async () => {
  const setGreeting = await contract.methods.setGreeting(message).encodeABI();
  const estimate = await contract.methods.setGreeting(message).estimateGas({
    from: account,
  });

  const result = await web3.eth.accounts
    .signTransaction(
      {
        from: account,
        to: ca,
        gas: estimate,
        gasPrice: await web3.eth.getGasPrice(),
        data: setGreeting,
      },
      privateKey
    )
    .then(async (Tx) => {
      await web3.eth
        .sendSignedTransaction(Tx.rawTransaction)
        .then((hash, err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("성공!", hash);
            return hash;
          }
        });
    });
};

getHelloWorld();
// setHelloWorld();
