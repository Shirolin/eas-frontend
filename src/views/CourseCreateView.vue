<template>
  <div class="course-create">
    <h2>创建课程</h2>
    <form @submit.prevent="createCourse">
      <div class="form-group">
        <label for="course-name">课程名称</label>
        <input type="text" id="course-name" v-model="courseName" required />
      </div>
      <div class="form-group">
        <label for="course-description">课程描述</label>
        <textarea id="course-description" v-model="courseDescription" required></textarea>
      </div>
      <div class="form-group">
        <label for="course-fee">课程费用</label>
        <input type="number" id="course-fee" v-model="courseFee" required />
      </div>
      <button type="submit" class="primary-btn">创建</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCourseStore } from '@/stores/course';

const courseStore = useCourseStore();
const courseName = ref('');
const courseDescription = ref('');
const courseFee = ref(0);

const createCourse = async () => {
  await courseStore.createCourse({
    name: courseName.value,
    description: courseDescription.value,
    fee: courseFee.value,
  });
  // 跳转到课程列表页面
};
</script>

<style scoped>
.course-create {
  max-width: 40rem;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.primary-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-btn:hover {
  background-color: #0056b3;
}
</style>
