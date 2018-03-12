new Vue({
  el:"#app",
  data:{
      delFlag:false,
      totalMoney:0,
      productList:[], 
      checkAllFlag:false,
      curProduct:''
  },
  filters:{
    formatMoney: function (value) {
        return "￥"+value.toFixed(2);
    }
  },
  mounted:function(){
    this.$nextTick(function(){//保证实例已插入
      this.cartView();
    })
  },
  methods:{
    cartView:function () {
      this.$http.get("data/cartData.json").then(res=>{
         this.productList=res.body.result.list;
      })
    },
      changeMoney:function (product,way) {
          if(way>0){
              product.productQuantity++;
          }else{
              product.productQuantity--;
              if( product.productQuantity<1){//确保数量不为负数
                  product.productQuantity=1;
              }
          }
          this.calcTotalPrice();
      },
      selectedProduct:function (item) {
          if(typeof item.checked == 'undefined'){//判断对象中是不是有这个属性
              //Vue.set(item,"checked",true);//全局注册变量（不存在的变量）
              this.$set(item,"checked",true);//局部注册变量
          }else{
              item.checked=!item.checked;
          }
          this.calcTotalPrice();
      },
      checkAll:function (flag) {
          this.checkAllFlag=flag;
          var _this=this;
          this.productList.forEach(function(item,index){
              if(typeof item.checked == 'undefined'){//判断对象中是不是有这个属性(没有此属性)
                  _this.$set(item,"checked",_this.checkAllFlag);//局部注册变量
              }else{
                  item.checked=_this.checkAllFlag;
              }
          })
          this.calcTotalPrice();
      },
      calcTotalPrice:function () {
          var _this=this;
          _this.totalMoney = 0;//每次计算总金额时，先清零
          this.productList.forEach(function(item,index){
              if(item.checked){
                  _this.totalMoney+=item.productPrice*item.productQuantity;
              }
          })
      },
      delConfirm:function (item) {//点击删除，保存当前要删除的数据
            this.delFlag=true;
            this.curProduct=item;
      },
      delProduct:function () {//删除一条数据
          var index = this.productList.indexOf(this.curProduct);
          this.productList.splice(index,1)
          this.delFlag=false;
      }

  }

});
Vue.filter("money",function (value,type) {
    return "￥"+value.toFixed(2)+type;
})
