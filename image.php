<?php

if (!defined('ROOT_PAGE')) { die('not allowed'); }

$name = ltrim(urldecode($_SERVER['REQUEST_URI']), '/');

if (!$name)
{
  unset($name);
  return;
}

$claim = LBRY::findTopPublicFreeClaim($name);

if (!$claim)
{
  unset($claim);
  return;
}

$getResult = LBRY::api('get', ['name' => $name, 'claim_id' => $claim['claim_id']]);

if (isset($getResult['completed']) && $getResult['completed'] && isset($getResult['download_path']))
{
  $path = $getResult['download_path'];
//    $validType = isset($getResult['content_type']) && in_array($getResult['content_type'], ['image/jpeg', 'image/png']);
  header('Content-type: image/jpeg');
  header('Content-length: ' . filesize($path));
  readfile($getResult['download_path']);
  exit;
}
elseif (isset($getResult['written_bytes']))
{
  echo 'This image is on it\'s way...<br/>';
  echo 'Received: ' . $getResult['written_bytes'] . " / " . $getResult['total_bytes'] . ' bytes';
  exit;
}
else
{
  echo '<p>There seems to be a valid claim, but we are having trouble retrieving the content.</p>';
  exit;
}