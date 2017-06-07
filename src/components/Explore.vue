<template>
  <div class="explore-wrapper">
    <h2>Explore</h2>
    <div class="explore-body">
      <ul id="explore-list">
        <li v-for="item in items">
          <a :href="item.msg">{{item.msg}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { msg: 'thailand' },
      { msg: 'doitlive' },
      { msg: 'coconuts' },
      { msg: 'cow-air-balloon' }
    ]
  })
}
</script>

<style>
.explore-wrapper {
  text-align: left;
  margin: 10px 0px 10px 0px;

  .explore-body {
    background: #D3D3D3;
    border-radius: 0px 10px 0px 10px;
    color: white;
    padding: 20px;
  }
}
</style>
