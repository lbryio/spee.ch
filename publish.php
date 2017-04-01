<?php

if (!defined('ROOT_PAGE')) { die('not allowed'); }

if (isset($_POST['publish']) && isset($_POST['name']) && isset($_FILES['file']))
{
  $success = LBRY::publishPublicClaim($_POST['name'], $_FILES['file']['tmp_name']);

  if ($success)
  {
    header('Location: /' . $_POST['name'] . '?new');
  }
  else
  {
    echo '<p>Something went wrong publishing your content. We are only somewhat sorry.</p>';
  }

  exit;
}