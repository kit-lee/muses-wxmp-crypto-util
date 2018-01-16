/**
 * Created by kit on 2018/1/15.
 */
const sdk = require('../dist/muses-wxmp-crypto-util.min.js');

var a = sdk.getSignature(
    {
        c:'1',
        a:'2',
        d:'3'
    },
    new Date().getTime(),
    'muses-hello-weixin'
);
console.log('result : '+a);