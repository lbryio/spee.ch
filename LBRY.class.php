<?php

if (!defined('ROOT_PAGE')) { die('not allowed'); }

class LBRY
{
  public static function api($function, array $params = [])
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'http://localhost:5279/lbryapi');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['method' => $function, 'params' => $params]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $server_output = curl_exec($ch);

    if ($server_output)
    {
      $responseData = json_decode($server_output, true);
      if (isset($responseData['error']))
      {
        throw new Exception($responseData['error']['message'] ?? 'Something unknown went wrong');
      }
      return $responseData['result'];
    }

    curl_close ($ch);

    return $server_output;
  }

  public static function publishPublicClaim($name, $tmpFileName)
  {
    $filePath = '/home/lbry/spee.ch/publishes/newupload-' . random_int(1, PHP_INT_MAX);

    move_uploaded_file($tmpFileName, $filePath);

    $apiResult = LBRY::api('publish', [
      'name' => $name,
      'bid' => 1,
      'file_path' => $filePath,
      'description' => 'An image published from spee.ch',
      'author' => 'https://spee.ch',
      'language' => 'en',
      'license' => 'Public Domain',
      'nsfw' => 0,
      'title' => 'Image published from spee.ch'
    ]);

    return isset($apiResult['claim_id']);
  }

  public static function findTopPublicFreeClaim($name)
  {
    $claims = LBRY::api('claim_list', ['name' => $name]);
    if (!$claims || !isset($claims['claims']))
    {
      return null;
    }

    $freePublicClaims = array_filter($claims['claims'], function($claim) {
      $metadata = json_decode($claim['value'], true);
      return
        //TODO: Expand these checks AND verify it is an image claim!
        ($metadata['license'] == "Public Domain" || stripos($metadata['license'], 'Creative Commons') !== false) &&
        !isset($metadata['fee']);
    });

    if (count($freePublicClaims) > 1)
    {
      usort($freePublicClaims, function($claimA, $claimB) {
        if ($claimA['amount'] == $claimB['amount'])
        {
          return $claimA['height'] < $claimB['height'] ? -1 : 1;
        }
        return $claimA['amount'] > $claimB['amount'] ? -1 : 1;
      });
    }

    return reset($freePublicClaims);
  }
}