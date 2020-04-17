import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["sceneList"]),
    hasSceneList() {
      return this.sceneList.length > 0;
    }
  },
  methods: {
    getSceneList() {
      return this.$http.statement
        .sceneList()
        .then(res => this.SET_SCENE_LIST(res.data))
        .catch(() => console.log("获取设备列表出错了"));
    },
    ...mapMutations(["SET_SCENE_LIST"])
  },
  async created() {
    try {
      const dev_id = this.$route.query.dev_id;

      if (this.name === "onlineUser" && dev_id) {
        await this.getSceneList();
        this.formData.dev_id = dev_id;
        this.search();
        return;
      }

      await this.getData();
      !this.hasSceneList && this.getSceneList();
    } catch (error) {
      console.log(error);
    }
  }
};
