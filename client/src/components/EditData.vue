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
          v-if="flag == false"
          clearable
          label="Image upload"
          class="me-10"
          accept=".png, .jpg, .jpeg"
          ref="file"
          type="file"
          :rules="rules.files"
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
          :rules="rules.notes"
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
import { TranasactionDataUpdate } from "../service/transaction.service";
import { transactionValidate } from "../helper/transaction/transaction.rules";
export default {
  name: "TheEdit",
  data() {
    return {
      flag: true,
      transaction: {
        selectDate: "",
        selectMonth: "",
        selectTransactionType: "",
        Amount: "",
        selectFrom: "",
        selectTo: "",
        notes: "",
        imgurl: null,
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
    colseImg() {
      return (this.flag = !this.flag);
    },
    async submit() {
      const validate = await this.$refs.form.validate();

      const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
      if (validate.valid) {
        let file;

        if (this.flag == false) {
          file = this.$refs.file.files.item(0);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = async (base64) => {
            const base64String = reader.result;
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

            const ItemId = this.$route.params.id;
            const responseData = await TranasactionDataUpdate(data, ItemId);
            this.$swal({
              position: "top-center",
              icon: "success",
              title: "Data Updated !",
              customClass: "swal-wide",
              showConfirmButton: false,
              timer: 1000,
            });
            return this.$router.push("/");
          };
        } else {
          const data = {
            receipt: this.transaction.imgurl,
            userId: userId,
            trdate: this.transaction.selectDate,
            monthyear: this.transaction.selectMonth,
            type: this.transaction.selectTransactionType,
            fromaccount: this.transaction.selectFrom,
            toaccount: this.transaction.selectTo,
            amount: this.transaction.Amount,
            notes: this.transaction.notes,
          };
          const ItemId = this.$route.params.id;
          const responseData = await TranasactionDataUpdate(data, ItemId);
          this.$swal({
            position: "top-center",
            icon: "success",
            title: "Data Updated !",
            customClass: "swal-wide",
            showConfirmButton: false,
            timer: 1000,
          });
          return this.$router.push("/");
        }
      }
    },
  },
  mounted() {
    const itemId = this.$route.params.id;
    const data = JSON.parse(localStorage.getItem("transactionData"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == itemId) {
        this.transaction.selectDate = data[i].trdate.split("T")[0];
        this.transaction.selectMonth = data[i].monthyear;
        this.transaction.selectTransactionType = data[i].type;
        this.transaction.Amount = data[i].amount;
        this.transaction.selectFrom = data[i].fromaccount;
        this.transaction.selectTo = data[i].toaccount;
        this.transaction.notes = data[i].notes;
        this.transaction.imgurl = data[i].receipt;
        break;
      }
    }
  },
};
</script>

<style></style>
