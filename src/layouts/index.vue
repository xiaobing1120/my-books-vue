<template>
  <div id="layouts">
    <div id="layouts-header">
    <div id="layouts-header-mian">
      <ul>
        <li>111</li>
        <li>222</li>
        <li>333</li>
      </ul>
    </div>
  </div>
    <div id="layouts-mian">
      <div id="layouts-mian-left">
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
        </ul>
      </div>
      <div id="layouts-mian-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutsPage',
}
</script>

<style lang="less">
#layouts{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#layouts-header{
  height: 80px;
  box-shadow: 0 5px 11px #eee;
}
#layouts-header-mian{
  height: 80px;
  display: flex;
  align-items: center;
  ul{
    display: flex;
    li{
      padding: 15px;
    }
  }
}

#layouts-mian{
  flex: 1;
  display: flex;
}
#layouts-mian-left{
  width: 250px;
}
#layouts-mian-right{
  flex: 1;
  padding: 20px;
}

</style>
