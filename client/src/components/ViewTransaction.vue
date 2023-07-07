<template>
  <div>
    <div v-if="desserts.length > 0">
      <v-card>
        <v-chip class="ma-3 pa-5 text-h5" color="primary" label>
          Group By :
        </v-chip>
        <v-btn color="primary">
          Select
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in selectItems"
                :key="index"
                :value="index"
                @click="groupByFunction(item.name)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-card>
      <!-- Component -->
      <v-list>
        <v-card
          v-for="(item, index) in selectedArr"
          :key="index"
          :value="index"
        >
          <v-card>
            <v-chip class="ma-3 pa-5 text-h5" color="primary" label>
              {{ index }}
            </v-chip>
            <GroupCommon :selectedArr="item"> </GroupCommon>
          </v-card>
        </v-card>
      </v-list>
    </div>
    <div v-else>
      <v-chip class="mt-5 text-h2 h-100" label> No Transaction Data</v-chip>
    </div>
  </div>
</template>

<script>
import { TranasactionByuserId } from "../service/transaction.service";
import GroupCommon from "../components/GroupCommon.vue";
export default {
  name: "viewTransaction",
  computed: {},
  components: {
    GroupCommon,
  },
  data() {
    return {
      selectedArr: {},
      selectItems: [
        { title: "none", name: "none" },
        { title: "Month Year", name: "monthyear" },
        { title: "Transaction Type", name: "type" },
        { title: "From Account", name: "fromaccount" },
        { title: "To Account", name: "toaccount" },
      ],
      desserts: [],
    };
  },
  methods: {
    groupByFunction(columnName) {

      const groupByCategory = this.desserts.reduce((group, product) => {
        let key = product[columnName];
        if (columnName === "none") {
          key = "AllData";
        }
        group[key] = group[key] ?? [];
        group[key].push(product);
        return group;
      }, {});
 
      this.selectedArr = groupByCategory;
      for (let idx in groupByCategory) {
        console.log(groupByCategory[idx]);
      }
    },
  },
  async mounted() {
    const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
    const result = await TranasactionByuserId(userId);
    this.desserts = result.data.allData;
    localStorage.setItem("transactionData", JSON.stringify(this.desserts));
    this.selectedArr = { AllData: this.desserts };
  },
};
</script>

<style scoped></style>
