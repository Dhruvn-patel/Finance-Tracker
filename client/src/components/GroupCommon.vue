<template>
  <div class="elevation-1 ma-10 text-center">
    <v-text-field
      v-model.trim="searchTerm"
      append-icon="mdi-magnify"
      label="Search"
      @input="searchValue"
      single-line
      hide-details
    ></v-text-field>
    <div v-if="historyList.length > 0">
      <v-table fixed-header>
        <thead>
          <tr>
            <th>
              <v-icon icon="mdi-calendar-range"></v-icon>Transaction Date
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('trdate')"
              ></v-icon>
            </th>
            <th>
              Month Year
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('monthyear')"
              ></v-icon>
            </th>
            <th>
              Transaction Type
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('type')"
              ></v-icon>
            </th>
            <th>
              <v-icon icon="mdi-cash-multiple"></v-icon>
              From Account
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('fromaccount')"
              ></v-icon>
            </th>
            <th>
              <v-icon icon="mdi-cash-multiple"></v-icon>
              To Account
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('toaccount')"
              ></v-icon>
            </th>
            <th>
              <v-icon icon="mdi-currency-usd"></v-icon>
              Amount
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('amount')"
              ></v-icon>
            </th>
            <th>
              <v-icon icon="mdi-receipt"></v-icon>
              Recipt
            </th>
            <th>
              <v-icon icon="mdi-note-check"></v-icon>
              Notes
              <v-icon
                icon="mdi-sort "
                class="ml-2"
                @click="sortColumn('notes')"
              ></v-icon>
            </th>
            <th>
              <v-icon icon="mdi-gesture-double-tap"></v-icon>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in historyList" :key="index">
            <td>{{ item.trdate.split("T")[0] }}</td>
            <td>{{ item.monthyear }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.fromaccount }}</td>
            <td>{{ item.toaccount }}</td>
            <td>{{ item.amount }}</td>
            <td><img :src="item.receipt" alt="" /></td>
            <td>{{ item.notes }}</td>
            <td>
              <v-btn @click="ViewBtn(item.id)"> view </v-btn>
              <v-btn @click="EditBtn(item.id)"> Edit </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-card>
        <v-btn color="primary">
          Page :{{ pageSize }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in selectItems"
                :key="index"
                :value="item"
                @click="pageSizeFunction(item)"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>

        <v-pagination
          class="pagination mb-2"
          v-model="page"
          :length="pages"
          @click="updatePage(indx)"
        ></v-pagination>
      </v-card>
    </div>
    <div v-else>
      <div class="text-center">
        <v-chip class="ma-5 text-h2 h-100" label> No filter results </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupCommon",
  props: ["selectedArr"],
  data() {
    return {
      arr: [],
      page: 1,
      pageSize: 2,
      listCount: 0,
      historyList: [],
      selectItems: [],
      searchTerm: "",
      toggle: false,
    };
  },
  mounted() {
    this.arr = this.selectedArr;
    this.pageItemCreated();
  },
  computed: {
    pages() {
      if (this.pageSize == null || this.listCount == 0) return 0;
      return Math.ceil(this.listCount / this.pageSize);
    },
  },
  methods: {
    sortColumn(column) {
      const months = [
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

      if (this.toggle == false) {
  

        if (column === "monthyear") {
          this.arr.sort((a, b) => {
            return months.indexOf(a[column]) - months.indexOf(b[column]);
          });
        } else {
          this.arr.sort((a, b) => {
            let fa = a[column],
              fb = b[column];
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
          });
        }
      } else {

        if (column === "monthyear") {
          this.arr.sort((a, b) => {
            return months.indexOf(b[column]) - months.indexOf(a[column]);
          });
        } else {
          this.arr.sort((a, b) => {
            let fa = a[column],
              fb = b[column];
            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
          });
        }
      }
      this.toggle = !this.toggle;
      this.pageItemCreated();
    },
    initPage() {
      this.listCount = this.arr.length;
      if (this.listCount <= this.pageSize) {
        this.historyList = this.arr;
      } else {
        this.historyList = this.arr.slice(0, this.pageSize);
      }
    },
    pageItemCreated() {
      this.selectItems = [];
      for (let i = 2; i <= this.arr.length; i++) {
        this.selectItems.push(i);
      }
      this.initPage();
      this.updatePage();
    },
    searchValue() {
      this.arr = this.selectedArr.filter((data) => {
        const { monthyear, type, fromaccount, toaccount, notes, amount } = data;
        if (
          monthyear.includes(this.searchTerm) ||
          type.includes(this.searchTerm) ||
          fromaccount.includes(this.searchTerm) ||
          toaccount.includes(this.searchTerm) ||
          notes.includes(this.searchTerm) ||
          amount == this.searchTerm ||
          amount.toString().includes(this.searchTerm)
        ) {
    
          return data;
        }
      });
      this.pageItemCreated();
   
    },
    ViewBtn(id) {
      this.$router.push({ path: `/transactions/${id}` });
    },
    EditBtn(id) {
      this.$router.push(`/transactions/edit/${id}`);
    },

    updatePage() {
 
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      this.historyList = this.arr.slice(start, end);
  
    },
    pageSizeFunction(item) {
      this.pageSize = item;
      this.initPage();
      this.updatePage();
    },
  },
};
</script>

<style></style>
