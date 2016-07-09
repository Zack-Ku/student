/**
 * Created by JTian on 2016/4/1
 */

module.exports= {
  attributes:{
    //qanswer_num:{type:'string',required:true,unique:true},
    course_id:{type:'string'},
    course_cname: {type: 'string'},
    chapter_id:{type:'string'},
    chapter_name:{type:'string'},
    st_num:{type:'string'},
    qanswer_type:{type:'integer'},
    qanswer_user:{type:'string'},
    qanswer_time:{type:'integer'},
    qanswer_origin:{type:'string'},
    qanswer_content:{type:'string'},
    status:{type:'boolean'}
  }
}
