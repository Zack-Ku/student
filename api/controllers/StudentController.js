/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var SkipperDisk = require('skipper-disk');

module.exports = {
  /**
   * 学生上传照片
   * @param req
   * @param res
   */
  uploadStudentPicture: function (req, res) {

    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000,
      dirname: '../../assets/images'
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      Student.update({id: req.param('stu_id')}, {
        avatarUrl: require('util').format('%s/student/uploadStudentPicture/%s', sails.getBaseUrl(), req.param('stu_id')),
        avatarFd: uploadedFiles[0].fd
      })
        .exec(function (err) {
          if (err) return res.negotiate(err);
          return res.ok();
        });
    });
  },
  /**
   * 解析展示照片
   * @param req
   * @param res
   */
  getStudentPicture: function (req, res) {

    req.validate({
      stu_id: 'string'
    });

    Student.findOne({id: req.param('stu_id')}).exec(function (err, student) {
      if (err) return res.negotiate(err);
      if (!student) return res.notFound();

      if (!student.avatarFd) {
        return res.notFound();
      }

      var fileAdapter = SkipperDisk(/* optional opts */);


      fileAdapter.read(student.avatarFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        //.pipe(res.attachment(user.avatarFd));
        .pipe(res);
    });
  },
  /**
   * 获取所有学生信息
   * @param req
   * @param res
   */
  getAllStudent: function (req, res) {
    Student.find({}, function (err, result) {
      if (err) {
        res.json({err: err})
      } else {
        res.json({data: result});
      }
    });
  },
  /**
   * 根据ID查找获取学生
   * @param req(stu_id)
   * @param res
   */
  getStudentById: function (req, res) {
    var stu_id = req.param('stu_id');
    Student.find({id: stu_id}, function (err, result) {
      if (err || result.length == 0) {
        res.json({err: err || '找不到该学生'})
      } else {
        res.json({data: result});
      }
    });
  },
  /**
   * 根据ID更改学生信息
   * @param req(stu_id...)
   * @param res
   */
  updateStudentById: function (req, res) {
    var stu_id = req.param('stu_id');
    var newStudent = {
      stu_num: req.param('stu_num'),
      stu_name: req.param('stu_name'),
      stu_gender: req.param('stu_gender'),
      stu_school: req.param('stu_school'),
      stu_grade: req.param('stu_gender'),
      stu_xl: req.param('stu_xl'),
      stu_score: req.param('stu_score'),
      stu_birthday: req.param('stu_birthday'),
      stu_teleno: req.param('stu_teleno'),
      stu_address: req.param('stu_address'),
      stu_password: req.param('stu_password'),
      stu_image: req.param('stu_image'),
      status: true
    };
    Student.update({id: stu_id}, newStudent, function (err, result) {
      if (err || result.length == 0) {
        res.json({err: err || '找不到该学生'});
      } else {
        res.json({data: result});
      }
    });
  },

  /**
   * 新建学生
   * @param req(stu_num)
   * @param res
   */
  createStudent: function (req, res) {
    var newStudent = {
      stu_num: req.param('stu_num'),
      stu_name: req.param('stu_name'),
      stu_gender: req.param('stu_gender'),
      stu_school: req.param('stu_school'),
      stu_grade: req.param('stu_gender'),
      stu_xl: req.param('stu_xl'),
      stu_score: req.param('stu_score'),
      stu_birthday: req.param('stu_birthday'),
      stu_teleno: req.param('stu_teleno'),
      stu_address: req.param('stu_address'),
      stu_password: req.param('stu_password'),
      stu_image: req.param('stu_image'),
      status: true
    };
    Student.create(newStudent, function (err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  },

  /**
   * 学生选课
   * @param req(stu_num,course_id)
   * @param res
   */
  courseSelect: function (req, res) {
    var stu_num = req.param('stu_num');
    var course_id = req.param('course_id');
    StudentService.courseSelect(stu_num, course_id, function (err, courseSelect) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: courseSelect})
      }
    })
  },
  /**
   * 登陆
   * @param req(stu_num,stu_password)
   * @param res
   */
  login: function (req, res) {
    var account = req.param('account');
    var password = req.param('password');
    StudentService.login(account, password, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })
  },
  /**
   * 学生注册
   * @param req(stu_num...)
   * @param res
   */
  register: function (req, res) {
    var student = {
      stu_num: req.param('stu_num'),
      stu_name: req.param('stu_name'),
      stu_gender: req.param('stu_gender'),
      stu_school: req.param('stu_school'),
      stu_grade: req.param('stu_gender'),
      stu_xl: req.param('stu_xl'),
      stu_score: req.param('stu_score'),
      stu_birthday: req.param('stu_birthday'),
      stu_teleno: req.param('stu_teleno'),
      stu_address: req.param('stu_address'),
      stu_password: req.param('stu_password'),
      stu_image: req.param('stu_image'),
      status: true
    };
    StudentService.register(student, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })
  },
  /**
   * 学生提交作业
   * @param req(stu_num,thomework_id)
   * @param res
   */
  submitHomework: function (req, res) {
    var stu_num = req.param('stu_num');
    var thomework_id = req.param('thomework_id');
    var content = req.param('content');
    StudentService.submitHomework(stu_num, thomework_id, content, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })
  },
  /**
   * 学生主页
   * @param req
   * @param res
   */
  studentInfo: function (req, res) {
    var stu_id = req.param('stu_id');
    StudentService.studentInfo(stu_id, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })

  }
};

