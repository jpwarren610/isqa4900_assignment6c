<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert
              v-if="showMsg === 'error'"
              dismissible
              :value="true"
              type="error"
            >
              Please verify Cook information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{ pageTitle }}</span>
              </v-card-title>
              <v-spacer />
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <v-text-field
                      v-model="cook.event_name"
                      label="Event Name"
                      required
                    />
                    <v-text-field
                      v-model="cook.event_location"
                      label="Event Location"
                      required
                    />
                    <v-text-field v-model="cook.year" label="Year" required />
                    <v-text-field v-model="cook.meat" label="Meat" required />
                    <v-text-field
                      v-model="cook.weight"
                      label="Weight"
                      required
                    />
                    <v-text-field
                      v-model="cook.injection"
                      label="Injection"
                      required
                    />
                    <v-text-field v-model="cook.rub" label="Rub" required />
                    <v-text-field
                      v-model="cook.mop_sauce"
                      label="Mop-Sauce"
                      required
                    />
                    <v-text-field v-model="cook.pit" label="Pit" required />
                    <v-text-field v-model="cook.fuel" label="Fuel" required />
                    <v-text-field
                      v-model="cook.pit_temp"
                      label="Pit Temp"
                      required
                    />
                    <v-text-field
                      v-model="cook.cook_time"
                      label="Cook Time"
                      required
                    />
                    <v-text-field
                      v-model="cook.final_temp"
                      label="Final Temp"
                      required
                    />
                    <v-text-field
                      v-model="cook.personal_score"
                      label="Personal Score"
                      required
                    />
                    <v-text-field
                      v-model="cook.judge_score"
                      label="Judge Score"
                      required
                    />
                    <v-text-field v-model="cook.award" label="Award" required />
                    <v-text-field v-model="cook.notes" label="Notes" required />
                  </v-container>
                  <v-btn
                    v-if="!isUpdate"
                    class="white--text"
                    color="red darken-4"
                    @click="createCook"
                    >Save</v-btn
                  >
                  <v-btn
                    v-if="isUpdate"
                    class="white--text"
                    color="red darken-4"
                    @click="updateCook"
                    >Update</v-btn
                  >
                  <v-btn class="white black--text" @click="cancelOperation"
                    >Cancel</v-btn
                  >
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "../router";
import { APIService } from "../http/APIService";
const apiService = new APIService();
export default {
  name: "CookCreate",
  components: {},
  data() {
    return {
      showError: false,
      cook: {},
      pageTitle: "Add New Cook",
      isUpdate: false,
      showMsg: ""
    };
  },
  methods: {
    createCook() {
      apiService
        .addNewCook(this.cook)
        .then(response => {
          if (response.status === 201) {
            this.cook = response.data;
            this.showMsg = "";
            router.push("/cook-list/new");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    },
    cancelOperation() {
      router.push("/cook-list");
    },
    updateCook() {
      apiService
        .updateCook(this.cook)
        .then(response => {
          if (response.status === 200) {
            this.cook = response.data;
            router.push("/cook-list/update");
          } else {
            this.showMsg = "error";
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          } else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
    }
  },
  mounted() {
    if (this.$route.params.pk) {
      this.pageTitle = "Edit Cook";
      this.isUpdate = true;
      apiService
        .getCook(this.$route.params.pk)
        .then(response => {
          this.cook = response.data;
        })
        .catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
    }
  }
};
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
