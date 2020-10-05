<template>
  <div class="container">
    <div class="row inner-container">
      <div class="col-sm-12 col-md-10 col-lg-7 col-xl-6 register-wrapper">
        <form @submit.prevent="registerUser">
          <div class="row">
            <div class="col-12">
              <h3>Register</h3>
            </div>
          </div>
          <div class="row name-container">
            <div class="col-12">
              <st-form-group
                label="Name"
                :invalid="$v.register.name.$invalid && $v.register.name.$dirty"
                :required="true"
              >
                <st-input
                  :blur="$v.register.name.$touch"
                  type="text"
                  placeholder="Name"
                  v-model="register.name"
                  :class="{ invalid: $v.register.name.$invalid }"
                ></st-input>
                <span class="form-group-error" v-if="!$v.register.name.required"
                  >Required</span
                >
                <span
                  class="form-group-error"
                  v-if="!$v.register.name.maxLength"
                  >Max Length 50</span
                >
              </st-form-group>
            </div>
          </div>
          <div class="row email-container">
            <div class="col-12">
              <st-form-group
                label="Email"
                :invalid="
                  $v.register.email.$invalid && $v.register.email.$dirty
                "
                :required="true"
              >
                <st-input
                  :blur="$v.register.email.$touch"
                  type="text"
                  placeholder="Email"
                  v-model="register.email"
                  :class="{ invalid: $v.register.email.$invalid }"
                ></st-input>
                <span
                  class="form-group-error"
                  v-if="!$v.register.email.required"
                  >Required</span
                >
                <span class="form-group-error" v-if="!$v.register.email.email"
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
                  $v.register.password.$invalid && $v.register.password.$dirty
                "
                :required="true"
              >
                <st-input
                  :blur="$v.register.password.$touch"
                  type="password"
                  placeholder="Password"
                  v-model="register.password"
                  :class="{ invalid: $v.register.password.$invalid }"
                ></st-input>
                <span
                  class="form-group-error"
                  v-if="!$v.register.password.required"
                  >Required</span
                >
                <span
                  class="form-group-error"
                  v-if="!$v.register.password.minLength"
                  >Min Length 8</span
                >
                <span
                  class="form-group-error"
                  v-if="!$v.register.password.maxLength"
                  >Max Length 50</span
                >
              </st-form-group>
            </div>
          </div>
          <p>
            <router-link to="/">Back to Login</router-link>
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
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import api from "../../services/api";
import axios from "axios";
export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  validations: {
    register: {
      name: {
        maxLength: maxLength(50),
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        maxLength: maxLength(50),
        minLength: minLength(8),
        required,
      },
    },
  },
  methods: {
    async registerUser() {
      this.isLoading = true;
      try {
        let response = await api.post("/register", this.register);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          let promises = [];
          promises.push(this.$store.commit("setToken", token));
          promises.push(this.$store.dispatch("setUser"));
          Promise.all(promises)
            .then((result) => {
              this.$router.push({ name: "RegisterPosition" });
              swal("Success", "Registration Was successful", "success");
            })
            .finally(() => {
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
          swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        this.isLoading = false;
        let error = err.response;
        if (error.status == 409) {
          swal("Error", error.data, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
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
    .register-wrapper {
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

        p {
          margin: 20px 0px;
          text-align: left;
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

        .sos-button {
          margin-top: 10px;
        }

        input {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
