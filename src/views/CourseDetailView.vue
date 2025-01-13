<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '@/stores/course';
import { useUserStore } from '@/stores/user';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useDebounce } from '@/utils/useDebounce';
import { useModalStore } from '@/stores/modalStore';
import { useToast } from '@/utils/useToast';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const { showToast } = useToast();
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

const confirmDeleteCourse = () => {
  modalStore.show({
    title: '确认删除',
    content: '确定要删除这门课程吗？',
    onConfirm: async () => {
      await deleteCourse();
      showToast('课程已删除', 'success');
      router.push('/course');
    },
    onCancel: () => { },
  });
};

const deleteCourse = async () => {
  const courseId = route.params.id;
  await courseStore.deleteCourse(courseId);
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
      <!-- 子课程信息 -->
      <div v-if="course.sub_courses && course.sub_courses.length > 0" class="sub-courses">
        <h4>子课程信息</h4>
        <ul>
          <li v-for="subCourse in course.sub_courses" :key="subCourse.id">
            <span>年月: {{ subCourse.year }}-{{ subCourse.month }}</span>
            <span>费用: {{ subCourse.fee }}</span>
          </li>
        </ul>
      </div>
      <!-- 学生信息 -->
      <div v-if="course.students && course.students.length > 0" class="students">
        <h4>学生信息</h4>
        <ul>
          <li v-for="student in course.students" :key="student.id">
            <span>{{ student.nickname }}</span>
          </li>
        </ul>
      </div>
      <div class="list-detail-actions" v-if="isTeacher">
        <div class="btn-group">
          <router-link to="/course" class="btn-group-item secondary-btn">返回</router-link>
          <router-link :to="`/course/${course.id}/edit`" class="btn-group-item yellow-btn">编辑</router-link>
          <div class="btn-group-item red-btn" @click="confirmDeleteCourse">删除</div>
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

.sub-courses,
.students {
  margin-top: 1rem;
}

.sub-courses ul,
.students ul {
  list-style: none;
  padding: 0;
}

.sub-courses li,
.students li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.sub-courses li span,
.students li span {
  flex: 1;
}

.sub-courses li span:first-child,
.students li span:first-child {
  font-weight: bold;
}
</style>
