<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Item;
use App\Models\Album;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;



class OrderController extends Controller
{
    //Show/Read orders
    public function index(): Response
    {
        return Inertia::render('Marketplace/Orders', [
            'order_items' => Order_Item::with('order','album')->latest()->get(),
            'orders' => Order::with('order_item','user')->latest()->get(),

        ]);
    }

    //Create orders
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'subtotal' => 'required|int',
            'shipping' => 'required|int',
            'tax' => 'required|int',
            'totalPrice' => 'required|int',
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
}
