/**
 * Created by Zack on 2016/4/1.
 */
var Thenjs = require('thenjs');
var _ = require('underscore');


module.exports = {
  /**
   * 学生选课
   * @param stu_num
   * @param course_id
   * @param callback
   */
  courseSelect: function (stu_num, course_id, callback) {
    Thenjs(function (cont) {
      Student.findOne({stu_num: stu_num}, function (err, student) {
        if (student) {
          cont(err, student);
        } else {
          return callback('没有找到学生');
        }
      })
    }).then(function (cont, student) {
      Course.findOne({id: course_id, status: true}, function (err, course) {
        console.log('找到course', course);
        if (course) {
          cont(err, student, course);
        } else {
          return callback('没有找到课程');
        }
      })
    }).then(function (cont, student, course) {
      //查询是否已经选课
      CourseSelect.find({stu_num: stu_num, course_id: course_id, status: true}, function (err, result) {
        console.log('找到选课关系', result);
        if (result.length == 0) {
          cont(err, student, course)
        } else {
          return callback('你已经选过这课');
        }
      })
    }).then(function (cont, student, course) {
      var newSelect = {
        stu_num: stu_num,
        course_id: course_id,
        sc_time_range: course.course_duration,
        sc_time: new Date().getTime(),
        sc_rem: student.stu_name + ' 选 ' + course.course_cname + ', 课时长 ' + course.course_duration,
        status: true
      };
      CourseSelect.create(newSelect, function (err, courseSelect) {
        console.log('新增选课关系', err || courseSelect);
        cont(err, course);
      })
    }).then(function (cont, course) {
      //更新课程人数
      Course.update({id: course_id}, {course_pcount: ++course.course_pcount}, function (err, result) {
        console.log('更新课程选课人数', err || result);
        callback(err, result);
      })
    })
  },
  /**
   * 登陆
   * @param account
   * @param password
   * @param callback
   */
  login: function (account, password, callback) {
    Student.findOne({stu_num: account}, function (err, student) {
      console.log('student:', student);
      if (_.isObject(student) && student.stu_password == password) {
        var user = {
          user: student,
          type: 'student'
        };
        return callback(null, user);
      } else {
        Teacher.findOne({tch_num: account}, function (err, teacher) {
          console.log('teacher:', teacher);
          if (_.isObject(teacher) && teacher.tch_password == password) {
            var user = {
              user: teacher,
              type: 'teacher'
            }
            return callback(null, user);
          } else {
            return callback('账号或密码错误');
          }
        });
      }
    })
    },
  register: function(student, callback) {
      Student.find({stu_num: student.stu_num}, function (err, students) {
        if (students.length != 0) {
          return callback('账号已存在');
        } else {
          Student.create(student, function (err, student) {
            callback(err, student);
          })
        }
      })
    },

  /**
   * 学生提交作业
   * @param stu_num
   * @param thomework_id
   * @param callback
   */
  submitHomework: function (stu_num, thomework_id, content, callback) {
    Thenjs(function (cont) {
      //找学生
      Student.findOne({stu_num: stu_num}, function (err, student) {
        if (!_.isObject(student)) {
          return callback('找不到学生');
        } else {
          cont(err, student);
        }
      })
    }).then(function (cont, student) {
      //找作业
      THomework.findOne({id: thomework_id, status: true}, function (err, thomework) {
        if (!_.isObject(thomework)) {
          return callback('找不到作业');
        } else {
          cont(err, student, thomework);
        }
      })
    }).then(function (cont, student, thomework) {
      //检验是否提交过
      SHomework.find({stu_num: stu_num, thomework_id: thomework.id}, function (err, result) {
        if (result.length == 0) {
          cont(err, student, thomework)
        } else {
          return callback('你已提交过该作业');
        }
      })
    }).then(function (cont, student, thomework) {
        //新增作业表
        var newSHomework = {
          stu_num: stu_num,
          course_id: thomework.course_id,
          chapter_id: thomework.chapter_id,
          shomework_time: new Date().getTime(),
          submit_type: true,
          shomework_content: content,
          shomework_file: null,
          shomework_comment: null,
          shomework_score: null,
          status: true
        };
        SHomework.create(newSHomework, function (err, result) {
          callback(err, result);
        })
      }
    )
  },
  /**
   * 学生主页
   * @param stu_num
   * @param callback
   */
  studentInfo: function (stu_id, callback) {
    var info = {
      courseTotalTime: 0
    };
    Thenjs(function (cont) {
      Student.findOne({id: stu_id}, function (err, student) {
          if (!_.isObject(student)) {
            return callback('没有找到该学生')
          } else {
            info.student = student;
            cont(err,student);
          }
        }
      )
    }).then(function (cont,student) {
      CourseSelect.find({stu_num: student.stu_num}, function (err, result) {
        console.log('选课关系', result);
        var course_ids = [];
        _.each(result, function (r) {
          course_ids.push(r.course_id);
        })
        cont(err, course_ids,student)
      })
    }).then(function (cont, course_ids, student) {
      Course.find({id: course_ids}, function (err, result) {
        console.log('选课', result);
        info.course = result;
        if (result.length != 0) {
          _.each(result, function (r) {
            info.courseTotalTime += r.course_duration;
          })
        }
        cont(err,student);
      })
    }).then(function (cont, student) {
      Qanswer.find({st_num: student.stu_num, qanswer_type: 0}, function (err, result) {
        console.log('QA', result);
        info.qa = result;
        cont(err,student);
      })
    }).then(function (cont, student) {
      Article.find({st_num: student.stu_num, article_type: 0}, function (err, result) {
        info.article = result;
        callback(null, info);
      })
    })

  }
}
;

