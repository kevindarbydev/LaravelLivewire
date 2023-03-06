<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcquaintancesFriendshipTable extends Migration
{

    public function up()
    {

        Schema::create(config('acquaintances.tables.friendships'), function (Blueprint $table) {
            $table->id();
            $table->string('sender')->default('App\Models\User')->change();
            $table->string('recipient')->default('App\Models\User')->change();
            $table->string('status')->default('pending')->comment('pending/accepted/denied/blocked/');
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists(config('acquaintances.tables.friendships'));
    }

}
