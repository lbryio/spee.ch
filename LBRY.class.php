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

    $serverOutput = curl_exec($ch);
    curl_close($ch);

    if ($serverOutput)
    {
      $responseData = json_decode($serverOutput, true);

      if (isset($responseData['error'])) {
        throw new Exception($responseData['error']);
      }

      if (isset($responseData['result'])) {
        return $responseData['result'];
      }
    }
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
        //TODO: Expand these checks
        ($metadata['license'] == "Public Domain" || stripos($metadata['license'], 'Creative Commons') !== false) &&
        in_array($metadata['content_type'], ['image/jpeg', 'image/png']) &&
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