<template>
  <st-modal class="logout-modal">
    <div slot="header" class="modal-header">
      <h3>Are you sure you want to logout?</h3>
    </div>
    <div slot="body" class="modal-body">
      <i class="fas fa-question-circle"></i>
    </div>
    <div slot="footer" class="modal-footer">
      <sos-button large @click="submit(true)">Yes</sos-button>
      <sos-button primary large @click="submit(false)">No</sos-button>
    </div>
  </st-modal>
</template>

<script>
  export default {
    name: "logout-modal",
    props: {
      close: {
        type: Function
      }
    },
    methods: {
      async submit(val) {
        if (!val) {
          this.close(true);
        } else {
          await localStorage.removeItem("jwt");
          this.$store.commit("setToken");
          this.$store.commit("setUser");
          this.close(true);
        }
      }
    }
  };
</script>

<style lang="scss">
  .logout-modal {
    .modal-header {
      margin-top: 10px;
    }

    .modal-body {
      margin: 13px 0px 20px;
      .fas {
        font-size: 100px;
        color: rgba(33, 45, 94, 0.914);
      }
    }

    .modal-footer {
      margin-bottom: 10px;
      button {
        padding: 10px 40px !important;
      }
    }
  }
</style>