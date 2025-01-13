<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { useCourseStore } from '@/stores/course';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import CommonPagination from '@/components/common/CommonPagination.vue';
import { useDebounce } from '@/utils/useDebounce';

const userStore = useUserStore()
const router = useRouter();
console.log(userStore.userData);
const isTeacher = userStore.isTeacher();
const courseStore = useCourseStore();

const { fetchCourses, goToPage } = courseStore;
const loading = ref(false);

const loadCourses = async (page) => {
  await fetchCourses(page);
  loading.value = false;
};

const debouncedLoadCourses = useDebounce(loadCourses, 300);

const loadCourseList = () => {
  loading.value = true;
  debouncedLoadCourses();
};

onMounted(() => {
  loadCourseList();
});
</script>
<template>
  <div>
    <div class="page-title">课程{{ isTeacher ? '管理' : '' }}</div>
    <div class="page-container">
      <!-- 教师用户操作按钮 -->
      <div v-if="isTeacher" class="common-list-top-actions">
        <router-link to="/course/create" class="primary-btn">创建课程</router-link>
      </div>
      <!-- 加载动画 -->
      <div v-if="loading" class="loading">
        <LoadingSpinner />
      </div>
      <!-- 课程列表 -->
      <ul class="common-list" v-else-if="courseStore.courses.length > 0">
        <li v-for="course in courseStore.courses" :key="course.id" class="common-list-item">
          <div class="common-list-info">
            <h3>{{ course.name }}</h3>
            <!-- <p>{{ course.description }}</p> -->
            <div class="common-list-details">
              <span>教师: {{ course.teacher_nickname }}</span>
              <span>子课程数: {{ course.sub_courses_count }}</span>
              <span>学生数: {{ course.students_count }}</span>
              <span>单价: {{ course.unit_fee }}</span>
            </div>
          </div>
          <div class="common-list-actions">
            <router-link :to="`/course/${course.id}`" class="primary-btn">查看详情</router-link>
            <div class="btn-group" v-if="isTeacher">
              <button class="btn-group-item orange-btn">修改</button>
              <button class="btn-group-item red-btn">删除</button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="common-list-no-data">暂无课程</div>
      <!-- 分页控件 -->
      <CommonPagination v-if="courseStore.courses.length > 0" :currentPage="courseStore.currentPage"
        :totalPages="courseStore.totalPages" @changePage="debouncedLoadCourses" />
    </div>
  </div>
</template>
<style lang="less" scoped>
/** */
</style>
