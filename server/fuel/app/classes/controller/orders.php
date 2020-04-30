<?php

class Controller_Orders extends Controller_Rest
{
    protected $format = 'json';

    protected $status = [
        0 => 'Замовлення прийнято',
        1 => 'Замовлення в обробці',
        2 => 'Замовлення відправлено',
        3 => 'Замовлення успішно'
    ];

    public function post_create()
    {
        $json = file_get_contents('php://input');
        $data =  ( json_decode($json) )->order;

        // var_dump($data);die;

        list($id, $rows) = DB::insert('orders')->set([
            'username' => $data->username,
            'email' => $data->email,
            'method' => $data->method,
            'cart' => json_encode( $data->cart ),
            'cart_count' => $data->cart_count,
            'city_name' => $data->city,
            'created_at' =>  Date::forge()->set_timezone('Europe/Kiev')->get_timestamp(),
            'updated_at' =>  Date::forge()->set_timezone('Europe/Kiev')->get_timestamp()
        ])->execute();

        return $this->response(json_encode(['id' => $id]), 200);
    }

    public function get_find_by_email()
    {
        $email = Input::get('email');

        $list = DB::select()->from('orders')->where('email', $email);

        $arr = [];

        foreach ($list->execute() as $k => $l) {
            $arr[$k] = $l;
            $arr[$k]['created_at'] = Date::forge($arr[$k]['created_at'])->format("%m/%d/%Y %H:%M", true);
        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_select()
    {
        $id = Input::get('id');

        $arr = DB::select()->from('orders')->where('id', $id)->execute()[0];

        $arr['created_at'] = Date::forge($arr['created_at'])->format("%m/%d/%Y %H:%M", true);

        $arr['status'] = $this->status[$arr['status']];

        return $this->response(json_encode($arr), 200);
    }
}
