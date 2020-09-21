<template>
  <div class="container">
    <div class="col-sm-12 col-md-10 col-lg-6 about-wrapper">
      <div class="about-info">
        <h1>About</h1>
        <p>
          By using this service you can get information about people in
          emergency situations. You can search after people and get their
          whereabouts, latest updates, comments etc. <br /><br />

          If you wish to search after people, please go to <br />
          <router-link to="/users">Search People</router-link>.

          <br /><br />
          If you are in some kind of danger, please login to register your
          location and status.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.container {
  padding: 10px;
  @media (max-width: 768px) {
    padding-top: 0px;
  }
  .about-wrapper {
    margin: 60px auto;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    background-color: #fff;
    padding: 50px;
    @media (max-width: 768px) {
      padding: 30px 20px;
      margin: 0px 0px 30px;
      h1 {
        font-size: 30px;
      }
    }

    .about-info {
      p {
        text-align: center;
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
    }
  }
}
</style>
