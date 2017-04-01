<?php

use Stoatally\Dom\DocumentFactory;

const EXAMPLES = ['thailand', 'doitlive', 'coconuts', 'cow-air-balloon'];
const ROOT_PAGE = true;

error_reporting(-1);
ini_set('display_errors', true);

require 'vendor/autoload.php';
require_once './LBRY.class.php';
require 'image.php';
require 'publish.php';

$tpl = (new DocumentFactory)->createFromUri('templates/home.html');
$publish = $tpl->select('//section[@class = "publish"]')[0];

// Create list of examples:
$tpl->select('//li[@class = "example"]')->repeatNode(EXAMPLES, function($node, $item) {
  $link = $node->select('a')[0];
  $link->setAttribute('href', "/{$item}");
  $link->append("/{$item}");
});

// The publish was completed:
if (isset($name) && isset($_GET['new']))
{
  $publish->select('success')[0]->extractNode();
  $publish->select('form')[0]->removeNode();
}
else
{
  $publish->select('success')[0]->removeNode();

  // Pre-fill the name field:
  if (isset($name))
  {
    $publish->select('form/unclaimed')[0]->extractNode();
    $publish->select('form//input[@name = "name"]')[0]
      ->setAttribute('value', $name);
  }
  else
  {
    $publish->select('form/unclaimed')[0]->removeNode();
  }
}

echo "<!DOCTYPE html>\n", $tpl->saveHtml();