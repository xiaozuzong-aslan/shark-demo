<template>
  <div class="edit-nav">
    <div class="back" @click="goBack">
      <Icon iconName="left" />
    </div>
    <div class="title">
      <div>
        <Icon iconName="gift" />
      </div>
      <span>{{dataList.data.currentKind.textName}}</span>
    </div>
    <div class="button">分享</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: null
    };
  },
  created() {
    this.$store.commit("fetchData");
    const id = this.$route.params.id;
    this.dataList = this.$store.state.auth.DateList.filter(
      item => item.id === id
    )[0];
    console.log(this.dataList);
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.wrap {
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 18.5px 0;
  button {
    flex-grow: 1;
    border: none;
    background: #fff;
    font-size: 16px;

    &.left {
      border-right: 1px solid fade-out(#8e8e8e, 0.7);
    }
  }
}

.info {
  padding: 10px 16px;
  flex-grow: 1;
  div {
    padding: 10px 0;
    box-shadow: 0 2px 2px -2px fade-out(#8e8e8e, 0.2);
    span {
      color: #8e8e8e;
      padding-right: 10px;
    }
  }
}
.edit-nav {
  padding: 5px 0;
  padding-left: 16px;

  display: flex;
  background: $color-yellow;

  .back {
    svg {
      width: 28px;
      height: 28px;
    }
  }

  .title {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      border-radius: 50%;
      background: #fff;

      width: 46px;
      height: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 28px;
        height: 28px;
      }
    }
    span {
      width: 40px;
      text-align: center;
      margin-top: 5px;
    }
  }
  .button {
    padding-right: 16px;
  }
}
</style>