export default {
  data: () => ({
    isPreview: false,
    previewUrl: ""
  }),
  methods: {
    onPreview(url) {
      this.previewUrl = url;
      this.isPreview = true;
    },
    offPreview() {
      this.isPreview = false;
    }
  },
  mounted() {
    window.addEventListener("click", this.offPreview);
  },
  destroyed() {
    window.removeEventListener("click", this.offPreview);
  }
};
