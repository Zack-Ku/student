/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取ppt
   * @param req
   * @param res
   */
  getPpt: function (req, res) {
    Ppt.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
