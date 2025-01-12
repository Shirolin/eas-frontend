<script setup>
import { ref, onMounted } from 'vue';
import { useInvoiceStore } from '@/stores/invoice';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { format } from 'date-fns'; // 确保正确导入

const invoiceStore = useInvoiceStore();
const { fetchInvoices } = invoiceStore;
const loading = ref(false);

const loadInvoices = async (page) => {
  loading.value = true;
  await fetchInvoices(page);
  loading.value = false;
};

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yy/MM/dd HH:mm:ss');
};

onMounted(() => {
  loadInvoices();
});
</script>
<template>
  <div>
    <div class="page-title">账单</div>
    <div class="page-container">
      <!-- 加载动画 -->
      <div v-if="loading" class="loading">
        <LoadingSpinner />
      </div>
      <!-- 账单列表 -->
      <ul class="invoice-list" v-else-if="invoiceStore.invoices.length > 0">
        <li v-for="invoice in invoiceStore.invoices" :key="invoice.id" class="invoice-item">
          <div class="invoice-info">
            <h3>账单号：{{ invoice.invoice_no }}</h3>
            <div class="invoice-extra-details">
              <span>创建者: {{ invoice.creator_name }}</span>
              <span>学员: {{ invoice.student_name }}</span>
              <span>课程名: {{ invoice.course_name }}</span>
            </div>
            <div class="invoice-extra-details">
              <span>金额: {{ invoice.total_amount }}</span>
              <span>日期: {{ formatDate(invoice.created_at) }}</span>
              <span>状态: {{ invoice.status_name }}</span>
            </div>
          </div>
          <div class="invoice-actions">
            <button class="details-button">查看详情</button>
          </div>
        </li>
      </ul>
      <div v-else class="no-invoices">暂无账单</div>
      <!-- 分页控件 -->
      <div class="pagination" v-if="invoiceStore.invoices.length > 0">
        <button @click="loadInvoices(invoiceStore.currentPage - 1)"
          :disabled="invoiceStore.currentPage === 1">上一页</button>
        <span>第 {{ invoiceStore.currentPage }} 页，共 {{ invoiceStore.totalPages }} 页</span>
        <button @click="loadInvoices(invoiceStore.currentPage + 1)"
          :disabled="invoiceStore.currentPage === invoiceStore.totalPages">下一页</button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.invoice-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;

  .invoice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @card-bg-color;
    border: 1px solid @card-border-color;
    border-radius: @card-radius;
    padding: @card-padding;
    margin-bottom: 1rem;
    box-shadow: @card-shadow;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .invoice-info {
      h3 {
        margin: 0 0 0.5rem 0;
      }

      .invoice-details {
        display: flex;
        justify-content: space-between;

        span {
          margin-right: 1rem;
        }
      }

      .invoice-extra-details {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;

        span {
          margin-right: 1rem;
        }
      }
    }

    .invoice-actions {
      display: flex;
      flex-direction: column;

      button {
        margin-top: 0.5rem;
      }
    }

    .details-button {
      background-color: @primary-color;
      color: @primary-color-text;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: @primary-color-hover;
      }

      &:active {
        background-color: @primary-color-active;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    background-color: @primary-color;
    color: @primary-color-text;
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 0.5rem;

    &:hover {
      background-color: @primary-color-hover;
    }

    &:active {
      background-color: @primary-color-active;
    }

    &:disabled {
      background-color: @secondary-color;
      cursor: not-allowed;
    }
  }
}

.no-invoices {
  text-align: center;
  color: @secondary-color-text;
  margin-top: 2rem;
}
</style>
