/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取所有评论
   * @param req
   * @param res
   */
  getComment: function (req, res) {
    Comment.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
