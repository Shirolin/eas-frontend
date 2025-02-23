<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCourseStore } from '@/stores/course';
import { useRouter } from 'vue-router';
import { useToast } from '@/utils/useToast';
import { useDebounce } from '@/utils/useDebounce';
import CommonPagination from '@/components/common/CommonPagination.vue';
import { useStudentStore } from '@/stores/student';

const { showToast } = useToast();
const router = useRouter();
const userStore = useUserStore();
const courseStore = useCourseStore();
const studentStore = useStudentStore();

const courseName = ref('');
const courseUnitFee = ref(0);
const courseTeacher = ref(userStore.userData.nickname);
const courseTeacherId = ref(userStore.userData.id);

// 新增子课程和学生选择
const subCourses = ref([]);
const selectedStudents = ref([]);
const isSubmitting = ref(false);

const createCourse = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  // 校验“年+月”组合唯一性
  const uniqueSubCourses = new Set(subCourses.value.map(subCourse => subCourse.month));
  if (uniqueSubCourses.size !== subCourses.value.length) {
    showToast('子课程的年份和月份组合必须唯一', 'error');
    isSubmitting.value = false;
    return;
  }

  // 拆分年月
  const formattedSubCourses = subCourses.value.map(subCourse => {
    const [year, month] = subCourse.month.split('-');
    return { year, month };
  });

  let params = {
    course: {
      name: courseName.value,
      unit_fee: courseUnitFee.value,
      teacher_id: courseTeacherId.value,
    },
    sub_courses: formattedSubCourses,
    student_ids: selectedStudents.value.map(student => student.id),
  }
  console.log(params);
  await courseStore.createCourse(params).then(() => {
    showToast('创建成功', 'success');
    setTimeout(() => {
      router.push('/course');
    }, 1000);
  }).catch((error) => {
    showToast(`创建失败: ${error.message}`, 'error');
  }).finally(() => {
    isSubmitting.value = false;
  });
};

const addSubCourse = () => {
  subCourses.value.push({ month: '', fee: 0 });
};

const removeSubCourse = (index) => {
  subCourses.value.splice(index, 1);
};

const fetchStudents = async () => {
  await studentStore.fetchStudents();
};

const loadStudents = async (page) => {
  await fetchStudents(page);
};

const debouncedLoadStudents = useDebounce(loadStudents, 300);

const selectStudent = (student) => {
  if (!selectedStudents.value.some(s => s.id === student.id)) {
    selectedStudents.value.push(student);
  }
};

const deselectStudent = (student) => {
  const index = selectedStudents.value.findIndex(s => s.id === student.id);
  if (index > -1) {
    selectedStudents.value.splice(index, 1);
  }
};

onMounted(() => {
  loadStudents();
});
</script>

<template>
  <div class="list-detail">
    <h2>创建课程</h2>
    <form @submit.prevent="createCourse">
      <!-- 课程信息 -->
      <div class="form-group">
        <label class="form-label" for="course-name">课程名称</label>
        <input class="form-input" type="text" id="course-name" v-model="courseName" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="course-unit-fee">课程单价</label>
        <input class="form-input" type="number" id="course-unit-fee" v-model="courseUnitFee" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="course-treacher">教师</label>
        <input class="form-input" type="text" id="course-treacher" v-model="courseTeacher" disabled />
      </div>
      <hr />
      <!-- 子课程信息 -->
      <h4>子课程信息</h4>
      <div v-if="subCourses.length > 0">
        <div class="form-group" v-for="(subCourse, index) in subCourses" :key="index">
          <div class="form-row-title">子课程 {{ index + 1 }}</div>
          <div class="form-row">
            <label class="form-label">年月</label>
            <input class="form-input month-input" type="month" v-model="subCourse.month" required />
            <button class="red-btn" @click="removeSubCourse(index)">-</button>
          </div>
        </div>
      </div>
      <button class="green-btn" @click="addSubCourse">+</button>
      <hr />
      <!-- 学生选择 -->
      <h4>参与该课程的学生</h4>
      <div class="student-selection">
        <div class="student-list">
          <h5>待选学生</h5>
          <ul>
            <li v-for="student in studentStore.students" :key="student.id">
              <button @click="selectStudent(student)"
                :class="{ selected: selectedStudents.some(s => s.id === student.id) }"
                :disabled="selectedStudents.some(s => s.id === student.id)">
                {{ student.nickname }}
              </button>
            </li>
          </ul>
        </div>
        <div class="student-list">
          <h5>已选学生</h5>
          <ul>
            <li v-for="student in selectedStudents" :key="student.id">
              <button @click="deselectStudent(student)">{{ student.nickname }}</button>
            </li>
          </ul>
        </div>
      </div>
      <CommonPagination v-if="studentStore.students.length > 0" :currentPage="studentStore.currentPage"
        :totalPages="studentStore.totalPages" @changePage="debouncedLoadStudents" />
      <hr />
      <div class="btn-group">
        <router-link to="/course" class="btn-group-item secondary-btn">返回</router-link>
        <button type="submit" class="btn-group-item primary-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '创建' }}
        </button>
      </div>
    </form>
  </div>
</template>
<style lang="less" scoped>
.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-row-title {
  margin-bottom: 0.5rem;
}

.month-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.student-selection {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.student-list {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.student-list h5 {
  margin-bottom: 10px;
}

.student-list ul {
  list-style: none;
  padding: 0;
}

.student-list li {
  margin-bottom: 5px;
}

.student-list button {
  width: 100%;
  padding: 5px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.student-list button:hover {
  background-color: #e0e0e0;
}

.student-list button.selected {
  background-color: #d0d0d0;
  cursor: not-allowed;
}
</style>
