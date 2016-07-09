/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  /**
   * 获取教师授课
   * @param req
   * @param res
   */
  getCourseTeaching: function (req, res) {
    Courseteaching.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};
