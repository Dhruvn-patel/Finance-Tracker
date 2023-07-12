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
            <td>
              {{
                item.amount.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })
              }}
            </td>
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
import { computed, onMounted, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "GroupCommon",
  props: ["selectedArr"],

  /* state */
  setup(props) {
    const { selectedArr } = toRefs(props);
    console.log("props", selectedArr.value);
    let arr = [];
    const page = ref(1);
    const pageSize = ref(2);
    const listCount = ref(0);
    const historyList = ref([]);
    const selectItems = ref([]);
    const searchTerm = ref("");
    const toggle = ref(false);
    const router = useRouter();
    /* computed */

    /* methods */
    function pageItemCreated() {
      selectItems.value = [];
      for (let i = 2; i <= arr.length; i++) {
        selectItems.value.push(i);
      }
      console.log("selectItems", selectItems.value);
      initPage();
      updatePage();
    }
    function initPage() {
      listCount.value = arr.length;
      if (listCount.value <= pageSize.value) {
        historyList.value = arr;
      } else {
        historyList.value = arr.slice(0, pageSize.value);
      }
    }
    function updatePage() {
      let start = (page.value - 1) * pageSize.value;
      let end = page.value * pageSize.value;
      historyList.value = arr.slice(start, end);
    }
    function sortColumn(column) {
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

      if (toggle.value == false) {
        if (column === "monthyear") {
          arr.sort((a, b) => {
            return months.indexOf(a[column]) - months.indexOf(b[column]);
          });
        } else {
          arr.sort((a, b) => {
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
          arr.sort((a, b) => {
            return months.indexOf(b[column]) - months.indexOf(a[column]);
          });
        } else {
          arr.sort((a, b) => {
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
      toggle.value = !toggle.value;
      pageItemCreated();
    }

    /* HOOKS */
    onMounted(() => {
      arr = selectedArr.value;
      pageItemCreated();
    });
    function searchValue() {
      arr = selectedArr.value.filter((data) => {
        const { monthyear, type, fromaccount, toaccount, notes, amount } = data;
        if (
          monthyear.includes(searchTerm.value) ||
          type.includes(searchTerm.value) ||
          fromaccount.includes(searchTerm.value) ||
          toaccount.includes(searchTerm.value) ||
          notes.includes(searchTerm.value) ||
          amount == searchTerm.value ||
          amount.toString().includes(searchTerm.value)
        ) {
          return data;
        }
      });
      pageItemCreated();
    }

    function pageSizeFunction(item) {
      pageSize.value = item;
      console.log("pageSize.value ", pageSize.value);
      initPage();
      updatePage();
    }

    const pages = computed(() => {
      if (pageSize.value == null || listCount.value == 0) return 0;
      return Math.ceil(listCount.value / pageSize.value);
    });
    function ViewBtn(id) {
      router.push({ path: `/transactions/${id}` });
    }

    function EditBtn(id) {
      router.push(`/transactions/edit/${id}`);
    }

    return {
      ViewBtn,
      EditBtn,
      updatePage,
      pages,
      pageSizeFunction,
      historyList,
      pageItemCreated,
      sortColumn,
      page,
      pageSize,
      listCount,
      selectItems,
      searchTerm,
      toggle,
      searchValue,
    };
  },
};
</script>

<style></style>
