/**
 * Created by JTian on 2016/4/1
 */

module.exports= {
  attributes:{
    tch_num:{type:'string',required:true,unique:true},
    course_id:{type:'string'},
    tc_time:{type:'integer'},
    tc_rem:{type:'string'},
    status:{type:'boolean'}
  }

}
