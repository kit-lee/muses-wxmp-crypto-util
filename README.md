# 妙思科技微信小程序后台API加密工具

此工具类主要用于小程序前端开发方调用妙思的小程序后台数据API时生成加密签名



### 下载

```shell
git clone https://github.com/kit-lee/muses-wxmp-crypto-util.git
```



### 使用

引入已压缩的js

```javascript
const sdk = require('muses-wxmp-crypto-util.min.js');
```

将API的各参数组成JSON对象，不需要考虑参数名的排序，生成签名时工具会自动为您排序好

```javascript
var params = {
        c:'1',
        a:'2',
        d:'3'
    }
```

定义好平台分配的**client_secret**，调用工具的`getSignature`方法获得签名

```javascript
var client_secret = 'client_secret';
var sign = sdk.getSignature(params, new Date().getTime(), client_secret);
console.log('sign='+sign);
```

#### getSignature参数说明

`getSignature(params,  timestamp, client_secret);`

返回: 签名字符串

| 参数            | 类型          | 说明               |
| ------------- | ----------- | ---------------- |
| params        | JSON Object | API参数项组成的json对象  |
| timestamp     | Number      | 时间戳，以毫秒为单位的当前时间值 |
| client_secret | String      | 平台分配的客户端secret密钥 |

#### 例子

详细请见test目录下的example.js

运行例子：

```shell
npm run-script test
```

