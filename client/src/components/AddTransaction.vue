<template>
  <v-card class="mx-auto mt-6 text-xs-center text-center" max-width="1000">
    <h1>Add Transaction</h1>
    <v-container>
      <v-form class="pt-6" v-model="valid" @submit.prevent="submit" ref="form">
        <v-text-field
          class="me-10"
          v-model="transaction.selectDate"
          label="Transaction Date"
          type="date"
          :rules="rules.date"
        ></v-text-field>

        <v-select
          label="Select Month Year"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectMonth"
          :rules="rules.select"
          :items="monthyear"
        ></v-select>
        <v-select
          label="Transaction type"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectTransactionType"
          :rules="rules.select"
          :items="types"
        ></v-select>
        <v-select
          label="From Account"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectFrom"
          :rules="accountTypeRule.accountSame"
          :customRules="rules.select"
          :items="account"
        ></v-select>
        <v-select
          label="To Account"
          density="comfortable"
          class="me-10"
          v-model="transaction.selectTo"
          :rules="accountTypeRule.accountSame"
          :customRules="rules.select"
          :items="account"
        ></v-select>
        <v-text-field
          v-model.trim="transaction.Amount"
          class="me-10"
          label="Amount"
          :rules="rules.amount"
        ></v-text-field>

        <v-file-input
          clearable
          label="Image upload"
          class="me-10"
          accept=".png, .jpg, .jpeg"
          ref="file"
          type="file"
          :rules="rules.files"
        ></v-file-input>

        <v-textarea
          label="Notes"
          class="me-10"
          v-model.trim="transaction.notes"
          :rules="rules.notes"
          ref="notes"
        ></v-textarea>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn block class="mb-8" size="large" type="submit">
          Add Transaction
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { ref } from "vue";
import { AddTranasaction } from "../service/transaction.service";
import { transactionValidate } from "../helper/transaction/transaction.rules";
export default {
  name: "AddTransaction",
  data() {
    return {
      transaction: {
        selectDate: "",
        selectMonth: "",
        selectTransactionType: "",
        Amount: "",
        selectFrom: "",
        selectTo: "",
        notes: "",
      },
      rules: transactionValidate,
      monthyear: [
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
      ],
      account: [
        "Personal Account ",
        "From Account",
        "Real Living",
        "Full Circle",
        "Core Realtors",
        "Big Block",
      ],
      types: ["Home Expense ", "Personal Expense", "Income"],
    };
  },
  computed: {
    accountTypeRule() {
      const valid = this.transaction.selectFrom === this.transaction.selectTo;
      return {
        accountSame: [() => !valid || "Account can not be same"],
      };
    },
  },
  methods: {
    async submit() {
      const validate = await this.$refs.form.validate();
    
      if (validate.valid) {
        let file = this.$refs.file.files.item(0);
        let reader = new FileReader();
        const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
        reader.readAsDataURL(file);
        reader.onloadend = async (base64) => {
          // convert file to base64 String
          const base64String = reader.result;
          // store file
          const img = base64.currentTarget.result;
          const data = {
            receipt: img,
            userId: userId,
            trdate: this.transaction.selectDate,
            monthyear: this.transaction.selectMonth,
            type: this.transaction.selectTransactionType,
            fromaccount: this.transaction.selectFrom,
            toaccount: this.transaction.selectTo,
            amount: this.transaction.Amount,
            notes: this.transaction.notes,
          };

          const responseData = await AddTranasaction(data);
          this.$router.push("/");
        };
      }
    },
  },
};
</script>

<style scoped></style>
