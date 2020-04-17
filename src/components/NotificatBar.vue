<template>
  <div class="notificatBar">
    <div class="cardBox">
      <div class="cardHead">
        <p><i class="el-icon-message"></i> 消息中心</p>
        <i class="el-icon-close" @click="SET_MSGISOPEN(false)"></i>
      </div>

      <el-row v-loading="showLoading" element-loading-background="rgba(0,0,0,0.7)" element-loading-text="拼命加载中" style="height: 100%;">
        <ul class="conUl">
          <li v-show="adNotice" @click="toAdAudit" style="margin-bottom: 5px;">
            {{ `您有【${adNotice}】条广告信息待审核` }}
          </li>
          <li v-for="item in msgList" :key="item.id">
            <div class="conUl_link" @click="open(item)">
              <div class="title">
                <p :class="item.isview === 1 ? 'isview' : ''" class="conUl_sp0 ellipsis">管理员发布了一条通告【{{ item.title }}】</p>
                <p class="conUl_sp1">{{ item.create_time }}</p>
              </div>
              <div class="del">
                <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop.prevent="del(item.id)"></el-button>
              </div>
            </div>
          </li>
        </ul>
      </el-row>
    </div>

    <el-dialog :title="currentArticle.title" :visible.sync="dialogVisible" append-to-body>
      <div class="content">{{ currentArticle.content }}</div>
      <span class="time">{{ currentArticle.create_time }}</span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    msgList: [],
    adNotice: 0,
    showLoading: false,
    dialogVisible: false,
    currentArticle: {}
  }),
  computed: {
    ...mapState(["msgIsShow"])
  },
  methods: {
    ...mapMutations(["SET_MSGISOPEN"]),
    getData() {
      this.showLoading = true;
      this.$http.header
        .notices()
        .then(res => {
          this.showLoading = false;
          this.adNotice = res.adNotice;
          this.msgList = res.data;
        })
        .catch(() => {
          this.showLoading = false;
        });
    },
    toAdAudit() {
      this.$router.push("/ad/auditAd");
    },
    //打开文章
    open(row) {
      this.currentArticle = row;
      this.dialogVisible = true;
    },
    //删除消息
    del(id) {
      this.$confirm("是否删除该消息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.showLoading = true;
          this.$http.header
            .noticeDel({ id })
            .then(res => {
              this.showLoading = false;
              this.adNotice = res.adNotice;
              this.msgList = res.data;
            })
            .catch(() => {
              this.showLoading = false;
            });
        })
        .catch(() => {});
    }
  },
  watch: {
    $route() {
      this.SET_MSGISOPEN(false);
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss">
.cardBox {
  width: 100%;
  height: 100%;
  .cardHead {
    height: 50px;
    padding: 0 20px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    line-height: 50px;
    p {
      font-size: 16px;
      color: #333;
      float: left;
      & > i {
        font-size: 20px;
        margin-right: 3px;
        vertical-align: -10%;
      }
    }
    & > i {
      float: right;
      font-size: 20px;
      margin-top: 14px;
      color: #b3b3b3;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        color: #333;
      }
    }
  }
}
.conUl {
  padding: 10px 0;
  cursor: pointer;
  li {
    width: 90%;
    padding: 10px 5px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
    .ellipsis {
      @extend %ellipsis;
    }
    .conUl_link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding-right: 20px;
        @extend %ellipsis;
        p {
          width: 100%;
          &:first-child {
            color: #276cd4;
          }
          &.isview {
            color: #aaa;
          }
        }
      }
      .del {
        padding-right: 5px;
        .el-button {
          padding: 3px 5px;
        }
      }
    }
    .conUl_sp0 {
      font-size: 14px;
    }
    .conUl_sp1 {
      font-size: 12px;
      color: #b3b3b3;
    }
  }
}

.el-dialog {
  min-width: 600px;
  .content {
    font-size: 15px;
    letter-spacing: 1.2px;
    line-height: 26px;
    text-indent: 2em;
  }
  .time {
    display: block;
    text-align: right;
    margin-top: 30px;
    padding-right: 30px;
    color: #333;
  }
}
</style>
