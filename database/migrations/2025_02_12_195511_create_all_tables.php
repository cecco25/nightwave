<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Tabella eventi
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->dateTime('date');
            $table->string('place');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Tabella utenti
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email')->unique();
            $table->string('password');
            $table->date('date_of_birth');
            $table->enum('gender', ['M', 'F', '-'])->default('-');
            $table->rememberToken();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });

        // Tabella tipi biglietto
        Schema::create('ticket_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // Tabella biglietti
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignId('ticket_type_id')->constrained('ticket_types')->onDelete('cascade');
            $table->integer('amount');
            $table->decimal('price', 8, 2);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
        });

        // Tabella acquisti
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticket_id')->constrained('tickets')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('payment_status');
            $table->decimal('amount', 8, 2);
            $table->string('currency');
            $table->dateTime('date')->default(now());
            $table->boolean('is_valid')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
        Schema::dropIfExists('tickets');
        Schema::dropIfExists('users');
        Schema::dropIfExists('ticket_types');
        Schema::dropIfExists('purchases');
    }
};
