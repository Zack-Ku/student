/**
 * Created by JTian on 2016/4/1
 */

module.exports= {
  attributes:{
    tch_num:{type:'string',required:true,unique:true},
    tch_name:{type:'string'},
    tch_gender:{type:'string'},
    tch_school:{type:'string'},
    tch_zc:{type:'string'},
    tch_desc:{type: 'string'},
    tch_focus:{type: 'string'},
    tch_birthday:{type:'integer'},
    tch_teleno:{type:'string'},
    tch_address:{type:'string'},
    tch_account:{type:'string'},
    tch_password:{type:'string'},
    tch_image:{type:'string'},
    status:{type:'boolean'},
    avatarUrl:{type:'string'},
    avatarFd:{type:'string'}
  }

}
