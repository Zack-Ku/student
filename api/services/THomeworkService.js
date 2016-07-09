/**
 * Created by Zack on 2016/4/9.
 */
var _ = require('underscore');
var Thenjs = require('thenjs');

module.exports = {
  getQuestions: function (chapter_id, callback) {
    var questions = [];
    Thenjs(function (cont) {
      THomework.find({chapter_id: chapter_id}, function (err, result) {
        cont(null, result);
      });
    }).then(function (cont, result) {
      console.log('作业问题', result);
      if (result.length != 0) {
        _.each(result, function (r) {
          var question = {
            thomework_question: r.thomework_question,
            thomework_option: r.thomework_option,
            thomework_answer: r.thomework_answer
          };
          questions.push(question);
        });
      }
      console.log('作业问题new', questions);
      for (var i = 0; i < questions.length; i++) {
        questions[i].question_num = i + 1;
      }
      callback(null, questions);
    })
  }
};
