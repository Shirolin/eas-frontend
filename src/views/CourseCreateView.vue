<!--
 CREATE TABLE "public"."courses" (
  "id" int8 NOT NULL DEFAULT nextval('courses_id_seq'::regclass),
  "teacher_id" int4 NOT NULL,
  "teacher_nickname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "unit_fee" numeric(10,2) NOT NULL,
  "status" int2 NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  CONSTRAINT "courses_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "courses_teacher_id_name_unique" UNIQUE ("teacher_id", "name")
);

CREATE TABLE "public"."sub_courses" (
  "id" int8 NOT NULL DEFAULT nextval('sub_courses_id_seq'::regclass),
  "course_id" int4 NOT NULL,
  "year" int4 NOT NULL,
  "month" int4 NOT NULL,
  "fee" numeric(10,2) NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  CONSTRAINT "sub_courses_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "sub_courses_course_id_year_month_unique" UNIQUE ("course_id", "year", "month")
)
-->
<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCourseStore } from '@/stores/course';
import { useRouter } from 'vue-router';
import { useToast } from '@/utils/useToast';
import { useDebounce } from '@/utils/useDebounce';
import CommonPagination from '@/components/common/CommonPagination.vue';


// 新增导入
import { useStudentStore } from '@/stores/student';

const { showToast } = useToast();
const router = useRouter();
const userStore = useUserStore();
const courseStore = useCourseStore();
// 新增学生仓库
const studentStore = useStudentStore();

const courseName = ref('');
const courseUnitFee = ref(0);
const courseTeacher = ref(userStore.userData.nickname);
const courseTeacherId = ref(userStore.userData.id);

// 新增子课程和学生选择
const subCourses = ref([]);
const selectedStudents = ref([]);

const createCourse = async () => {
  // 校验“年+月”组合唯一性
  const uniqueSubCourses = new Set(subCourses.value.map(subCourse => subCourse.month));
  if (uniqueSubCourses.size !== subCourses.value.length) {
    showToast('子课程的年份和月份组合必须唯一', 'error');
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
    }, 3000);
  });
};

// 新增方法
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
      <div class="form-group">
        <label class="form-label">选择学生</label>
        <select class="form-input" v-model="selectedStudents" multiple>
          <option v-for="student in studentStore.students" :key="student.id" :value="student">{{ student.nickname }}
          </option>
        </select>
      </div>
      <CommonPagination v-if="studentStore.students.length > 0" :currentPage="studentStore.currentPage"
        :totalPages="studentStore.totalPages" @changePage="debouncedLoadStudents" />
      <hr />
      <div class="btn-group">
        <router-link to="/course" class="btn-group-item secondary-btn">返回</router-link>
        <button type="submit" class="btn-group-item primary-btn">创建</button>
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
</style>
