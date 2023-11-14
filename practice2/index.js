require("dotenv").config();

const { Web3 } = require("web3");
const rpcURL = "자신의 Infura RPC URL";
const web3 = new Web3(rpcURL);

const abi = require("./abi.json");
const ca = "컨트랙트 주소"; // Contract Address
const account = "내 주소"; // 내 Address
const privateKey = process.env.PRIVATEKEY; // .env.example에 자신의 비밀키를 넣으세요. 파일명에서 '.example'을 꼭 지우고 사용하세요! (.env 만 사용)

const contract = new web3.eth.Contract(abi, ca);
const message = "세상아 안녕"; // HelloWorld 대신 변경하고픈 메시지를 넣으세요.

const getHelloWorld = async () => {};

const setHelloWorld = async () => {};

getHelloWorld();
// setHelloWorld();
