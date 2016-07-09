/**
 * Created by JTian on 2016/4/1
 */

module.exports = {
  attributes: {
    //thomework_num:{type:'string',required:true,unique:true},
    course_id: {type: 'string'},
    chapter_id: {type: 'string'},
    tch_num: {type: 'string'},
    thomework_question: {type: 'string'},
    thomework_option: {type: 'arrays'},
    thomework_type: {type: 'integer'},
    thomework_answer: {type: 'string'},
    thomework_time: {type: 'integer'},
    thomework_deadline: {type: 'integer'},
    status: {type: 'boolean'}
  }

}

