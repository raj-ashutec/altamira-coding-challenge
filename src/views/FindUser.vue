<template>
  <div>
    <v-app>
      <NavBar>
        <div class="user-page">
          <div class="user-find-title">
            <div>Find Users</div>
            <div @click="gotoAddUser">
              <v-icon class="add-icon"> mdi-plus-circle </v-icon>
            </div>
          </div>
          <v-divider />

          <div class="user-table">
            <v-card>
              <v-card-title>
                Users <v-spacer></v-spacer>
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
                :items="getAllUser"
                :items-per-page="5"
                :search="search"
                item-key="username"
                class="elevation-1"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                    style="color: purple"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)" style="color: red">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5"> Edit</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editedItem.username"
                          label="Username"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editedItem.firstName"
                          label="First Name"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editedItem.lastName"
                          label="Last Name"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="editedItem.role"
                          :items="items"
                          label="Role"
                          outlined
                          attach
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </NavBar>
    </v-app>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "FindUser",
  components: {
    NavBar,
  },
  data() {
    return {
      search: "",
      getAllUser: [],
      items: ["Admin", "User"],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
      },
      headers: [
        {
          text: "Username",
          align: "start",
          value: "username",
        },
        { text: "Email", value: "email" },
        { text: "FirstName", value: "firstName" },
        { text: "LastName", value: "lastName" },
        { text: "Role", value: "role" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.getAllUser = JSON.parse(localStorage.getItem("allUser"));
  },

  methods: {
    gotoAddUser() {
      this.$router.push({ path: "addUser" });
    },
    editItem(item) {
      this.editedIndex = this.getAllUser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.getAllUser.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      localStorage.removeItem("allUser");
      this.getAllUser.splice(this.editedIndex, 1);
      localStorage.setItem("allUser", JSON.stringify(this.getAllUser));
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.getAllUser[this.editedIndex], this.editedItem);
      } else {
        this.getAllUser.push(this.editedItem);
      }
      localStorage.removeItem("allUser");
      localStorage.setItem("allUser", JSON.stringify(this.getAllUser));
      this.close();
    },
  },
};
</script>

<style scoped>
.add-icon {
  font-size: 50px !important;
  color: #7400b8 !important;
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
.find-btn {
  padding: 25px 35px !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
  width: 100%;
}
.user-find-title {
  display: flex;
  font-size: 32px;
  color: #212121;
  font-weight: 700;
  justify-content: space-between;
  margin-bottom: 15px;
}
.user-page {
  padding: 50px;
}
.user-table {
  padding-top: 50px;
}
</style>
