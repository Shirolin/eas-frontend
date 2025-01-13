<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const userStore = useUserStore();
const isTeacher = userStore.isTeacher();
const course = ref({});

const fetchCourseDetail = async () => {
  const courseId = route.params.id;
  course.value = await courseStore.fetchCourse(courseId);
};

const editCourse = () => {
  // 跳转到课程编辑页面
};

const deleteCourse = async () => {
  const courseId = route.params.id;
  await courseStore.deleteCourse(courseId);
  router.push('/course');
};

onMounted(() => {
  fetchCourseDetail();
});
</script>
<template>
  <div class="course-detail">
    <h2>{{ course.name }}</h2>
    <p>{{ course.description }}</p>
    <div class="course-details">
      <span>教师: {{ course.teacher_nickname }}</span>
      <span>子课程数: {{ course.sub_courses_count }}</span>
      <span>学生数: {{ course.students_count }}</span>
      <span>单价: {{ course.unit_fee }}</span>
    </div>
    <div class="course-actions" v-if="isTeacher">
      <router-link to="/course" class="secondary-btn">返回</router-link>
      <button class="edit-button" @click="editCourse">修改</button>
      <button class="delete-button" @click="deleteCourse">删除</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.course-detail {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.course-details {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  span {
    margin-right: 1rem;
  }
}

.course-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    margin-left: 0.5rem;
  }
}

.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}

.secondary-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #6c757d;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.secondary-btn:hover {
  background-color: #5a6268;
}
</style>
