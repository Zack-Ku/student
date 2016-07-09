/**
 * Created by Zack on 2016/4/2.
 */
var _ = require('underscore');
var Thenjs = require('thenjs');

module.exports = {
  /**
   * 主页获取最热课程
   * @param subject
   * @param callback
   */
  getHotCourses: function (callback) {
    var subjects = ['humanities', 'economic', 'technology', 'lecture'];
    Thenjs(function (cont) {
      Course.find({course_subject: subjects[0], status: true}, function (err, hCourses) {
        if (hCourses.length != 0) {
          var hCourse = hCourses[0];
          _.each(hCourses, function (h) {
            if (h.course_pcount > hCourse.course_pcount) {
              hCourse = h;
            }
          });
          cont(err, hCourse);
        } else {
          cont(err, null);
        }
      })
    }).then(function (cont, hCourse) {
      Course.find({course_subject: subjects[1], status: true}, function (err, eCourses) {
        if (eCourses.length != 0) {
          var eCourse = eCourses[0];
          _.each(eCourses, function (e) {
            if (e.course_pcount > eCourse.course_pcount) {
              eCourse = e;
            }
          });
          cont(err, hCourse, eCourse);
        } else {
          cont(err, hCourse, null);
        }
      })
    }).then(function (cont, hCourse, eCourse) {
      Course.find({course_subject: subjects[2], status: true}, function (err, tCourses) {
        if (tCourses.length != 0) {
          var tCourse = tCourses[0];
          _.each(tCourses, function (t) {
            if (t.course_pcount > tCourse.course_pcount) {
              tCourse = t;
            }
          });
          cont(err, hCourse, eCourse, tCourse);
        } else {
          cont(err, hCourse, eCourse, null);
        }
      })
    }).then(function (cont, hCourse, eCourse, tCourse) {
      Course.find({course_subject: subjects[3], status: true}, function (err, lCourses) {
        if (lCourses.length != 0) {
          var lCourse = lCourses[0];
          _.each(lCourses, function (l) {
            if (l.course_pcount > lCourse.course_pcount) {
              lCourse = l;
            }
          });
          cont(err, hCourse, eCourse, tCourse, lCourse);
        } else {
          cont(err, hCourse, eCourse, tCourse, null);
        }
      })
    }).then(function (cont, hCourse, eCourse, tCourse, lCourse) {
        var hotCourses = [hCourse, eCourse, tCourse, lCourse];
        console.log('hotCourses:', hotCourses)
        var cName = ['人文科学', '经济生活', '科学技术', '讲座研讨'];
        var hotCourse = {};
        var hotSpotCourses = [];
        for (var i = 0; i < 4; i++) {
          hotCourse = {
            type: subjects[i],
            course: {
              id: hotCourses[i].id,
              type: cName[i],
              name: hotCourses[i].course_cname,
              teacher: hotCourses[i].tch_name,
              stuNum: hotCourses[i].course_pcount,
              captureNum: hotCourses[i].course_chapterno,
              desc: hotCourses[i].course_desc,
              logoUrl: hotCourses[i].course_image
            }
          };
          hotSpotCourses.push(hotCourse);
        }
        callback(null, hotSpotCourses);
      }
    )
  },
  /**
   * 课程主页根据条件获取课程
   * @param subjectCon
   * @param timeCon
   * @param sortCon
   * @param callback
   */
  getCoursesByCondition: function (subjectCon, timeCon, sortCon, callback) {
    var condition = {};
    if (subjectCon != 'default') {
      condition.course_subject = subjectCon;
    }
    switch (timeCon) {
      case 'process':
        condition.status = true;
        break;
      case 'finish':
        condition.status = false;
        break;
      default :
    }
    //sortCon : enum [default,time,hot]
    function sortbyTime(a, b) {
      return b.time - a.time;
    }

    function sortbyHot(a, b) {
      return b.course_pcount - a.course_pcount;
    }

    Course.find(condition, function (err, courses) {
      if (courses.length != 0) {
        switch (sortCon) {
          case 'time':
            courses.sort(sortbyTime);
            break;
          case 'hot':
            courses.sort(sortbyHot);
            break;
          default:
        }
      }
      callback(null, courses);
    });
  },
  /**
   * 课程主页
   * @param course_id
   * @param callback
   */
  getCourseInfo: function (course_id, callback) {
    var data = {};
    Thenjs(function (cont) {
      Course.findOne({id: course_id}, function (err, result) {
        if (result) {
          cont(null, result);
        } else {
          return callback('没有找到该课程');
        }
      })
    }).then(function (cont, course) {
      Chapter.find({course_id: course_id}, function (err, result) {
        cont(null, course, result)
      })
    }).then(function (cont, course, chapters) {
      Teacher.findOne({tch_name: course.tch_name}, function (err, result) {
        cont(null, course, chapters, result);
      })
    }).then(function (cont, course, chapters, teacher) {
      Comment.find({course_id: course_id}, function (err, result) {
        cont(null, course, chapters, teacher, result);
      })
    }).then(function (cont, course, chapters, teacher, comments) {
      var totalScore = 0;
      _.each(comments, function (c) {
        totalScore += c.comment_score;
      });
      data.averageScore = totalScore / comments.length;
      data.commentCount = comments.length;
      data.course = course;
      data.chapters = chapters;
      data.teacher = teacher;
      data.comments = comments;
      callback(null, data);
    })
  }


};
