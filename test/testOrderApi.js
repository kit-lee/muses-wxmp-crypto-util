/**
 * Created by kit on 2018/1/23.
 */
const sdk = require('../dist/muses-wxmp-crypto-util.min.js');
//var http = require('http');
const https = require('https');
var qs = require('querystring');
var data = {
    appid:'wxmp_8p9xfnhh',
    jscode:'0713CYIb0jSdZs1zkBLb0fySIb03CYIp'
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
    hostname:'face.wxmp.91zmt.com',
    port:443,
    path:'/api/v1/session?'+params,
    method:'GET',
    headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Muses-Timestamp':ts,
        'Muses-Signature':sign
    }
}
https.get(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});
/*
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
req.end();*/