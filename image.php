<?php

use Stoatally\Dom\DocumentFactory;

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
$tpl = (new DocumentFactory)->createFromUri('templates/image.html');
$status = $tpl->select('//section[@class = "status"]')[0];

if (isset($getResult['completed']) && $getResult['completed'] && isset($getResult['download_path']))
{
  $path = $getResult['download_path'];
//    $validType = isset($getResult['content_type']) && in_array($getResult['content_type'], ['image/jpeg', 'image/png']);
  header('Content-type: image/jpeg');
  header('Content-length: ' . filesize($path));
  readfile($getResult['download_path']);
  exit;
}
else if (isset($getResult['written_bytes']))
{
  $downloading = $status->select('downloading')[0];
  $downloading->select('.//written-bytes')
    ->setContents($getResult['written_bytes']);
  $downloading->select('.//total-bytes')
    ->setContents($getResult['total_bytes']);
  $downloading->extractNode();
  $status->select('error')[0]->removeNode();
}
else
{
  $error = $status->select('error')[0];
  $error->select('p')
    ->setContents('There seems to be a valid claim, but we are having trouble retrieving the content.');
  $error->extractNode();
  $status->select('downloading')[0]->removeNode();
}

echo "<!DOCTYPE html>\n", $tpl->saveHtml(); exit;
