<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCourseStore } from '@/stores/course';
import { useInvoiceStore } from '@/stores/invoice';
import { useRouter } from 'vue-router';
import { useToast } from '@/utils/useToast';

const { showToast } = useToast();
const router = useRouter();
const userStore = useUserStore();
const courseStore = useCourseStore();
const invoiceStore = useInvoiceStore();

const selectedCourseId = ref(null);
const selectedSubCourses = ref([]);
const selectedStudentId = ref(null);
const isSubmitting = ref(false);

const teacherCourses = computed(() => {
  return courseStore.courses.filter(course => course.teacher_id === userStore.userData.id);
});

const selectedCourse = computed(() => {
  return teacherCourses.value.find(course => course.id === selectedCourseId.value);
});

const totalFee = computed(() => {
  return selectedSubCourses.value.reduce((total, subCourse) => total + parseFloat(subCourse.fee), 0).toFixed(2);
});

const subCourseCount = computed(() => {
  return selectedSubCourses.value.length;
});

const createInvoice = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  let params = {
    course_id: selectedCourseId.value,
    sub_course_ids: selectedSubCourses.value.map(subCourse => subCourse.id),
    student_id: selectedStudentId.value,
  };

  await invoiceStore.createInvoice(params).then(() => {
    showToast('账单创建成功', 'success');
    setTimeout(() => {
      router.push('/invoice');
    }, 3000);
  }).finally(() => {
    isSubmitting.value = false;
  });
};

const selectSubCourse = (subCourse) => {
  if (!selectedSubCourses.value.some(sc => sc.id === subCourse.id)) {
    selectedSubCourses.value.push(subCourse);
  }
};

const deselectSubCourse = (subCourse) => {
  const index = selectedSubCourses.value.findIndex(sc => sc.id === subCourse.id);
  if (index > -1) {
    selectedSubCourses.value.splice(index, 1);
  }
};

const selectStudent = (studentId) => {
  selectedStudentId.value = studentId;
};

onMounted(() => {
  courseStore.fetchCourses();
});
</script>

<template>
  <div class="list-detail">
    <h2>创建账单</h2>
    <form @submit.prevent="createInvoice">
      <!-- 选择课程 -->
      <div class="form-group">
        <label class="form-label">选择课程</label>
        <select class="styled-select" v-model="selectedCourseId">
          <option v-for="course in teacherCourses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select>
      </div>
      <!-- 选择子课程 -->
      <div v-if="selectedCourse">
        <hr />
        <h4>选择子课程</h4>
        <div class="form-group" v-for="subCourse in selectedCourse.sub_courses" :key="subCourse.id">
          <label>
            <input type="checkbox" :value="subCourse" @change="selectSubCourse(subCourse)" />
            年月：{{ subCourse.year_month }}，费用：{{ subCourse.fee }}
          </label>
        </div>
      </div>
      <!-- 选择学生 -->
      <div v-if="selectedCourse">
        <hr />
        <h4>选择付费学生</h4>
        <div class="form-group">
          <label class="form-label">学生</label>
          <select class="styled-select" v-model="selectedStudentId">
            <option v-for="student in selectedCourse.students" :key="student.id" :value="student.id">{{ student.nickname
              }}</option>
          </select>
        </div>
      </div>
      <!-- 结算统计栏 -->
      <div v-if="selectedSubCourses.length > 0">
        <hr />
        <h4>结算统计</h4>
        <div class="summary">
          <div class="summary-item">
            <span class="summary-label">子课程数：</span>
            <span class="summary-value">{{ subCourseCount }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">总费用：</span>
            <span class="summary-value">{{ totalFee }}</span>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <router-link to="/invoice" class="btn-group-item secondary-btn">返回</router-link>
        <button type="submit" class="btn-group-item primary-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '创建' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
/** */
</style>
