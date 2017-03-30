<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('ROOT_PAGE', 1);

require_once './LBRY.class.php';

$name = ltrim(urldecode($_SERVER['REQUEST_URI']), '/');
if ($name)
{
  include './image.php';
  exit(0);
}
if (isset($_POST['publish']) && isset($_POST['name']) && isset($_FILES['file']))
{
  $success = LBRY::publishPublicClaim($_POST['name'], $_FILES['file']['tmp_name']);
  if ($success)
  {
    header('Location: /' . $_POST['name'] . '?new=1');
  }
  else
  {
    echo '<p>Something went wrong publishing your content. We are only somewhat sorry.</p>';
  }
  exit(0);
}
?>
<!DOCTYPE html>
<h1><img src="https://spee.ch/speechlogo" alt="spee.ch logo" style="max-height: 36px; vertical-align: middle; max-width: 36px;" />spee.ch</h1>
<p>spee.ch is a single-serving site that reads and publishes images to and from the <a href="https://lbry.io">LBRY</a> blockchain.</p>
<p>Examples:</p>
<ul>
  <?php foreach(['thailand', 'doitlive', 'coconuts', 'cow-air-balloon'] as $sampleName): ?>
    <li><a href="/<?php echo $sampleName ?>">spee.ch/<?php echo $sampleName ?></a></li>
  <?php endforeach ?>
</ul>
<h3>Publish Your Own</h3>
<?php include './publish.php' ?>
<h3>About This Site</h3>
<p>It was built live in a little over 2 hours on March 29th, 2017. You can watch the video here:</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C9LCapt_OYw" frameborder="0" allowfullscreen></iframe>
