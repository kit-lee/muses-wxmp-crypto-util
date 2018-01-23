/**
 * Created by kit on 2018/1/23.
 */
const sdk = require('../dist/muses-wxmp-crypto-util.min.js');
var http = require('http');
var qs = require('querystring');
var data = {
    appid:'wxmp_8p9xfnhh',
    openid:'kit'
}
var ts = new Date().getTime();
var sign = sdk.getSignature(
    data,
    ts,
    'NzToVz83v7DgG7MJ9UnYq9G39wb7aVZ3'
);
console.log('signature : '+sign);
var params = qs.stringify(data);
var options={
    hostname:'localhost',
    port:8080,
    path:'/api/v1/identitis?'+params,
    method:'GET',
    headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Muses-Timestamp':ts,
        'Muses-Signature':sign
    }
}
var req=http.request(options,function(res){
    console.log('STATUS:'+res.statusCode);
    console.log('HEADERS:'+JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log('数据片段分隔-----------------------\r\n');
        console.log(chunk);
    });
    res.on('end',function(){
        console.log('响应结束********');
    });
});
req.on('error',function(err){
    console.error(err);
});
req.end();