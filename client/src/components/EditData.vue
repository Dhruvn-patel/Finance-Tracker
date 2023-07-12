<template>
  <v-card class="mx-auto mt-6 text-xs-center text-center" max-width="1000">
    <h1>Edit Transaction</h1>
    <v-container>
      <v-form class="pt-6" v-model="valid" @submit.prevent="submit" ref="form">
        <v-text-field
          class="me-10"
          v-model="transaction.selectDate"
          label="Transaction Date"
          type="date"
          :rules="tranasactionRules.date"
        ></v-text-field>

        <v-select
          label="Select Month Year"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectMonth"
          :rules="tranasactionRules.select"
          :items="monthyear"
        ></v-select>
        <v-select
          label="Transaction type"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectTransactionType"
          :rules="tranasactionRules.select"
          :items="types"
        ></v-select>
        <v-select
          label="From Account"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectFrom"
          :rules="accountTypeRule.accountSame"
          :customRules="tranasactionRules.select"
          :items="account"
        ></v-select>
        <v-select
          label="To Account"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectTo"
          :rules="accountTypeRule.accountSame"
          :customRules="tranasactionRules.select"
          :items="account"
        ></v-select>
        <v-text-field
          v-model.trim="transaction.Amount"
          class="me-10"
          label="Amount"
          :rules="tranasactionRules.amount"
        ></v-text-field>

        <v-file-input
          v-if="flag"
          clearable
          label="Image upload"
          class="me-10"
          accept=".png, .jpg, .jpeg"
          ref="uploadFile"
          type="file"
          :rules="tranasactionRules.files"
        ></v-file-input>
        <v-card class="mx-auto" max-width="300" v-else>
          <v-card-text class="d-flex justify-space-between">
            <v-btn icon="mdi-close" @click="colseImg"> </v-btn>
          </v-card-text>
          <v-img
            width="300"
            cover
            :aspect-ratio="16 / 9"
            class="my-5 ml-auto"
            :src="transaction.imgurl"
          >
          </v-img>

          <v-divider class="mx-4"></v-divider>
        </v-card>

        <v-textarea
          label="Notes"
          class="me-10"
          v-model.trim="transaction.notes"
          :rules="tranasactionRules.notes"
        ></v-textarea>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn block class="mb-8" size="large" type="submit">
          Edit transaction
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { transactionValidate } from "../helper/transaction/transaction.rules";
import {
  singleData,
  TranasactionDataUpdate,
} from "../service/transaction.service";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "TheEdit",

  setup() {
    const router = useRouter();
    const route = useRoute();
    /* rules computed */

    const tranasactionRules = computed(() => {
      return transactionValidate;
    });
    const accountTypeRule = computed(() => {
      const valid = transaction.value.selectFrom === transaction.value.selectTo;
      return {
        accountSame: [() => !valid || "Account can not be same"],
      };
    });

    /* state  */
    const form = ref("");
    const uploadFile = ref("");
    const flag = ref(false);
    const transaction = ref({
      selectDate: "",
      selectMonth: "",
      selectTransactionType: "",
      Amount: "",
      selectFrom: "",
      selectTo: "",
      notes: "",
      imgurl: null,
    });
    const monthyear = [
      "Jan 2023",
      "Feb 2023",
      "Mar 2023",
      "Apr 2023",
      "May 2023",
      "Jun 2023",
      "Jul 2023",
      "Aug 2023",
      "Sep 2023",
      "Oct 2023",
      "Nov 2023",
      "Dec 2023",
    ];

    const account = [
      "Personal Account ",
      "From Account",
      "Real Living",
      "Full Circle",
      "Core Realtors",
      "Big Block",
    ];
    const types = ["Home Expense ", "Personal Expense", "Income"];

    /* methods */
    function colseImg() {
      flag.value = !flag.value;
      console.log("bdfj", flag.value);
    }

    async function submit() {
      const validate = await form.value.validate();
      const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
      if (validate.valid) {
        let file;
        let data;
        if (flag.value !== false) {
          file = uploadFile.value.files.item(0);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = async (base64) => {
            const base64String = reader.result;
            const img = base64.currentTarget.result;
            data = {
              receipt: img,
              userId: userId,
              trdate: transaction.value.selectDate,
              monthyear: transaction.value.selectMonth,
              type: transaction.value.selectTransactionType,
              fromaccount: transaction.value.selectFrom,
              toaccount: transaction.value.selectTo,
              amount: transaction.value.Amount,
              notes: transaction.value.notes,
            };
          };
        } else {
          data = {
            receipt: transaction.value.imgurl,
            userId: userId,
            trdate: transaction.value.selectDate,
            monthyear: transaction.value.selectMonth,
            type: transaction.value.selectTransactionType,
            fromaccount: transaction.value.selectFrom,
            toaccount: transaction.value.selectTo,
            amount: transaction.value.Amount,
            notes: transaction.value.notes,
          };
        }

        const ItemId = route.params.id;
        try {
          const responseData = await TranasactionDataUpdate(data, ItemId);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Data Updated !",
            customClass: "swal-wide",
            showConfirmButton: false,
            timer: 1000,
          });
          return router.push("/");
        } catch (error) {
          return error;
        }
      }
    }

    onMounted(async () => {
      const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
      const itemId = route.params.id;
      const data = {
        params: {
          userId: userId,
          id: itemId,
        },
      };
      try {
        const resultdata = await singleData(data);
        console.log("resultdata", resultdata);
        const singleEditData = resultdata.data;
        transaction.value.selectDate = singleEditData.trdate.split("T")[0];
        transaction.value.selectMonth = singleEditData.monthyear;
        transaction.value.selectTransactionType = singleEditData.type;
        transaction.value.Amount = singleEditData.amount;
        transaction.value.selectFrom = singleEditData.fromaccount;
        transaction.value.selectTo = singleEditData.toaccount;
        transaction.value.notes = singleEditData.notes;
        transaction.value.imgurl = singleEditData.receipt;
        
      } catch (error) {
        return error;
      }
    });

    return {
      colseImg,
      transaction,
      accountTypeRule,
      tranasactionRules,
      monthyear,
      account,
      types,
      form,
      submit,
      uploadFile,
      flag,
    };
  },
};
</script>

<style></style>
