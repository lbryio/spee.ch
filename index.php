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

// Create list of examples:
$tpl->select('//li[@class = "example"]')->repeatNode(EXAMPLES, function($node, $item) {
  $link = $node->select('a')[0];
  $link->setAttribute('href', "/{$item}");
  $link->append("/{$item}");
});

// If we have a name, don't show the name field in the form:
if (isset($name) && $name != '')
{
  $tpl->select('//has-name/input')[0]
    ->setAttribute('value', $name);
  $tpl->select('//has-name')[0]->extractNode();
  $tpl->select('//needs-name')[0]->removeNode();
}
else
{
  $tpl->select('//has-name')[0]->removeNode();
  $tpl->select('//needs-name')[0]->extractNode();
}

echo "<!DOCTYPE html>\n", $tpl->saveHtml();