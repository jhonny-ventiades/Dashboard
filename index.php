<?php

require 'vendor/autoload.php';
require 'server/Controllers/SignInController.php';
require 'server/Controllers/AssessorController.php';

use Parse\ParseClient;
use Parse\ParseObject;
use Parse\ParseUser;

// start session
session_start();

ParseClient::initialize('ZrANjzvLT79i49LbEjGslE6KZkJzhSgtBZZpsP6u', '7JsISJutDB0NPdSSkJTKCXLbODCkDHCnMaTv1PWY', '87D9BsAyd3gofaraS5ff6gcG46JMaohyl7mOp9Un');

$app = new \Slim\Slim();
$app->config(array(
    'debug' => true,
    'templates.path' => 'client/views/'
));

$app->get('/', function () use ($app) {
    $app->render('index.html');
});

$app->get('/api/signIn/:login/:password','App\Controllers\SignInController:signIn');
$app->get('/api/actual/user/:id','App\Controllers\SignInController:actualUser');
$app->get('/api/current/user','App\Controllers\SignInController:currentUser');
$app->get('/api/assessors/:region','App\Controllers\AssessorController:get');
$app->post('/api/assessors','App\Controllers\AssessorController:create');
$app->get('/api/report/:region','App\Controllers\SignInController:report');


$app->get('/date', function () use ($app) {
    echo   date('Y-m-d H:i:s');
});
$app->notFound(function () use ($app) {
    $app->render('index.html');
});


$app->run();
?>
