<?php

if (!defined('ROOT_PAGE')) { die('not allowed'); }

$claim = LBRY::findTopPublicFreeClaim($name);

if ($claim)
{
  $getResult = LBRY::api('get', ['name' => $name, 'claim_id' => $claim['claim_id']]);

  if (isset($getResult['completed']) && $getResult['completed'] && isset($getResult['download_path']))
  {
    $path = $getResult['download_path'];
    header('Content-type: ' . $getResult['metadata']['content_type']);
    header('Content-length: ' . filesize($path));
    readfile($getResult['download_path']);
  }
  elseif (isset($getResult['written_bytes']))
  {
    echo 'This image is on it\'s way... maybe.<br/>';
    echo 'Received: ' . $getResult['written_bytes'] . " / " . $getResult['total_bytes'] . ' bytes';
  }
  else
  {
    echo 'There seems to be a valid claim, but are having trouble retrieving the content.';
  }
}
else
{
  echo 'No valid claim for this name. Make one! https://lbry.io/quickstart';
}

exit(0);
