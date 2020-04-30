<?php

use Fuel\Core\Input;

class Controller_Dashboard extends Controller_Rest
{
    protected $format = 'json';

    public function get_counts()
    {
        $users  = DB::select('id')->from('users')->execute();
        $orders = DB::select('id')->from('orders')->execute();

        $products = DB::select('id')->from('products')->execute();

        $reviews = DB::select('id')->from('reviews')->execute();

        $sorted_orders = [];

        $orders = DB::select('created_at')->from('orders')->execute();

        foreach($orders as $order){
            $date = strval( Date::forge($order['created_at'])->format("%d/%m", true) );

            if(isset($sorted_orders[$date])) $sorted_orders[$date]++;
            else $sorted_orders[$date] = 1;

        }

        $right = [
            ['Days', 'Orders']
        ];

        foreach($sorted_orders as $k => $s){
            $right[] = [$k, $s];
        }

        return $this->response(json_encode([
            'user' => count($users),
            'orders' => count($orders),
            'products' => count($products),
            'reviews' => count($reviews),
            'chart' => $right,
        ]), 200);
    }
}
