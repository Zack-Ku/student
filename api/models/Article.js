/**
 * Created by JTian on 2016/4/1
 */

module.exports = {
  attributes: {
    //article_num:{type:'string',required:true,unique:true},
    article_title: {type: 'string'},
    article_time:{type:'integer'},
    st_num: {type: 'string'},
    article_type: {type: 'integer'},
    article_content: {type: 'string'},
    article_mark: {type: 'boolean'},
    article_rem: {type: 'string'},
    article_image: {type: 'arrays'},
    status: {type: 'boolean'}
  }

}
