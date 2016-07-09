/**
 * Created by JTian on 2016/4/1.
 */

module.exports = {
  getVideo: function (req, res) {
    Video.find({}, function (err, result) {
      res.json({data: result});
    })
  }
};



