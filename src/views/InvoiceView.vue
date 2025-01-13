<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInvoiceStore } from '@/stores/invoice';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import CommonPagination from '@/components/common/CommonPagination.vue';
import { format } from 'date-fns';
import { useModalStore } from '@/stores/modalStore';
import { useToast } from '@/utils/useToast';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const invoiceStore = useInvoiceStore();
const router = useRouter();
const isTeacher = userStore.isTeacher();
const modalStore = useModalStore();
const { showToast } = useToast();
const { fetchInvoices, cancelInvoice, sendInvoice } = invoiceStore;
const loading = ref(false);

const loadInvoices = async (page) => {
  loading.value = true;
  await fetchInvoices(page);
  loading.value = false;
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yy/MM/dd HH:mm:ss');
};

const confirmCancelInvoice = (invoiceId) => {
  modalStore.show({
    title: '确认取消',
    content: '确定要取消这张账单吗？',
    onConfirm: async () => {
      await cancelInvoice(invoiceId);
      showToast('账单已取消', 'success');
      loadInvoices(invoiceStore.currentPage);
    },
    onCancel: () => { },
  });
};

const confirmSendInvoice = (invoiceId) => {
  modalStore.show({
    title: '确认发送',
    content: '确定要发送这张账单吗？',
    onConfirm: async () => {
      await sendInvoice(invoiceId);
      showToast('账单已发送', 'success');
      loadInvoices(invoiceStore.currentPage);
    },
    onCancel: () => { },
  });
};

onMounted(() => {
  loadInvoices();
});
</script>
<template>
  <div>
    <div class="page-title">账单{{ isTeacher ? '管理' : '' }}</div>
    <div class="page-container">
      <!-- 教师用户操作按钮 -->
      <div v-if="isTeacher" class="common-list-top-actions">
        <router-link to="/invoice/create" class="primary-btn">创建账单</router-link>
      </div>
      <!-- 加载动画 -->
      <div v-if="loading" class="loading">
        <LoadingSpinner />
      </div>
      <!-- 账单列表 -->
      <ul class="common-list" v-else-if="invoiceStore.invoices.length > 0">
        <li v-for="invoice in invoiceStore.invoices" :key="invoice.id" class="common-list-item">
          <div class="common-list-info">
            <h3>账单号：{{ invoice.invoice_no }}</h3>
            <div class="common-list-details">
              <span>创建者: {{ invoice.creator_name }}</span>
              <span>学员: {{ invoice.student_name }}</span>
              <span>课程名: {{ invoice.course_name }}</span>
            </div>
            <div class="common-list-details">
              <span>金额: {{ invoice.total_amount }}</span>
              <span>日期: {{ formatDate(invoice.created_at) }}</span>
              <span>状态: {{ invoice.status_name }}</span>
            </div>
          </div>
          <div class="common-list-actions">
            <router-link :to="`/invoice/${invoice.id}`" class="primary-btn">查看详情</router-link>
            <div v-if="invoice.creator_id == userStore.userData.id" class="btn-group">
              <button v-if="invoice.operation_status.canSend" class="btn-group-item orange-btn"
                @click="confirmSendInvoice(invoice.id)">发送</button>
              <button v-if="invoice.operation_status.canCancel" class="btn-group-item red-btn"
                @click="confirmCancelInvoice(invoice.id)">取消</button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="common-list-no-data">暂无账单</div>
      <!-- 分页控件 -->
      <CommonPagination v-if="invoiceStore.invoices.length > 0" :currentPage="invoiceStore.currentPage"
        :totalPages="invoiceStore.totalPages" @changePage="loadInvoices" />
    </div>
  </div>
</template>
<style lang="less" scoped>
/** */
</style>
