/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取所有文章
   * @param req
   * @param res
   */
  getArticle: function (req, res) {
    Article.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
