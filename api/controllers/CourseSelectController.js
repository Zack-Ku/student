/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取课程选择
   * @param req
   * @param res
   */
  getCourseSelect: function (req, res) {
    Courseselect.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
