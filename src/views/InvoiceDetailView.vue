<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useInvoiceStore } from '@/stores/invoice';
import { useUserStore } from '@/stores/user';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useDebounce } from '@/utils/useDebounce';
import { useModalStore } from '@/stores/modalStore';
import { useToast } from '@/utils/useToast';

const route = useRoute();
const router = useRouter();
const invoiceStore = useInvoiceStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const { showToast } = useToast();
const invoice = ref({});
const loading = ref(false);

const fetchInvoiceDetail = async () => {
  const invoiceId = route.params.id;
  invoice.value = await invoiceStore.fetchInvoice(invoiceId);
  loading.value = false;
};

const debouncedFetchInvoiceDetail = useDebounce(fetchInvoiceDetail, 300);

const loadInvoiceDetail = () => {
  loading.value = true;
  debouncedFetchInvoiceDetail();
};

const confirmCancelInvoice = () => {
  modalStore.show({
    title: '确认取消',
    content: '确定要取消这张账单吗？',
    onConfirm: async () => {
      await cancelInvoice();
      showToast('账单已取消', 'success');
      router.push('/invoice');
    },
    onCancel: () => { },
  });
};

const cancelInvoice = async () => {
  const invoiceId = route.params.id;
  await invoiceStore.cancelInvoice(invoiceId);
};

const confirmSendInvoice = () => {
  modalStore.show({
    title: '确认发送',
    content: '确定要发送这张账单吗？',
    onConfirm: async () => {
      await sendInvoice();
      showToast('账单已发送', 'success');
      router.push('/invoice');
    },
    onCancel: () => { },
  });
};

const sendInvoice = async () => {
  const invoiceId = route.params.id;
  await invoiceStore.sendInvoice(invoiceId);
};

const navigateToEditInvoice = () => {
  router.push(`/invoice/edit/${invoice.value.id}`);
};

onMounted(() => {
  loadInvoiceDetail();
});
</script>
<template>
  <div class="list-detail">
    <div v-if="loading" class="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <h2>{{ invoice.number }}</h2>
      <p>{{ invoice.description }}</p>
      <div class="list-details">
        <span>客户: {{ invoice.customer_name }}</span>
        <span>金额: {{ invoice.amount }}</span>
        <span>日期: {{ invoice.date }}</span>
      </div>
      <div class="list-detail-actions">
        <div class="btn-group">
          <router-link to="/invoice" class="btn-group-item secondary-btn">返回</router-link>
          <button v-if="invoice.creator_id == userStore.userData.id" class="btn-group-item green-btn"
            @click="confirmSendInvoice">发送</button>
          <div v-if="invoice.creator_id == userStore.userData.id" class="btn-group-item orange-btn"
            @click="confirmCancelInvoice">取消</div>
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

.list-detail-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
