/**
 * Created by JTian on 2016/4/1
 */

module.exports= {
  attributes:{
    //comment_num:{type:'string',required:true,unique:true},
    course_id:{type:'string'},
    course_name:{type:'string'},
    stu_num:{type:'string'},
    stu_name:{type:'string'},
    comment_score:{type:'double'},
    comment_content:{type:'string'},
    comment_mark:{type:'boolean'},
    comment_rem:{type:'string'},
    comment_time: {type: 'integer'},
    status:{type:'boolean'}
  }

}
