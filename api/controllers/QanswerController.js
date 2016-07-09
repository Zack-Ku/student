/**
 * Created by JTian on 2016/4/1.
 */
module.exports = {
  /**
   * 获取qa内容
   * @param req
   * @param res
   */
  getQanswer: function (req, res) {
    Qanswer.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
