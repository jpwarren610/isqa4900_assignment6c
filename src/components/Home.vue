<template>
  <v-app style="background: rgba(0,0,0,0);">
    <v-container fluid class="full-height">
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <h1 class="white--text elevation-0">
            Welcome Pitmaster!
            <footer>
              <small>
                <em
                  >"BBQ may not be the road to world peace, but it's a start."
                  Anthony Bourdain</em
                >
              </small>
            </footer>
          </h1>
        </v-col>
      </v-row>
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
          @click="viewCooks"
          >View Cooks</v-btn
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
    </v-container>
  </v-app>
</template>
<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();

export default {
  name: "Home",
  data: () => ({
    validUserName: "Guest"
  }),
  mounted() {
    this.getUser();
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
    viewCooks() {
      router.push("/cook-list");
    },
    getUser() {
      if (
        localStorage.getItem("isAuthenticates") &&
        JSON.parse(localStorage.getItem("isAuthenticates")) === true
      ) {
        this.validUserName = JSON.parse(localStorage.getItem("log_user"));
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
