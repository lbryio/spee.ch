<form method="POST" action="/" enctype="multipart/form-data">
  <div>
    <input type="file" name="file" />
  </div>
  <?php if (isset($name) && $name != ''): ?>
    <input type="hidden" name="name" value="<?php echo $name ?>" />
  <?php else: ?>
    <div>
      lbry://<input type="text" name="name" />
    </div>
  <?php endif ?>
  <input type="submit" name="publish" value="Go" />
  <p>Publishing can take a few moments. Please be patient.</p>
</form>