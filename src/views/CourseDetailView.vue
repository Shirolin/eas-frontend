<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useDebounce } from '@/utils/useDebounce';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const userStore = useUserStore();
const isTeacher = userStore.isTeacher();
const course = ref({});
const loading = ref(false);

const fetchCourseDetail = async () => {
  const courseId = route.params.id;
  course.value = await courseStore.fetchCourse(courseId);
  loading.value = false;
};

const debouncedFetchCourseDetail = useDebounce(fetchCourseDetail, 300);

const loadCourseDetail = () => {
  loading.value = true;
  debouncedFetchCourseDetail();
};

const deleteCourse = async () => {
  const courseId = route.params.id;
  await courseStore.deleteCourse(courseId);
  router.push('/course');
};

onMounted(() => {
  loadCourseDetail();
});
</script>
<template>
  <div class="list-detail">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
      <div class="list-details">
        <span>教师: {{ course.teacher_nickname }}</span>
        <span>子课程数: {{ course.sub_courses_count }}</span>
        <span>学生数: {{ course.students_count }}</span>
        <span>单价: {{ course.unit_fee }}</span>
      </div>
      <div class="list-detail-actions" v-if="isTeacher">
        <div class="btn-group">
          <router-link to="/course" class="btn-group-item secondary-btn">返回</router-link>
          <router-link :to="`/course/${course.id}/edit`" class="btn-group-item primary-btn">编辑</router-link>
          <div class="btn-group-item red-btn" @click="deleteCourse">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-details {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  span {
    margin-right: 1rem;
  }
}
</style>
