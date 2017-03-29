<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('ROOT_PAGE', 1);

require_once './LBRY.class.php';

$name = ltrim(urldecode($_SERVER['REQUEST_URI']), '/');
if ($name == 'publish')
{
  include './publish.php';
  exit(0);
}
elseif ($name)
{
  include './image.php';
  exit(0);
}
?>
<!DOCTYPE html>
<h1>spee.ch</h1>
<p>spee.ch is a single-serving site that reads (and will soon publish) images to and from the LBRY blockchain.</p>
<p>You can watch live right now as it is being built!</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C9LCapt_OYw" frameborder="0" allowfullscreen></iframe>
<p>Here are some sample images:</p>
<ul>
  <?php foreach(['thailand', 'doitlive', 'coconuts', 'cow-air-balloon'] as $name): ?>
    <li><a href="/<?php echo $name ?>">spee.ch/<?php echo $name ?></a></li>
  <?php endforeach ?>
</ul>
<p>Publishing coming in just a few minutes!</p>
