/**
 * Created by Zack on 2016/3/31.
 */
var crypto = require('crypto');

module.exports = {
  handle: function (req, res) {
    var token = 'zack';
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");
    if(code===signature){
      res.send(echostr)
    }else{
      res.send("error");
    }
  }
};
