/**
 * Created by JTian on 2016/4/1.
 */
var SkipperDisk = require('skipper-disk');


module.exports = {
  /**
   * 获取所有教师信息
   * @param req
   * @param res
   */
  getAllTeacher: function(req, res) {
    Teacher.find({},function(err,result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  },
  /**
   * 根据ID获取教师信息
   * @param req
   * @param res
   */
  getTeacherById: function(req, res){
    var tch_id = req.param('tch_id');
    Teacher.find({id: tch_id},function(err, result){
      if(err || result.length == 0){
        res.json({err: err || '找不到该教师'})
      } else{
        res.json({result: result});
      }
    });
  },
  /**
   * 根据ID修改教师信息
   * @param req
   * @param res
   */
  updateTeacherById: function(req,res){
    var tch_id = req.param('tch_id');
    var newTeacher = {
      tch_num: req.param('tch_num'),
      tch_name: req.param('tch_name'),
      tch_gender: req.param('tch_gender'),
      tch_school: req.param('tch_school'),
      tch_zc: req.param('tch_zc'),
      tch_birthday: req.param('tch_birthday'),
      tch_teleno: req.param('tch_teleno'),
      tch_address: req.param('tch_address'),
      tch_account: req.param('tch_account'),
      tch_password: req.param('tch_password'),
      tch_image: req.param('tch_image'),
      status: true
      };
    Teacher.update({id: tch_id}, newTeacher, function(err, result){
      if(err || result.length == 0){
        res.json({err: err || '找不到该教师'});
      } else {
        res.json({data: result});
      }
    });
  },
  /**
   * 新增教师
   * @param req
   * @param res
   */
  createTeacher: function(req, res){
    var newTeacher = {
      tch_num: req.param('tch_num'),
      tch_name: req.param('tch_name'),
      tch_gender: req.param('tch_gender'),
      tch_school: req.param('tch_school'),
      tch_zc: req.param('tch_zc'),
      tch_birthday: req.param('tch_birthday'),
      tch_teleno: req.param('tch_teleno'),
      tch_address: req.param('tch_address'),
      tch_account: req.param('tch_account'),
      tch_password: req.param('tch_password'),
      tch_image: req.param('tch_image'),
      status: true
    };
    Teacher.create(newTeacher,function(err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    })
  },
  /**
   * 教师登陆
   * @param req
   * @param res
   */
  login:function(req,res){
    var tch_num = req.param('tch_num');
    var tch_password = req.param('tch_password');
    TeacherService.login(tch_num, tch_password, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })
  },
  /**
   * 教师注册
   * @param req
   * @param res
   */
  register: function (req, res) {
    var teacher = {
      tch_num: req.param('tch_num'),
      tch_name: req.param('tch_name'),
      tch_gender: req.param('tch_gender'),
      tch_school: req.param('tch_school'),
      tch_zc: req.param('tch_zc'),
      tch_birthday: req.param('tch_birthday'),
      tch_teleno: req.param('tch_teleno'),
      tch_address: req.param('tch_address'),
      tch_account: req.param('tch_account'),
      tch_password: req.param('tch_password'),
      tch_image: req.param('tch_image'),
      status: true
    };
    TeacherService.register(teacher, function (err, result) {
      if (err) {
        res.json(200, {err: err})
      } else {
        res.json(200, {result: result})
      }
    })
  },

  /**
   * 教师主页获取个人信息
   * @param req
   * @param res
   */
  getTeacherInfo:function(req, res){
    var tch_id = req.param('tch_id');
    TeacherService.getTeacherInfo(tch_id,function(err,result ){
      if(err){
        res.json(200,{err:err});
      } else {
        res.json(200,{result:result});
      }
    })
  },
  /**
   * 上传教师照片
   * @param req
   * @param res
   */
  uploadTeacherPicture: function (req, res) {

    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      Teacher.update({id:req.param('tch_id')}, {
        avatarUrl: require('util').format('%s/teacher/uploadTeacherPicture/%s', sails.getBaseUrl(), req.param('tch_id')),
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
  getTeacherPicture: function (req, res) {

    req.validate({
      tch_id: 'string'
    });

    Teacher.findOne({id:req.param('tch_id')}).exec(function (err, teacher) {
      if (err) return res.negotiate(err);
      if (!teacher) return res.notFound();

      if (!teacher.avatarFd) {
        return res.notFound();
      }

      var fileAdapter = SkipperDisk(/* optional opts */);


      fileAdapter.read(teacher.avatarFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        //.pipe(res.attachment(user.avatarFd));
        .pipe(res);
    });
  }

};
