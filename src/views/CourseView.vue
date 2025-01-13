<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { useCourseStore } from '@/stores/course';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const userStore = useUserStore()
const router = useRouter();
console.log(userStore.userData);
const isTeacher = userStore.isTeacher();
const courseStore = useCourseStore();

const { fetchCourses, goToPage } = courseStore;
const loading = ref(false);

const loadCourses = async (page) => {
  loading.value = true;
  await fetchCourses(page);
  loading.value = false;
};

onMounted(() => {
  loadCourses();
  console.log({
    courses: courseStore.courses,
    currentPage: courseStore.currentPage,
    totalPages: courseStore.totalPages,
  });
});
</script>
<template>
  <div>
    <div class="page-title">课程</div>
    <div class="page-container">
      <!-- 教师用户操作按钮 -->
      <div v-if="isTeacher" class="teacher-actions">
        <router-link to="/course/create" class="primary-btn">创建课程</router-link>
      </div>
      <!-- 加载动画 -->
      <div v-if="loading" class="loading">
        <LoadingSpinner />
      </div>
      <!-- 课程列表 -->
      <ul class="course-list" v-else-if="courseStore.courses.length > 0">
        <li v-for="course in courseStore.courses" :key="course.id" class="course-item">
          <div class="course-info">
            <h3>{{ course.name }}</h3>
            <!-- <p>{{ course.description }}</p> -->
            <div class="course-details">
              <span>教师: {{ course.teacher_nickname }}</span>
              <span>子课程数: {{ course.sub_courses_count }}</span>
              <span>学生数: {{ course.students_count }}</span>
              <span>单价: {{ course.unit_fee }}</span>
            </div>
          </div>
          <div class="course-actions">
            <router-link :to="`/course/${course.id}`" class="primary-btn">查看详情</router-link>
            <div class="btn-group" v-if="isTeacher">
              <button class="edit-button">修改</button>
              <button class="delete-button">删除</button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="no-courses">暂无课程</div>
      <!-- 分页控件 -->
      <div class="pagination" v-if="courseStore.courses.length > 0">
        <button @click="loadCourses(courseStore.currentPage - 1)" :disabled="courseStore.currentPage === 1">上一页</button>
        <span>第 {{ courseStore.currentPage }} 页，共 {{ courseStore.totalPages }} 页</span>
        <button @click="loadCourses(courseStore.currentPage + 1)"
          :disabled="courseStore.currentPage === courseStore.totalPages">下一页</button>
      </div>
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
  max-width: 40rem; // 设置最大宽度，与课程列表一致
  margin-left: auto; // 左对齐
  margin-right: auto; // 左对齐

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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    background-color: @primary-color;
    color: @primary-color-text;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 0.5rem;

    &:hover {
      background-color: @primary-color-hover;
    }

    &:active {
      background-color: @primary-color-active;
    }

    &:disabled {
      background-color: @secondary-color;
      cursor: not-allowed;
    }
  }
}

.no-courses {
  text-align: center;
  color: @secondary-color-text;
  margin-top: 2rem;
}
</style>
