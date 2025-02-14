<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            Auth::login($user);
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'Account non esistente'], 401);
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
                'date_of_birth' => 'required|date|before:today',
                'gender' => 'required|in:M,F,-',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        }

        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Account già esistente'], 409);
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'date_of_birth' => date('Y-m-d', strtotime($request->date_of_birth)),
            'gender' => $request->gender
        ]);

        if ($user->save()) {
            Auth::login($user);
            return response()->json(['message' => 'Registration successful', 'user' => $user], 201);
        } else {
            return response()->json(['message' => 'Registration failed'], 500);
        }
    }
}
