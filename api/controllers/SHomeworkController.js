/**
 * Created by JTian on 2016/4/1.
 */
module.exports = {
  /**
   * 获取所有学生作业信息
   * @param req
   * @param res
   */
  getAllSHomework: function (req, res) {
    SHomework.find({}, function (err, result) {
      if(err){
        res.json({err: err});
      } else {
        res.json({data: result});
      }
    })
  },
  /**
   * 根据ID获取学生作业
   * @param req(sHomework_id)
   * @param res
   */
  getSHomeworkById: function(req, res){
    var sHomework_id = req.param('sHomework_id');
    SHomework.find({id: sHomework_id},function(err, result){
      if (err || result.length == 0) {
        res.json({err: err || '找不到该作业'});
      } else {
        res.json({data: result});
      }
    })
  },
  /**
   * 根据ID修改作业内容
   * @param req(sHomework_id,stu_num...)
   * @param res
   */
  updateSHomeworkById: function(req,res){
    var sHomework_id = req.param('sHomework_id');
    var newSHomework = {
      stu_num: req.param('stu_num'),
      course_id: req.param('course_id'),
      chapter_id: req.param('chapter_id'),
      thomework_id: req.param('tHomework_id'),
      shomework_time: req.param('sHomework_id'),
      submit_type: req.param('submit_type'),
      shomework_content:req.param('sHomework_content'),
      shomework_file: req.param('sHomework_file'),
      shomework_comment: req.param('sHomework_comment'),
      shomework_score: req.param('sHomework_score'),
      status: true
    };
    SHomework.update({id: sHomework_id}, newSHomework,function(err, result){
      if(err || result.length == 0){
        res.json({err:err || '找不到该作业'});
      } else {
        res.json({data: result});
      }
    });
  },
  /**
   * 创建学生课程
   * @param req(stu_num...)
   * @param res
   */
  createSHomework: function(req,res){
    var newSHomework = {
      stu_num: req.param('stu_num'),
      course_id: req.param('course_id'),
      chapter_id: req.param('chapter_id'),
      thomework_id: req.param('tHomework_id'),
      shomework_time: req.param('sHomework_time'),
      submit_type: req.param('submit_type'),
      shomework_content:req.param('sHomework_content'),
      shomework_file: req.param('sHomework_file'),
      shomework_comment: req.param('sHomework_comment'),
      shomework_score: req.param('sHomework_score'),
      status: true
    };
    SHomework.create(newSHomework, function(err, result){
      if(err){
        res.json({err: err});
      }else {
        res.json({data:result});
      }
    })
  }
};
