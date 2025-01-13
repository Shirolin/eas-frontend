<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInvoiceStore } from '@/stores/invoice';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useToast } from '@/utils/useToast';

const route = useRoute();
const router = useRouter();
const invoiceStore = useInvoiceStore();
const { showToast } = useToast();
const invoice = ref({});
const loading = ref(false);
const cardNumber = ref('');
const cardExpiry = ref('');
const cardCVC = ref('');
const isSubmitting = ref(false);

const fetchInvoiceDetail = async () => {
  const invoiceId = route.params.id;
  invoice.value = await invoiceStore.fetchInvoice(invoiceId);
  loading.value = false;
};

const payInvoice = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  const paymentData = {
    card_number: cardNumber.value,
    card_expiry: cardExpiry.value,
    card_cvc: cardCVC.value,
  };

  try {
    await invoiceStore.payInvoice(invoice.value.id, paymentData);
    showToast('账单支付成功', 'success');
    router.push('/invoice');
  } catch (error) {
    showToast('账单支付失败', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  loading.value = true;
  fetchInvoiceDetail();
});
</script>

<template>
  <div class="list-detail">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <h2>支付账单</h2>
      <div class="list-details">
        <span>账单号: {{ invoice.invoice_no }}</span>
        <span>用户: {{ invoice.student_name }}</span>
        <span>课程: {{ invoice.course_name }}</span>
        <span>金额: {{ invoice.total_amount }}</span>
        <span>状态: {{ invoice.status_name }}</span>
        <span>创建者: {{ invoice.creator_name }}</span>
        <span>日期: {{ invoice.created_at }}</span>
      </div>
      <div v-if="invoice.items && invoice.items.length > 0" class="invoice-items">
        <h4>账单明细: {{ invoice.items.length }}项</h4>
        <ul>
          <li v-for="item in invoice.items" :key="item.id">
            <span>子课程: {{ item.sub_course.year_month }}</span>
            <span>金额: {{ item.amount }}</span>
          </li>
        </ul>
      </div>
      <hr />
      <h4>信用卡信息</h4>
      <div class="form-group">
        <label class="form-label">卡号</label>
        <input class="form-input" type="text" v-model="cardNumber" placeholder="1234 5678 9012 3456" />
      </div>
      <div class="form-group">
        <label class="form-label">有效期</label>
        <input class="form-input" type="text" v-model="cardExpiry" placeholder="MM/YY" />
      </div>
      <div class="form-group">
        <label class="form-label">CVC</label>
        <input class="form-input" type="text" v-model="cardCVC" placeholder="123" />
      </div>
      <div class="btn-group">
        <router-link to="/invoice" class="btn-group-item secondary-btn">返回</router-link>
        <button type="submit" class="btn-group-item primary-btn" :disabled="isSubmitting" @click="payInvoice">
          {{ isSubmitting ? '支付中...' : '支付' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list-details {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  span {
    margin-bottom: 0.5rem;
  }
}

.invoice-items {
  margin-top: 1rem;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ccc;

    span {
      flex: 1;
    }

    span:first-child {
      font-weight: bold;
    }
  }
}
</style>
