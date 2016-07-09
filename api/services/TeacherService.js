/**
 * Created by JTian on 2016/4/2.
 */
var Thenjs = require('thenjs');
var _ = require('underscore');

module.exports = {
  /**
   * 教师登陆
   * @param tch_num
   * @param tch_password
   * @param callback
   */
  login: function (tch_num, tch_password, callback) {
    Teacher.findOne({tch_num: tch_num}, function (err, teacher) {
      console.log('teacher:', teacher);
      if (!_.isObject(teacher)) {
        return callback('找不到教师');
      }
      if (teacher.tch_password == tch_password) {
        return callback(null, teacher);
      } else {
        return callback('密码错误');
      }
    })
  },
  /**
   * 教师注册
   * @param teacher
   * @param callback
   */
  register: function (teacher, callback) {
    Teacher.find({tch_num: teacher.tch_num}, function (err, teachers) {
      if (teachers.length != 0) {
        return callback("该账号已存在，注册失败！")
      } else {
        Teacher.create(teacher, function (err, teacher) {
          if (teacher.length != 0) {
            callback(err, teacher)
          }
        })
      }
    })
  },
  getTeacherInfo: function (tch_id, callback) {
    Thenjs(function (cont) {
      Teacher.findOne({id: tch_id}, function (err, teacher) {
        console.log('教师信息',teacher);
        if (teacher) {
          cont(err, teacher);
        } else {
          return callback('该教师没注册');
        }
      })
    }).then(function (cont, teacher) {
      Course.find({tch_name: teacher.tch_name}, function (err, courses) {
        console.log('课程信息' ,courses);
        var result ={
          teacher:teacher,
          courses:courses
        };
        callback(err,result);
      })
    })
  }

}
