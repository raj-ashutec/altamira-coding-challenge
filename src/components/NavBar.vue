<template>
  <div>
    <div class="user-nav-bar">
      <!-- Desktop Side Menu -->
      <v-card class="mx-auto admin-side-menu" height="100vh" width="65">
        <v-navigation-drawer
          absolute
          permanent
          width="100%"
          style="background-color: #7400b8"
        >
          <v-list dense>
            <v-list-item two-line class="admin-side-menu-logo">
              <v-icon class="menu-icon"> mdi-menu </v-icon>
            </v-list-item>

            <v-list-item-group class="admin-side-menu-list">
              <v-list-item
                two-line
                v-for="item in items"
                :key="item.title"
                link
                class="side-menu-list-item"
              >
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="admin-side-menu-icon"
                      @click="gotoPage(item.value)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.icon }}
                    </v-icon>
                  </template>
                  <span> {{ item.title }}</span>
                </v-tooltip>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <div class="user-container-top">
        <!-- Desktop Top Menu -->
        <div>
          <v-card color="grey lighten-4" flat tile>
            <v-toolbar min-height="70" class="admin-menu-header">
              <v-spacer></v-spacer>
              <div class="user-name-text">
                <h3>RENEE MCKELVEY</h3>
                <h5>Account Settings</h5>
              </div>
              <v-btn icon class="user-icon">
                <v-icon x-large dark>mdi-account</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </div>
        <slot class="slot-container"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      items: [
        { title: "Search", icon: "mdi-magnify", value: 0 },
        { title: "Home", icon: "mdi-home", value: 1 },
        { title: "Database", icon: "mdi-database", value: 2 },
        { title: "Graph", icon: "mdi-chart-areaspline", value: 3 },
        { title: "Upload", icon: "mdi-inbox-arrow-up", value: 4 },
        { title: "Account Switch", icon: "mdi-account-switch", value: 5 },
        { title: "Settings", icon: "mdi-cog", value: 6 },
      ],
    };
  },

  methods: {
    gotoPage(arg) {
      if (arg == 0) {
        this.$router.push({ path: "/" });
      }
    },
  },
};
</script>

<style>
.admin-menu-header {
  align-items: center;
  border-bottom: 2px solid #c5c5c5 !important;
  background: #f9f9f9 !important;
  box-shadow: none !important;
}
.admin-side-menu {
  position: absolute;
  top: 0;
}
.admin-side-menu-logo {
  cursor: pointer;
  margin: 5px 0 20px 0;
  justify-content: center;
}
.admin-side-menu-space {
  margin: 20px 0;
}
.admin-side-menu-item {
  margin: 10px 0;
}
.admin-side-menu-list .v-list--nav.v-list-item {
  padding: 10px 0;
}
.admin-side-menu-icon {
  color: white !important;
  font-size: 30px !important;
}
.admin-side-menu-title {
  margin-left: 15px;
  font-size: 16px !important;
  font-weight: 600 !important;
}
.menu-icon {
  color: white !important;
  font-size: 35px !important;
}
.side-menu-list-item {
  justify-content: center;
}
.slot-container {
  height: calc(100% - 70px);
  width: calc(100% - 100px);
}
.user-nav-bar {
  display: flex;
}
.user-container-top {
  width: 100%;
}
.user-icon {
  margin: 10px;
  border: 1px solid;
}
.user-name-text {
  padding: 10px 0;
}
</style>
