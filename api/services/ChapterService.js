/**
 * Created by JTian on 2016/4/9.
 */
var _ = require('underscore');
var Thenjs = require('thenjs');

module.exports = {
  /**
   * 章节主页
   * @param course_id
   * @param chapter_num
   * @param callback
   */
  getChapterInfo: function (course_id, chapter_num, callback) {
    var data = {};
    Thenjs(function (cont) {
      Chapter.findOne({course_id: course_id, chapter_num: chapter_num}, function (err, chapter) {
        if (_.isObject(chapter)) {
          cont(null, chapter);
        } else {
          return callback('没有找到该章节');
        }
      })
    }).then(function (cont, chapter) {
      THomework.findOne({chapter_id: chapter.id}, function (err, thomework) {
        cont(null, chapter, thomework)
      })
    }).then(function (cont, chapter, thomework) {
      Ppt.findOne({chapter_id: chapter.id}, function (err, ppt) {
        cont(null, chapter, thomework, ppt);
      })
    }).then(function (cont, chapter, thomework, ppt) {
      Video.findOne({chapter_id: chapter.id}, function (err, video) {
        cont(null, chapter, thomework, ppt, video);
      })
    }).then(function (cont, chapter, thomework, ppt, video) {
      data.chapter = chapter;
      data.thomework_type = thomework.thomework_type;
      data.ppt = ppt;
      data.video = video;
      callback(null, data);
    })
  }
};
