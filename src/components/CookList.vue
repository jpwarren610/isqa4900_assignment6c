<template>
  <!-- <v-main> -->
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome Pitmaster!
            <!-- <footer>
              <small>
                <em>"BBQ may not be the road to world peace, but it's a start." Anthony Bourdain</em>
              </small>
            </footer> -->
          </blockquote>
        </v-col>
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
          <v-data-table
            dense
            :headers="headers"
            :items="cooks"
            class="elevation-1"
            style="max-height: 600px; overflow-y: auto"
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
                    <v-list v-show="isExpanded(item)" dense>
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
          <v-btn class="red darken-4 mt-4 white--text" @click="addNewCook"
            >Add Cook</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  <!-- </v-main> -->
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
    headers: [
      { text: "Event Name", sortable: false, align: "left" },
      { text: "Event Location", sortable: false, align: "left" },
      { text: "Year", sortable: false, align: "left" },
      { text: "Meat", sortable: false, align: "left" },
      { text: "Weight", sortable: false, align: "left" },
      { text: "Injection", sortable: false, align: "left" },
      { text: "Rub", sortable: false, align: "left" },
      { text: "Mop-Sauce", sortable: false, align: "left" },
      { text: "Pit", sortable: false, align: "left" },
      { text: "Fuel", sortable: false, align: "left" },
      { text: "Pit Temp", sortable: false, align: "left" },
      { text: "Cook Time", sortable: false, align: "left" },
      { text: "Final Temp", sortable: false, align: "left" },
      { text: "Personal Score", sortable: false, align: "left" },
      { text: "Judge Score", sortable: false, align: "left" },
      { text: "Award", sortable: false, align: "left" },
      { text: "Notes", sortable: false, align: "left" },
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
