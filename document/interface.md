article:
  getArticle: 获取所有文章
    param:
    return: 所有文章的所有信息


chapter:
  getAllChapter:  获取所有章节
      param:
      return: 所有章节的所有信息

  getChapterById:  根据章节id获取章节信息
      param: chapter_id
      return: 该章节所有信息

  updateChapterById:  根据章节id更新章节信息
      param: chapter_id
             chapter_num
              ...
             chapter_time
      return: update回调result

  createChapter: 创建章节
      param:chapter_num
            course_id
            ...
      return: create回调result


comment:
  getComment:
      param:
      return: 所有评论的所有信息


course:
  getAllCourse:
      param:
      return: 所有课程的所有信息

  getCouresById:
      param: course_id
      return:该课程的信息

  updateCourseById:
      param: course_id
             ...
      return: update回调

  createCourse:
      param:course_cname
            ...
      return:create回调


