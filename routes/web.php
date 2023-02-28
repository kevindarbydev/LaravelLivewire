<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Community\CommunityController;
use App\Http\Controllers\Community\FriendController;
use App\Http\Controllers\Dashboard\AlbumController;
use App\Http\Controllers\Dashboard\CollectionController;
use App\Http\Controllers\Dashboard\ExportController;
use App\Http\Controllers\Dashboard\WishlistController;
use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\Marketplace\MarketplaceController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProfileController;



// LANDING PAGE
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->middleware(['auth', 'verified'])->name('landing.page');

//CSRF token
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
})->name('csrf.token');

// DASHBOARD
Route::group(['middleware' => 'auth', 'prefix' => 'dashboard'], function () {
    Route::get('/albums', [AlbumController::class, 'index'])->name('dashboard.index');
    Route::post('/albums/store', [AlbumController::class, 'store'])->name('dashboard.albums.store');
    Route::get('/albums/{album}', [AlbumController::class, 'show'])->name('dashboard.albums.show');
    Route::post('/albums', [AlbumController::class, 'addAlbumToCollection'])->name('dashboard.album.to.collection');
    // -------------------------
    Route::get('/collections', [CollectionController::class, 'index'])->name('dashboard.collections');
    Route::post('/collections/store', [CollectionController::class, 'store'])->name('dashboard.collections.store');
    Route::patch('/collections/album/update', [CollectionController::class, 'updateForSale'])->name('dashboard.collections.album.sell');
    Route::patch('/collections/{collection}', [CollectionController::class, 'update'])->name('dashboard.collections.update');
    Route::patch('/collections/remove/album}', [CollectionController::class, 'removeFromCollection'])->name('dashboard.collections.remove.album');
    Route::delete('/collections/{collection}', [CollectionController::class, 'destroy'])->name('dashboard.collections.destroy');
    // -------------------------
    Route::get('/wishlists', [WishlistController::class, 'index'])->name('dashboard.wishlists');
    Route::post('/wishlists', [WishlistController::class, 'addAlbumToWishlist'])->name('dashboard.album.to.wishlist');
    Route::patch('/wishlists/{wishlist}', [WishlistController::class, 'update'])->name('dashboard.wishlists.update');
    Route::delete('/wishlists/remove/{id}', [WishlistController::class, 'removeFromWishlist'])->name('dashboard.wishlists.remove.album');
    // -------------------------
    Route::get('/export', [ExportController::class, 'index'])->name('dashboard.export');
});

// EXPLORE
Route::group(['middleware' => 'auth', 'prefix' => 'explore'], function () {
    Route::get('/', [ExploreController::class, 'index'])->name('explore.index');
    Route::get('/viewAllAlbums', [ExploreController::class, 'viewAllAlbums'])->name('explore.viewAllAlbums');
    Route::get('/advSearch', [ExploreController::class, 'advSearch'])->name('explore.advSearch');
});

// COMMUNITY
Route::group(['middleware' => 'auth', 'prefix' => 'community'], function () {
    Route::get('/', [CommunityController::class, 'index'])->name('community.index');
    Route::get('/search', [CommunityController::class, 'search'])->name('community.search');
    Route::post('/search', [CommunityController::class, 'searchPost'])->name('community.search.post');
    Route::patch('/search/{user}', [CommunityController::class, 'addFriend'])->name('community.search.add.friend');
    // -----------------------------
    Route::get('/friends', [FriendController::class, 'index'])->name('friends.index');
    Route::patch('/friends/update/{friendship}', [FriendController::class, 'acceptRequest'])->name('friends.update');
    Route::patch('/friends/deny/{friendship}', [FriendController::class, 'denyRequest'])->name('friends.deny');
    Route::delete('/friends/delete/{friendship}', [FriendController::class, 'unfriend'])->name('friends.unfriend');
});


// MARKETPLACE
Route::group(['middleware' => 'auth', 'prefix' => 'marketplace'], function () {
    Route::get('/', [MarketplaceController::class, 'index'])->name('marketplace.index');

    //CRUD Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/order_items', [OrderController::class, 'showOrderItems'])->name('marketplace.orders.order_items');
    Route::post('/orders/store', [OrderItemController::class, 'store'])->name('order_item.store');
    Route::patch('/orders/{order}', [OrderController::class, 'update'])->name('marketplace.orders.update');
    Route::patch('/orders/{order}', [OrderController::class, 'destroy'])->name('marketplace.orders.destroy');
});

// PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ADMIN
Route::group(['middleware' => ['web', 'auth', 'admin'], 'prefix' => 'admin'], function () {
    //get tables
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/albums', [AdminController::class, 'albums'])->name('admin.albums.index'); //not sure im using this one?

    //delete
    Route::delete('/albums/{id}', [AdminController::class, 'deleteAlbum'])->name('admin.albums.delete');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
});



// MESSAGES
Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'messages'], function () {
    Route::get('/', [MessagesController::class, 'index'])->name('messages.index');
    Route::get('/create', [MessagesController::class, 'create'])->name('messages.create');
    Route::post('/store/{userId}', [MessagesController::class, 'store'])->name('messages.store');
    Route::get('/{userId}', [MessagesController::class, 'show'])->name('messages.show');
    Route::post('/{userId}', [MessagesController::class, 'update'])->name('messages.update');
});
require __DIR__ . '/auth.php';
