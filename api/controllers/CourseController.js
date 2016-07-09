/**
 * Created by JTian on 2016/4/1.
 */
var SkipperDisk = require('skipper-disk');

module.exports = {
  /**
   * 获取所有课程
   * @param req
   * @param res
   */
  getAllCourse: function (req, res) {
    Course.find({}, function (err, result) {
      if (err) {
        res.json({err: err})
      } else {
        res.json({data: result});
      }
    })
  },
  /**
   * 根据课程id获取课程
   * @param req(course_id)
   * @param res
   */
  getCourseById: function (req, res) {
    var course_id = req.param('course_id');
    Course.findOne({id: course_id}, function (err, course) {
      if (!_.isObject(course)) {
        res.json({err: err || '找不到课程'});
      } else {
        res.json({result: course});
      }
    })
  },
  /**
   * 根据课程id更新课程
   * @param req(course_id...)
   * @param res
   */
  updateCourseById: function (req, res) {
    var course_id = req.param('course_id');
    var newCourse = {
      course_cname: req.param('course_cname'),
      course_ename: req.param('course_ename'),
      course_subject: req.param('course_subject'),
      course_pcount: req.param('course_pcount'),
      course_chapterno: req.param('course_chapterno'),
      course_desc: req.param('course_desc'),
      course_duration: req.param('course_duration'),
      course_book: req.param('course_book'),
      course_related: req.param('course_related'),
      course_school: req.param('course_school'),
      course_image: req.param('course_image'),
      time: new Date().getTime(),
      status: true
    };
    Course.update({id: course_id}, newCourse, function (err, result) {
      if (err || result.length == 0) {
        res.json({err: err || '找不到课程'});
      } else {
        res.json({data: result});
      }
    });
  },
  /**
   * 创建课程
   * @param req(course_cname...)
   * @param res
   */
  createCourse: function (req, res) {
    var newCourse = {
      course_cname: req.param('course_cname'),
      course_ename: req.param('course_ename'),
      course_subject: req.param('course_subject'),
      course_pcount: req.param('course_pcount'),
      course_chapterno: req.param('course_chapterno'),
      course_desc: req.param('course_desc'),
      course_duration: req.param('course_duration'),
      course_book: req.param('course_book'),
      course_related: req.param('course_related'),
      course_school: req.param('course_school'),
      course_image: req.param('course_image'),
      time: new Date().getTime(),
      status: true
    };
    Course.create(newCourse, function (err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({data: result});
      }
    })
  },
  /**
   * 主页获取最热课程
   * @param req
   * @param res
   */
  getHotCourses: function (req, res) {
    CourseService.getHotCourses(function (err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  },
  /**
   * 课程主页根据课程获取课程
   * @param req(subjectCon[default ,humanties,economic,technology,lecture],timeCon[default ,process,finish],sortCon[default , time , hot])
   * @param res
   */
  getCoursesByCondition: function (req, res) {
    var subjectCon = req.param('subjectCon');
    var timeCon = req.param('timeCon');
    var sortCon = req.param('sortCon');
    CourseService.getCoursesByCondition(subjectCon, timeCon, sortCon, function (err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  },
  /**
   * 课程上传文件
   * @param req
   * @param res
   */
  uploadCourseFile: function (req, res) {

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
      Course.update({id: req.param('course_id')}, {
        avatarUrl: require('util').format('%s/course/uploadCoursePicture/%s', sails.getBaseUrl(), req.param('course_id')),
        avatarFd: uploadedFiles[0].fd
      })
        .exec(function (err) {
          if (err) return res.negotiate(err);
          return res.ok();
        });
    });
  },
  /**
   * 课程下载文件
   * @param req
   * @param res
   */
  getCourseFile: function (req, res) {

    req.validate({
      course_id: 'string'
    });

    Course.findOne({id: req.param('course_id')}).exec(function (err, course) {
      if (err) return res.negotiate(err);
      if (!course) return res.notFound();

      if (!course.avatarFd) {
        return res.notFound();
      }

      var fileAdapter = SkipperDisk(/* optional opts */);


      fileAdapter.read(course.avatarFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res.attachment(course.avatarFd));
      /*        .pipe(res);*/
    });
  },
  /**
   * 课程主页
   * @param req
   * @param res
   */
  getCourseInfo: function (req, res) {
    var course_id = req.param('course_id');
    CourseService.getCourseInfo(course_id, function (err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  }

}
;
