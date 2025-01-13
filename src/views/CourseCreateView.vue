<!-- CREATE TABLE "public"."courses" (
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
); -->
<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCourseStore } from '@/stores/course';
import { useRouter } from 'vue-router';
import { useToast } from '@/utils/useToast';

const { showToast } = useToast();
const router = useRouter();
const userStore = useUserStore();
const courseStore = useCourseStore();
const courseName = ref('');
const courseUnitFee = ref(0);
const courseTeacher = ref(userStore.userData.nickname);
const courseTeacherId = ref(userStore.userData.id);

const createCourse = async () => {
  let params = {
    course: {
      name: courseName.value,
      unit_fee: courseUnitFee.value,
      teacher_id: courseTeacherId.value,
    },
    sub_courses: [],
  }
  console.log(params);
  await courseStore.createCourse(params).then(() => {
    showToast('创建成功', 'success');
    setTimeout(() => {
      router.push('/course');
    }, 3000);
  });
  // 跳转到课程列表页面
};
</script>

<template>
  <div class="list-detail">
    <h2>创建课程</h2>
    <form @submit.prevent="createCourse">
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
      <div class="btn-group">
        <router-link to="/course" class="btn-group-item secondary-btn">返回</router-link>
        <button type="submit" class="btn-group-item primary-btn">创建</button>
      </div>
    </form>
  </div>
</template>
<style lang="less" scoped>
/** */
</style>
