/**
 * Created by JTian on 2016/4/1
 */

module.exports = {
  attributes: {
    //course_num:{type:'string',required:true,unique:true},
    tch_name: {type: 'string'},
    course_cname: {type: 'string'},
    course_ename: {type: 'string'},
    course_subject: {type: 'string'},
    course_pcount: {type: 'integer'},
    course_chapterno: {type: 'integer'},
    course_desc: {type: 'string'},
    course_duration: {type: 'integer'},
    course_book: {type: 'string'},
    course_related: {type: 'string'},
    course_school: {type: 'string'},
    course_image: {type: 'string'},
    time: {type: 'integer'},
    status: {type: 'boolean'},
    avatarUrl:{type:'string'},
    avatarFd:{type:'string'}
  }
};
