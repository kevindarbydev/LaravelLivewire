<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Item;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;


class OrderController extends Controller
{
    //Show/Read orders
    public function index(): Response
    {
        return Inertia::render('Marketplace/Orders', [
            'orders' => Order::with('order_item', 'user')->where('user_id', Auth::user()->id)->latest()->get(),
            'cartCount' => Cart::count(),
        ]);
    }

    //Create orders
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subtotal' => 'required|double',
            'shipping' => 'required|double',
            'tax' => 'required|double',
            'totalPrice' => 'required|double',
        ]);

        $request->user()->orders()->create($validated);

        return redirect(route('orders.index'));
    }

    //Update Orders
    public function update(Request $request, Order $order): RedirectResponse
    {
        $this->authorize('update', $order);

        $validated = $request->validate([
            'subtotal' => 'required|int',
            'shipping' => 'required|int',
            'tax' => 'required|int',
            'totalPrice' => 'required|int',
        ]);

        $order->update($validated);

        return redirect(route('orders.index'));
    }

    //Delete Orders
    public function destroy(Order $order): RedirectResponse
    {
        $this->authorize('delete', $order);

        $order->delete();

        return redirect(route('orders.index'));
    }

    public function showOrderItems(Request $request): Response
    {

        return Inertia::render('Marketplace/OrderItems', [
            //return order items
            'order_items' => Order_Item::with('order', 'album')->where('order_id', $request->order)->latest()->get(),
            'cartCount' => Cart::count(),
        ]);
    }

    public function showPurchases(Request $request): Response
    {

        return Inertia::render('Marketplace/OrderItems', [
            //return order items
            'order_items' => Order_Item::with('order', 'album', 'users')->latest()->get(),
            'cartCount' => Cart::count(),
        ]);
    }
}
