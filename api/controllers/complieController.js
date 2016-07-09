/**
 * Created by Zack on 2016/4/4.
 */
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var fs = require("fs");

module.exports = {
  complie: function (req, res) {
    req.file('avatar').upload({
      //设置目录,文件名,大小
      dirname: '../../javaSource',
      saveAs: 'Complier.java',
      maxBytes: 10000000
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      // //编译java文件
      var linuxPath = '/home/ubuntu/workspace/student/javaSource/';
      var path;
      if (typeof process.env.COMPLIE_DIR == 'undefined') {
        path = linuxPath;
      } else {
        path = process.env.COMPLIE_DIR;
      }
      exec('javac ' + path + 'Complier.java', function (cerr, cstdout, cstderr) {
        if (!cerr && !cstderr) {
          //运行java程序
          exec('java -cp ' + path + ' Complier', function (err, stdout, stderr) {
            if (err) throw err;
            console.log(stdout);
            res.json({
              data: stdout,
              err: err || stderr
            });
          });
        } else {
          res.json({err: cerr, stderr: cstderr});
        }
      });
    });
  }
};
