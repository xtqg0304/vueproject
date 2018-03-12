new Vue({
  el: '.container',
  data: {
    limitNum: 3,
    addressList: [],
    currentIndex: 0,//默认选中的地址索引为0
    shippingMethod: 1 //配送方式
  },
  mounted: function() {
    this.$nextTick(function() {//确保dom加载完成
      this.getAddressList();
    });
  },
  computed: {
    filterAddress: function() {//返回一个全新的数据
      return this.addressList.slice(0, this.limitNum);
    }
  },
  methods: {
    getAddressList: function() {
      var _this = this;
      this.$http.get("data/address.json").then(function(response) {
        var res = response.data;
        if (res.status == "0") {
          _this.addressList = res.result;
        }
      });
    },
    loadMore: function() {
      this.limitNum = this.addressList.length;
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function (address, index) {
        if (address.addressId == addressId) {//当前选中的地址设为true
          address.isDefault = true;
        }
        else {//将其他所有的地址都设为false（即清除原来默认地址的值）
          address.isDefault = false;
        }
      });
    }
  }
});
