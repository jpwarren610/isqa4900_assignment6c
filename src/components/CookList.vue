<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" lg="10" align="center" justify="center">
        <v-alert
          class="white--text"
          color="red darken-4"
          v-if="showMsg === 'new'"
          dismissible
          :value="true"
          type="success"
        >
          New Cook has been added.
        </v-alert>
        <v-alert
          class="white--text"
          color="red darken-4"
          v-if="showMsg === 'update'"
          dismissible
          :value="true"
          type="success"
        >
          Cook information has been updated.
        </v-alert>
        <v-alert
          class="white--text"
          color="red darken-4"
          v-if="showMsg === 'deleted'"
          dismissible
          :value="true"
          type="success"
        >
          Selected Cook has been deleted.
        </v-alert>
      </v-col>
    </v-row>
    <!-- Data table -->
    <v-row align="center" justify="center">
      <v-col cols="12" md="10" v-resize="onResize">
        <v-card-title>
          <h1 class="white--text">My Cooks</h1>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="cooks"
          :search="search"
          class="elevation-1"
          style="max-height: 600px;"
          v-if="isMobile"
        >
          <template v-slot:item="props">
            <tr>
              <td align="left">{{ props.item.event_name }}</td>
              <td align="left">{{ props.item.event_location }}</td>
              <td align="left">{{ props.item.year }}</td>
              <td align="left">{{ props.item.meat }}</td>
              <td align="left">{{ props.item.weight }}</td>
              <td align="left">{{ props.item.injection }}</td>
              <td align="left">{{ props.item.rub }}</td>
              <td align="left">{{ props.item.mop_sauce }}</td>
              <td align="left">{{ props.item.pit }}</td>
              <td align="left">{{ props.item.fuel }}</td>
              <td align="left">{{ props.item.pit_temp }}</td>
              <td align="left">{{ props.item.cook_time }}</td>
              <td align="left">{{ props.item.final_temp }}</td>
              <td align="left">{{ props.item.personal_score }}</td>
              <td align="left">{{ props.item.judge_score }}</td>
              <td align="left">{{ props.item.award }}</td>
              <td align="left">{{ props.item.notes }}</td>
              <td align="center">
                <v-icon @click="updateCook(props.item)">mdi-pencil</v-icon>
              </td>
              <td align="center">
                <v-icon @click="deleteCook(props.item)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-data-iterator :items="cooks" hide-default-footer v-else>
          <template v-slot:default="{ items, isExpanded, expand }">
            <v-row>
              <v-col v-for="item in items" :key="item.name" cols="12">
                <v-card>
                  <v-card-title class="pb-0 pt-0 pl-0">
                    <v-col cols="9" class="text-left body-2 text-truncate"
                      >{{ item.event_name }} {{ item.year }}</v-col
                    >
                    <v-col cols="3" class="text-center">
                      <v-card-actions>
                        <v-icon @click="updateCook(item)" class="small"
                          >mdi-pencil</v-icon
                        >
                        <v-icon @click="deleteCook(item)" class="small"
                          >mdi-delete</v-icon
                        >
                        <v-icon
                          @click.native="expand(item, !isExpanded(item))"
                          class="small"
                          >mdi-dots-horizontal</v-icon
                        >
                      </v-card-actions>
                    </v-col>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list v-show="isExpanded(item)">
                    <v-list-item>
                      <v-list-item-content>Meat:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.meat
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Pit:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.pit
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Judge Score:</v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.judge_score
                      }}</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
        <v-footer
          width="100%"
          height="64px"
          fixed
          v-bind="localAttrs"
          :padless="padless"
          class="red darken-4"
          ma-0
          pa-0
        >
          <v-card
            flat
            tile
            ma-0
            pa-0
            width="100%"
            class="red darken-4 text-center"
          >
            <v-btn
              class="white--text elevation-0"
              flat
              color="red darken-4"
              align="center"
              @click="addNewCook"
              >Add Cook</v-btn
            >
          </v-card>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "CookList",
  data: () => ({
    cooks: [],
    validUserName: "Guest",
    cookSize: 0,
    showMsg: "",
    isMobile: false,
    search: "",
    headers: [
      { text: "Event Name", value: "event_name" },
      { text: "Event Location", value: "event_location" },
      { text: "Year", value: "year" },
      { text: "Meat", value: "meat" },
      { text: "Weight", value: "weight" },
      { text: "Injection", value: "injection" },
      { text: "Rub", value: "rub" },
      { text: "Mop-Sauce", value: "mop_sauce" },
      { text: "Pit", value: "pit" },
      { text: "Fuel", value: "fuel" },
      { text: "Pit Temp", value: "pit_temp" },
      { text: "Cook Time", value: "cook_time" },
      { text: "Final Temp", value: "final_temp" },
      { text: "Personal Score", value: "personal_score" },
      { text: "Judge Score", value: "judge_score" },
      { text: "Award", value: "award" },
      { text: "Notes", value: "notes" },
      { text: "Update", sortable: false, align: "center" },
      { text: "Delete", sortable: false, align: "center" }
    ]
  }),
  mounted() {
    this.getCooks();
    this.showMessages();
  },
  methods: {
    onResize() {
      if (window.innerWidth > 600) this.isMobile = true;
      else this.isMobile = false;
    },
    showMessages() {
      console.log(this.$route.params.msg);
      if (this.$route.params.msg) {
        this.showMsg = this.$route.params.msg;
      }
    },
    getCooks() {
      apiService
        .getCookList()
        .then(response => {
          this.cooks = response.data.data;
          console.log(response.data.data);
          console.log(response.data);
          this.cookSize = this.cooks.length;
          if (
            localStorage.getItem("isAuthenticates") &&
            JSON.parse(localStorage.getItem("isAuthenticates")) === true
          ) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            router.push("/auth");
          }
        });
    },
    addNewCook() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        router.push("/cook-create");
      } else {
        router.push("/auth");
      }
    },
    updateCook(cook) {
      router.push("/cook-create/" + cook.pk);
    },
    deleteCook(cook) {
      apiService
        .deleteCook(cook.pk)
        .then(response => {
          if (response.status === 204) {
            router.push("/cook-list/deleted/");
            this.getCooks();
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem("isAuthenticates");
            localStorage.removeItem("log_user");
            localStorage.removeItem("token");
            router.push("/auth");
          }
        });
    }
  }
};
</script>
