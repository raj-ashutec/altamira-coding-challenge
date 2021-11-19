<template>
  <div>
    <v-app>
      <NavBar>
        <div class="user-page">
          <div class="add-user-details">
            <div class="new-user-container">
              <div class="user-details-title">New User Details</div>
              <v-divider />
              <div class="user-form">
                <form ref="form" @submit.prevent="submit">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.username"
                          :error-messages="usernameErrors"
                          label="Username"
                          outlined
                          @input="$v.form.username.$touch()"
                          @blur="$v.form.username.$touch()"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.email"
                          :error-messages="emailErrors"
                          label="Email"
                          outlined
                          @blur="$v.form.email.$touch()"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.firstName"
                          :error-messages="firstNameErrors"
                          label="First Name"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.lastName"
                          :error-messages="lastNameErrors"
                          label="Last Name"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="form.role"
                          :error-messages="roleErrors"
                          :items="items"
                          label="Role"
                          outlined
                          attach
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-checkbox
                      v-model="isEmail"
                      color="grey darken-1"
                      label="Send email confirmation"
                    ></v-checkbox>
                  </v-container>
                </form>
              </div>
            </div>
            <div class="profile-picture-container">
              <div class="user-details-title">Profile Picture</div>
              <v-divider />
              <div class="img-container">
                <v-icon class="profile-img"> mdi-image-filter-hdr </v-icon>
              </div>
              <div>
                <v-btn depressed class="user-btn user-btn-color">
                  Select Image
                </v-btn>
              </div>
            </div>
            <v-snackbar v-model="showSnackbar" color="success" right>
              <v-icon color="white">mdi-check</v-icon>
              <span class="snack-bar-text"> Added Successfully! </span>
            </v-snackbar>
          </div>

          <v-divider />
          <div class="btn-container">
            <v-btn depressed class="user-btn user-btn-color" @click="submit">
              Add user
            </v-btn>
            <v-btn depressed class="user-btn" @click="cancel"> Cancel </v-btn>
          </div>
        </div>
      </NavBar>
    </v-app>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "AddUser",
  components: {
    NavBar,
  },

  validations: {
    form: {
      username: { required },
      email: { required, email },
      firstName: { required },
      lastName: { required },
      role: { required },
    },
  },

  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      !this.$v.form.username.required && errors.push("User name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Must be valid e-mail");
      !this.$v.form.email.required && errors.push("E-mail is required");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.required &&
        errors.push("First name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required && errors.push("Last name is required.");
      return errors;
    },
    roleErrors() {
      const errors = [];
      if (!this.$v.form.role.$dirty) return errors;
      !this.$v.form.role.required && errors.push("Role is required.");
      return errors;
    },
  },
  data() {
    return {
      allUser: [],
      form: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      },
      showSnackbar: false,
      isEmail: false,
      items: ["Admin", "User"],
    };
  },

  methods: {
    submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        var fromStorage = localStorage.getItem("allUser") || "[]";
        var allUserData = JSON.parse(fromStorage);
        allUserData.push(this.form);
        localStorage.setItem("allUser", JSON.stringify(allUserData));
        this.showSnackbar = !this.showSnackbar;
        this.cancel();
      }
    },
    cancel() {
      this.$v.form.$reset();

      this.form.username = "";
      this.form.firstName = "";
      this.form.email = "";
      this.form.lastName = "";
      this.form.role = "";
    },
  },
};
</script>

<style scoped>
.user-page {
  padding: 50px;
}
.add-user-details {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px;
}
.btn-container {
  text-align: left;
  display: flex;
  margin: 30px 20px;
  justify-content: space-evenly;
  width: 30%;
}
.img-container {
  margin: 20px 10px;
}
.profile-img {
  font-size: 80px;
  border: 2px solid #bdb3b3;
  padding: 100px;
}
.profile-picture-container {
  width: 30%;
  margin-left: 2%;
}
.new-user-container {
  margin-right: 2%;
  width: 70%;
}
.snack-bar-text {
  font-size: 16px;
}
.user-btn {
  padding: 25px 35px !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
}
.user-form {
  padding: 10px;
}
.user-btn-color {
  background-color: #7400b8 !important;
  color: white !important;
  font-weight: 700 !important;
}
.user-details-title {
  font-size: 32px;
  color: #212121;
  font-weight: 700;
  text-align: left;
}
</style>
