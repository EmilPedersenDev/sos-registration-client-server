<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form @submit.prevent="registerUser">
          <div class="row">
            <div class="col-12">
              <h3>Register</h3>
            </div>
          </div>
          <div class="row name-container">
            <div class="col-12 ">
              <st-form-group label="Name">
                <st-input
                  type="text"
                  placeholder="Name"
                  v-model="register.name"
                  required
                ></st-input>
              </st-form-group>
            </div>
          </div>
          <div class="row email-container">
            <div class="col-12 ">
              <st-form-group label="Email">
                <st-input
                  type="text"
                  placeholder="Email"
                  v-model="register.email"
                  required
                ></st-input>
              </st-form-group>
            </div>
          </div>
          <div class="row password-container">
            <div class="col-12 ">
              <st-form-group label="Password">
                <st-input
                  type="password"
                  placeholder="Password"
                  v-model="register.password"
                ></st-input>
              </st-form-group>
            </div>
          </div>

          <p>
            <router-link to="/">Back to Login</router-link>
          </p>
          <sos-button secondary large type="submit">
            Sign in
          </sos-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "../../services/Api";
export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        let response = await Api().post("/user/register", this.register);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$store.commit("setToken", token);
          this.$store.dispatch("setUser");
          this.$router.push({ name: "RegisterPosition" });
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}

.container {
  form {
    text-align: center;
    margin-top: 70px;
    height: auto;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    padding: 50px;
    background-color: #fff;

    h3 {
      margin-bottom: 20px;
      font-weight: 700;
    }

    p {
      margin: 20px 0px;
      text-align: left;
    }

    a {
      font-weight: 700;
      transition: all 0.3s ease;
      &:hover {
        text-decoration: none;
        color: #80c565;
      }
    }

    .sos-button {
      margin-top: 10px;
    }

    input {
      margin-bottom: 20px;
      background-color: #fff;
    }
  }
}
</style>
