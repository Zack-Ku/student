/**
 * Created by JTian on 2016/4/1
 */

module.exports = {
  attributes: {
    stu_num: {type: 'string', required: true},
    course_id: {type: 'string'},
    chapter_id: {type: 'string'},
    chapter_num: {type:'integer'},
    thomework_id: {type: 'string'},
    shomework_time: {type: 'integer'},
    submit_type: {type: 'boolean'},
    shomework_content: {type: 'string'},
    shomework_file: {type: 'string'},
    shomework_comment: {type: 'string'},
    shomework_score: {type: 'double'},
    status: {type: 'boolean'}
  }

}

