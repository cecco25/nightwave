<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => 'auth'], function () {
    // Home Page
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name("home");
});

Route::get('login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('login', [AuthController::class, 'login']);
