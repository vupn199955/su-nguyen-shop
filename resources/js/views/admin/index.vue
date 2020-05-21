<template>
 <div id="wrapper">
      <sidebar></sidebar>
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
              <topbar></topbar>
              <!-- Begin Page Content -->
              <div class="container-fluid">
                  <router-view></router-view>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
