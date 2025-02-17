<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => 'auth'], function () {
    // Home Page
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name("home");

    // Logout
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::group(['middleware' => 'guest'], function () {
    // Login Page
    Route::get('login', function () {
        return Inertia::render('Login');
    })->name('login');

    Route::post('login', [AuthController::class, 'login']);

    // Register Page
    Route::get("registrati", function () {
        return Inertia::render('Register');
    })->name("registrati");

    Route::post("registrati", [AuthController::class, 'register']);
});
