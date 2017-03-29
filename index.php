<?php

define('ROOT_PAGE', 1);

require_once './LBRY.class.php';

$name = ltrim(urldecode($_SERVER['REQUEST_URI']), '/');

if ($name)
{
  error_reporting(E_ALL);
  ini_set('display_errors', 1);
  
  include './image.php';
  exit(0);
}
?>
<!DOCTYPE html>
<h1>spee.ch</h1>
<p>OMG we are live, it is actually happening. It is still happening.</p>
<p>In just a few hours, this site will morph from this utterly bare 6 lines of HTML into a decentralized, censorship-resistant, truly free image sharing site powered by <a href="https://lbry.io">LBRY</a>.
<p>You can watch it happen in real time, starting at 6pm EST tonight (March 29th):</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/C9LCapt_OYw" frameborder="0" allowfullscreen></iframe>
<p><a href="https://github.com/lbryio/spee.ch">GitHub repo</a></p>
