/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取所有老师的布置作业
   * @param req
   * @param res
   */
  getTHomework: function (req, res) {
    Thomework.find({}, function (err, result) {
      res.json({data: result});
    })
  },
  /**
   * 获取章节的所有问题与答案
   * @param req
   * @param res
   */
  getChapterQuestions: function (req, res) {
    var chapter_id = req.param('chapter_id');
    THomeworkService.getQuestions(chapter_id, function (err, result) {
      res.json({result: result});
    })
  }
};
