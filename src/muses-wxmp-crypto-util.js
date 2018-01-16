const crypto = require('crypto');
const md5 = crypto.createHash('md5');

exports.getSignature = function(params, timestamp, client_secret){
        if(params==undefined || params==null)
            throw new Error('params must not be null.');
        if(typeof params !== 'object')
            throw new Error('params should be a json object.');
        if(timestamp==undefined || timestamp==null || timestamp=='')
            throw new Error('timestamp must not be null or empty.');
        if(client_secret==undefined || client_secret==null || client_secret=='')
            throw new Error('client_secret must not be null or empty,');

        const hmac = crypto.createHmac('sha1', client_secret);

        let md5_str = md5.update(timestamp+client_secret).digest('hex').toUpperCase();
        let keys = [];
        for(let key in params){
            keys.push(key);
        }

        keys.sort();
        let paramStr = '';
        for(let k in keys){
            var t = keys[k];
            paramStr+='&'+t+'='+params[t];
        }

        let signature = hmac.update(paramStr+md5_str).digest('hex').toUpperCase();

        return signature;
}
