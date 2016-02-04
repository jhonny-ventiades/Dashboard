<?php

require 'vendor/autoload.php';


$app = new \Slim\Slim();
$app->config(array(
    'debug' => true,
    'templates.path' => 'client/views/'
));

$app->get('/', function () use ($app) {
    $app->render('index.html');
});


$app->get('/date', function () use ($app) {
    echo   date('Y-m-d H:i:s');
});
$app->notFound(function () use ($app) {
    $app->render('index.html');
});


$app->run();
?>
