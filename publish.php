<?php

if (isset($_POST['file']))
{
  print_r($_POST['file']);
}
?>
<!DOCTYPE html>
<h1>Publish</h1>
<form method="POST" action="/publish" enctype="multipart/form-data">
  <div>
    <input type="file" name="file" />
  </div>
  <input type="submit" name="key" value="Go" />
</form>