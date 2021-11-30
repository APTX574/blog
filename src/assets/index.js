import Web3 from "web3";
// const Express = require('express');
// const app = Express();
// app.get('/', (req, res) => {
//   console.log(req.url);
// })
import BlogArtifact from "../../build/contracts/Blog.json";
// import 'style-loader ! css-loader ./userPage.css';

const App = {
  web3: null,
  account: null,
  blog: null,

  start: async function () {
    const {
      web3
    } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BlogArtifact.networks[networkId];
      this.blog = new web3.eth.Contract(
        BlogArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
  register: async function () {
    const {
      register
    } = this.blog.methods;
    let name = document.getElementById("name").value;
    let content = document.getElementById("content").value;
    let f = await register(name, content).send({
      from: this.account
    });
    console.log(content);
    console.log(f);

  },
  login: async function (req, res) {

    window.location.href="userPage.html";
    const {
      login
    } = this.blog.methods;


    let userNameNode = document.getElementById('userName');
    let interNode = document.getElementById('inter');
    let user = await login().call();
    userNameNode.innerHTML = user[0];
    interNode.innerHTML = user[1]

  }



}

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();

});

// var server = app.listen(8080, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })