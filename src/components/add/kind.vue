<template>
  <div class="container">
    <div class="kind">
      <div
        class="item-wrap"
        v-for="item in kindList"
        :key="item.name"
        @click="chooseKind($event,item)"
      >
        <div class="item" :class="{selected:item.name === currentKind}">
          <Icon :iconName="item.name" />
          <span>{{item.zhName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("fetchKindList");
  },
  methods: {
    chooseKind(event, kind) {
      if (kind.name == "setting") {
        this.$router.push("/setting");
        return;
      }
      this.$store.commit("changeCurrentKind", {
        iconName: kind.name,
        textName: kind.zhName
      });
    }
  },
  computed: {
    kindList() {
      return this.$store.getters.currentKinds;
    },
    currentKind() {
      return this.$store.state.auth.addDate.currentKind.iconName;
    },
    currentType() {
      return this.$store.state.auth.addDate.type;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.kind {
  display: flex;
  flex-wrap: wrap;
  height: 95vh;
  padding-bottom: 10px;
  overflow: auto;
  align-content: flex-start;
  .item-wrap {
    width: 25vw;
    height: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 50%;
      background: #f5f5f5;
      width: 80%;
      height: 80%;
      justify-content: center;
      &.selected {
        background: $color-yellow;
      }
      svg {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>