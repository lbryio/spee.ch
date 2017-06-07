<template>
  <div class="publish-wrapper">
    <h2>Publish</h2>
    <form class="publish-form" method="POST" action="/" enctype="multipart/form-data">
      <div>
        <input type="file" name="file" />
      </div>
      <div>
        lbry://<input type="text" name="name" />
      </div>
      <input type="submit" name="publish" value="Go" />
      <p class="help-text">Publishing can take a few moments. Please be patient.</p>
    </form>
  </div>
</template>

<style>
.publish-wrapper {
  text-align: left;
  margin: 10px 0px 10px 0px;

  .publish-form {
    background: #D3D3D3;
    border-radius: 0px 10px 0px 10px;
    padding: 20px;
  }

  .help-text {
    font-style: italic;
    font-size: small;
    color: #333;
  }
}
</style>
