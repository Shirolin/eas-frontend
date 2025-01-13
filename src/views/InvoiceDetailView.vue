<!-- CREATE TABLE "public"."invoices" (
  "id" int8 NOT NULL DEFAULT nextval('invoices_id_seq'::regclass),
  "invoice_no" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "course_id" int4 NOT NULL,
  "student_id" int4 NOT NULL,
  "creator_id" int4 NOT NULL,
  "total_amount" numeric(10,2) NOT NULL,
  "currency" varchar(10) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'CNY'::character varying,
  "status" int2 NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  CONSTRAINT "invoices_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "invoices_invoice_no_unique" UNIQUE ("invoice_no")
);
CREATE TABLE "public"."invoice_items" (
  "id" int8 NOT NULL DEFAULT nextval('invoice_items_id_seq'::regclass),
  "invoice_id" int4 NOT NULL,
  "sub_course_id" int4 NOT NULL,
  "amount" numeric(10,2) NOT NULL,
  "created_at" timestamp(0),
  "updated_at" timestamp(0),
  CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
); -->
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
      <h2>账单号：{{ invoice.invoice_no }}</h2>
      <div class="list-details">
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
            <span>子课程: {{ item.sub_course_name }}</span>
            <span>金额: {{ item.amount }}</span>
          </li>
        </ul>
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

.list-detail-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
