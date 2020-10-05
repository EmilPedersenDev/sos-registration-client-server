<template>
  <div class="container">
    <div class="row inner-container">
      <div class="col-sm-12 col-md-10 col-lg-7 col-xl-6 login-wrapper">
        <form @submit.prevent="loginUser">
          <div class="row">
            <div class="col-12">
              <h3>Login to register location</h3>
            </div>
          </div>
          <div class="row login-information">
            <div class="col-12">
              <p>
                You can login/register so that others can know your whereabouts
                in emergency situations. <br />
                <br />
                If you wish to find or locate people that are in emergency
                situations, please
                <router-link to="/users">click here</router-link>.
              </p>
            </div>
          </div>
          <div class="row email-container">
            <div class="col-12">
              <st-form-group
                label="Email"
                :invalid="$v.login.email.$invalid && $v.login.email.$dirty"
                :required="true"
              >
                <st-input
                  :blur="$v.login.email.$touch"
                  type="text"
                  placeholder="Email"
                  v-model="login.email"
                  :class="{ invalid: $v.login.email.$invalid }"
                ></st-input>
                <span class="form-group-error" v-if="!$v.login.email.required"
                  >Required</span
                >
                <span class="form-group-error" v-if="!$v.login.email.email"
                  >Not a valid email</span
                >
              </st-form-group>
            </div>
          </div>

          <div class="row password-container">
            <div class="col-12">
              <st-form-group
                label="Password"
                :invalid="
                  $v.login.password.$invalid && $v.login.password.$dirty
                "
                :required="true"
              >
                <st-input
                  :blur="$v.login.password.$touch"
                  type="password"
                  placeholder="Password"
                  v-model="login.password"
                ></st-input>
                <span
                  class="form-group-error"
                  v-if="!$v.login.password.required"
                  >Required</span
                >
                <span
                  class="form-group-error"
                  v-if="!$v.login.password.minLength"
                  >Min Length 8</span
                >
                <span
                  class="form-group-error"
                  v-if="!$v.login.password.maxLength"
                  >Max Length 50</span
                >
              </st-form-group>
            </div>
          </div>
          <p>
            <router-link to="/register">Register here</router-link>
          </p>
          <sos-button secondary large type="submit" :disabled="$v.$invalid">
            <span v-if="!isLoading"> Sign in</span>
            <div class="spinner" v-else></div>
          </sos-button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../services/api";
import sweetAlert from "sweetalert";
import axios from "axios";
import { mapActions } from "vuex";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  validations: {
    login: {
      email: {
        email,
        required,
      },
      password: {
        maxLength: maxLength(50),
        minLength: minLength(8),
        required,
      },
    },
  },
  methods: {
    ...mapActions({ user: "setUser" }),

    async loginUser() {
      this.isLoading = true;
      try {
        let response = await api.post("/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);

        if (token) {
          swal("Success", "Login Successful", "success");
          this.$store.commit("setToken", token);

          this.user()
            .then((result) => {
              this.$router.push("/users");
            })
            .catch((error) => {
              throw new Error(error.statusText);
            })
            .finally(() => {
              this.isLoading = false;
            });
        }
      } catch (err) {
        this.isLoading = false;
        swal("Error", "Email or password invalid", "error");
        throw new Error(err.response);
      }
    },
  },
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
  .inner-container {
    margin: 0px;

    .login-wrapper {
      margin: 0 auto;
      padding: 0px 10px;
      form {
        text-align: center;
        margin: 50px 0px;
        height: auto;
        box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.6);
        border-radius: 20px;
        padding: 50px;
        background-color: #fff;
        @media (max-width: 768px) {
          margin: 10px 0px 30px;
          padding: 50px 20px;
        }
        h3 {
          margin-bottom: 20px;
          font-weight: 700;
          @media (max-width: 768px) {
            font-size: 22px;
          }
        }

        a {
          color: #699e53;
          font-weight: 700;
          transition: all 0.3s ease;
          &:hover {
            text-decoration: none;
            color: #80c565;
          }
        }

        .login-information {
          p {
            text-align: center;
            margin-bottom: 25px;
          }
        }

        p {
          margin: 20px 0px;
          text-align: left;
        }

        .sos-button {
          margin-top: 10px;
        }

        .email-container {
          margin-bottom: 20px;
        }
        input {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
