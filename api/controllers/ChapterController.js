/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取所有章节信息
   * @param req
   * @param res
   */
  getAllChapter: function (req, res) {
    Chapter.find({}, function (err, result) {
      if(err){
        res.json({err: err});
      }else {
        res.json({data: result});
      }
    })
  },
  /**
   * 根据ID获取章节信息
   * @param req(chapter_id)
   * @param res
   */
  getChapterById: function(req, res){
    var chapter_id = req.param('chapter_id');
    Chapter.find({id: chapter_id},function(err,result){
      if(err || result.length ==0){
        res.json({err:err || '找不到该章节'});
      }else {
        res.json({data: result});
      }
    })
  },
  /**
   * 根据id更新文章
   * @param req(chapter_id...)
   * @param res
   */
  updateChapterById: function(req,res){
    var chapter_id = req.param('chapter_id');
    var newChapter = {
      chapter_num: req.param('chapter_num'),
      course_id: req.param('course_id'),
      chapter_rem: req.param('chapter_rem'),
      chapter_time: req.param('chapter_time'),
      status: true
    }
    Chapter.update({id: chapter_id},newChapter,function(err, result){
      if(err || result.length ==0){
        res.json({err:err || '找不到该章节'});
      }else {
        res.json({data: result});
      }
    });
  },
  /**
   * 新建章节
   * @param req(chapter_num...)
   * @param res
   */
  createChapter: function (req, res) {
    var newChapter = {
      chapter_num: req.param('chapter_num'),
      course_id: req.param('course_id'),
      chapter_rem: req.param('chapter_rem'),
      chapter_time: req.param('chapter_time'),
      status: true
    };
    Chapter.create(newChapter, function (err, result) {
      if (err) {
        res.json({err: err})
      }
      res.json({data: result})
    })
  },

  /**
   * 章节主页
   * @param req
   * @param res
   */
  getChapterInfo: function(req, res){
    var course_id = req.param('course_id');
    var chapter_num = req.param('chapter_num');
    ChapterService.getChapterInfo(course_id, chapter_num, function(err,result){
      if (err) {
        res.json({err: err})
      }else {
        res.json({result: result})
      }
    })
  }
};


