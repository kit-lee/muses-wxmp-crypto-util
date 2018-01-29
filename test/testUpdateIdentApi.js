/**
 * Created by kit on 2018/1/23.
 */
const sdk = require('../dist/muses-wxmp-crypto-util.min.js');
var http = require('http');
var qs = require('querystring');

var args = process.argv.splice(2);
if(args.length==0)
    throw new Error('missing args');

var updateIdent = function(sms) {
    var ts = new Date().getTime();
    var data2 = {
        appid: 'wxmp_8p9xfnhh',
        openid: 'kit',
        name: '李先生',
        mobilePhone:'18589203518',
        smscode: sms,
        idno: '440103199901160666'
    }

    var sign2 = sdk.getSignature(
        data2,
        ts,
        'NzToVz83v7DgG7MJ9UnYq9G39wb7aVZ3'
    );
    console.log('signature : ' + sign2);
    var params2 = qs.stringify(data2);
    var options2 = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/identitis/2?' + params2,
        method: 'POST',
        headers: {
            //'Content-Type':'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Muses-Timestamp': ts,
            'Muses-Signature': sign2
        }
    }
    var req2 = http.request(options2, function (res) {
        console.log('STATUS:' + res.statusCode);
        console.log('HEADERS:' + JSON.stringify(res.headers));
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            console.log('数据片段分隔-----------------------\r\n');
            console.log(chunk);
        });
        res.on('end', function () {
            console.log('响应结束********');
        });
    });
    req2.on('error', function (err) {
        console.error(err);
    });
    req2.end();
}

updateIdent(args[0]);