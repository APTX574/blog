import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import ElementPlus from 'element-plus'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import axios from "axios";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import Web3 from "web3";
// const Express = require('express');
// const app = Express();
// app.get('/', (req, res) => {
//   console.log(req.url);
// })
import BlogArtifact from "../build/contracts/Blog.json";
import Prism from 'prismjs';
import 'mavon-editor/dist/css/index.css'

VMdPreview.use(vuepressTheme, {
    Prism,
});


// import 'style-loader ! css-loader ./userPage.css';

const cont = {
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
            console.log(this.account);

        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },
    register: async function () {
        const {
            register
        } = this.blog.methods;
        await register("name", "mas").send({
            from: this.account
        }).then((value) => {
            console.log(value);
        })
        // await register()
        // // await register(23243).call()
        // this.blog.events.creatuser('latest', {
        //     filter: {}
        // }, function (error,event) {
        //     console.log(0+event.returnValues.t)
        // })

    },
    addBlog: async function (title,hashcode) {
        const {
            addBlog
        } = this.blog.methods;
        console.log(hashcode);
        //
        return await addBlog(hashcode, title).send({
            from: this.account
        })
        // await register()
        // // await register(23243).call()
        // this.blog.events.creatuser('latest', {
        //     filter: {}
        // }, function (error,event) {
        //     console.log(0+event.returnValues.t)
        // })

    },
    // login: async function () {
    //
    //     window.location.href="userPage.html";
    //     const {
    //         login
    //     } = this.blog.methods;
    //
    //
    //     let userNameNode = document.getElementById('userName');
    //     let interNode = document.getElementById('inter');
    //     let user = await login().call();
    //     userNameNode.innerHTML = user[0];
    //     interNode.innerHTML = user[1]

    // }


}


window.cont = cont;

Window.load = function () {
    if (window.ethereum) {
        // use MetaMask's provider
        cont.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts
    } else {
        console.warn(
            "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
        );
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        cont.web3 = new Web3(
            new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
        );
    }

    cont.start();

}


// var server = app.listen(8080, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })


const app = createApp(App);
app.use(ElementPlus);
installElementPlus(app);
app.use(VMdPreview);


VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});
// app.use(axios);

app.use(VueMarkdownEditor);

app.use(router).mount('#app');
