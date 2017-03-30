<?php

if (!defined('ROOT_PAGE')) { die('not allowed'); }

$claim = LBRY::findTopPublicFreeClaim($name);

if ($claim)
{
  $getResult = LBRY::api('get', ['name' => $name, 'claim_id' => $claim['claim_id']]);

  if (isset($getResult['completed']) && $getResult['completed'] && isset($getResult['download_path']))
  {
    $path = $getResult['download_path'];
    //TODO, verify it is an image
    //TODO: serve the correct content type!
    header('Content-type: image/jpeg');
    header('Content-length: ' . filesize($path));
    readfile($getResult['download_path']);
  }
  elseif (isset($getResult['written_bytes']))
  {
    echo 'This image is on it\'s way...<br/>';
    echo 'Received: ' . $getResult['written_bytes'] . " / " . $getResult['total_bytes'] . ' bytes';
  }
  else
  {
    echo 'There seems to be a valid claim, but are having trouble retrieving the content.';
  }
}
elseif (isset($_GET['new']) && $_GET['new'])
{
  echo 'Your image is on the way. It can take a few minutes to reach the blockchain and be public. You can refresh this page to check the progress.';
}
else
{
  echo 'No valid claim for this name. Make one!';
  include './publish.php';
}

exit(0);
