/**
 * Created by Zack on 2016/3/31.
 */
module.exports = {
  attributes: {
    stu_num: {type: 'string',required:true,unique:true},
    stu_name: {type: 'string'},
    stu_gender: {type: 'string'},
    stu_school:{type:'string'},
    stu_grade:{type:'string'},
    stu_xl:{type:'string'},
    stu_score:{type:'double'},
    stu_birthday:{type:'integer'},
    stu_teleno:{type:'string'},
    stu_address:{type:'string'},
    stu_password:{type:'string'},
    stu_image:{type:'string'},
    status:{type:'boolean'},
    avatarUrl:{type:'string'},
    avatarFd:{type:'string'}
  }
};
