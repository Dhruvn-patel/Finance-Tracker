<template>
  <section>
    <v-sheet class="ma-10 ma-10 py-5 d-flex justify-space-around" elevation="4">
      <v-table class="mt-6">
        <thead>
          <tr>
            <th class="text-left text-h4">Field</th>
            <th class="text-left text-h4">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Transaction Date</td>
            <td>{{ singleDataObj.trdate }}</td>
          </tr>
          <tr>
            <td>Month Year</td>
            <td>{{ singleDataObj.monthyear }}</td>
          </tr>
          <tr>
            <td>Transaction Type</td>
            <td>{{ singleDataObj.type }}</td>
          </tr>
          <tr>
            <td>From Account</td>
            <td>{{ singleDataObj.fromaccount }}</td>
          </tr>
          <tr>
            <td>To Account</td>
            <td>{{ singleDataObj.toaccount }}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{{ singleDataObj.amount }}</td>
          </tr>
          <tr>
            <td>Receipt</td>
            <td>
              <img :src="singleDataObj.receipt" alt="" />
            </td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{{ singleDataObj.notes }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-sheet>
        <v-btn
          size="large"
          color="red"
          @click="deleteFunction(singleDataObj.id)"
        >
          Delete Transaction</v-btn
        ></v-sheet
      >
    </v-sheet>
  </section>
</template>

<script>
import { TranasactionDataDelete } from "../service/transaction.service";
export default {
  name: "TheView",
  data() {
    return {
      singleDataObj: {},
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const singleData = JSON.parse(
      localStorage.getItem("transactionData")
    ).filter((item) => item.id === Number(id));
    this.singleDataObj = singleData[0];
  },
  methods: {
    async deleteFunction(id) {
      await TranasactionDataDelete(id);
      this.$swal({
        position: "top-center",
        icon: "success",
        title: "deleted record",
        customClass: "swal-wide",
        showConfirmButton: false,
        timer: 800,
      });
      return this.$router.push("/");
    },
  },
};
</script>

<style scoped>
* {
  font-size: 25px;
}
</style>
