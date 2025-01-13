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
        <select v-model="selectedCourseId">
          <option v-for="course in teacherCourses" :key="course.id" :value="course.id">{{ course.name }}</option>
        </select>
      </div>
      <hr />
      <!-- 选择子课程 -->
      <div v-if="selectedCourse">
        <h4>选择子课程</h4>
        <div class="form-group" v-for="subCourse in selectedCourse.sub_courses" :key="subCourse.id">
          <label>
            <input type="checkbox" :value="subCourse" @change="selectSubCourse(subCourse)" />
            年月：{{ subCourse.year_month }}，费用：{{ subCourse.fee }}
          </label>
        </div>
      </div>
      <hr />
      <!-- 选择学生 -->
      <div v-if="selectedCourse">
        <h4>选择付费学生</h4>
        <div class="form-group">
          <label class="form-label">学生</label>
          <select v-model="selectedStudentId">
            <option v-for="student in selectedCourse.students" :key="student.id" :value="student.id">{{ student.nickname
              }}</option>
          </select>
        </div>
      </div>
      <hr />
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
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn-group-item {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-btn {
  background-color: #007bff;
  color: white;
}

.secondary-btn {
  background-color: #6c757d;
  color: white;
}
</style>
