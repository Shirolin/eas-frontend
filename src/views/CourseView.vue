<script setup>
import { ref } from 'vue';

const isTeacher = ref(true); // 假设一个变量来判断是否是教师用户

const courses = ref([
  { id: 1, name: '数学', description: '基础数学课程', teacher: '张老师', subCourses: 5, students: 30, price: '¥200' },
  { id: 2, name: '物理', description: '基础物理课程', teacher: '李老师', subCourses: 3, students: 25, price: '¥180' },
  { id: 3, name: '化学', description: '基础化学课程', teacher: '王老师', subCourses: 4, students: 20, price: '¥150' }
]);
</script>
<template>
  <div>
    <div class="page-title">课程</div>
    <div class="page-container">
      <!-- 教师用户操作按钮 -->
      <div v-if="isTeacher" class="teacher-actions">
        <button class="create-button">创建课程</button>
      </div>
      <!-- 课程列表 -->
      <ul class="course-list">
        <li v-for="course in courses" :key="course.id" class="course-item">
          <div class="course-info">
            <h3>{{ course.name }}</h3>
            <!-- <p>{{ course.description }}</p> -->
            <div class="course-details">
              <span>教师: {{ course.teacher }}</span>
              <span>子课程数: {{ course.subCourses }}</span>
              <span>学生数: {{ course.students }}</span>
              <span>单价: {{ course.price }}</span>
            </div>
          </div>
          <div class="course-actions">
            <button class="details-button">查看详情</button>
            <div v-if="isTeacher">
              <button class="edit-button">修改</button>
              <button class="delete-button">删除</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.course-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 40rem; // 设置最大宽度
  margin-left: auto; // 左对齐
  margin-right: auto; // 左对齐

  .course-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @card-bg-color;
    border: 1px solid @card-border-color;
    border-radius: @card-radius;
    padding: @card-padding;
    margin-bottom: 1rem;
    box-shadow: @card-shadow;
    transition: transform 0.3s, box-shadow 0.3s; // 添加动效

    &:hover {
      transform: translateY(-5px); // 向上移动
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); // 增加阴影
    }

    .course-info {
      h3 {
        margin: 0 0 0.5rem 0;
      }

      p {
        margin: 0.25rem 0; // 调整间距
      }

      .course-details {
        display: flex;
        justify-content: space-between;

        span {
          margin-right: 1rem;
        }
      }
    }

    .course-actions {
      display: flex;
      flex-direction: column;

      button {
        margin-top: 0.5rem;
      }
    }

    .details-button,
    .edit-button,
    .delete-button {
      background-color: @primary-color;
      color: @primary-color-text;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: @primary-color-hover;
      }

      &:active {
        background-color: @primary-color-active;
      }
    }

    .edit-button {
      background-color: @secondary-color;

      &:hover {
        background-color: @secondary-color-hover;
      }

      &:active {
        background-color: @secondary-color-active;
      }
    }

    .delete-button {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }

      &:active {
        background-color: #bd2130;
      }
    }
  }
}

.teacher-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  .create-button {
    background-color: @primary-color;
    color: @primary-color-text;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: @primary-color-hover;
    }

    &:active {
      background-color: @primary-color-active;
    }
  }
}
</style>
