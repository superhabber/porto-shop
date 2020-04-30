<?php

use Fuel\Core\Input;

class Controller_Reviews extends Controller_Rest
{
	protected $format = 'json';

    public function get_single(){
        $arr = DB::select()->from('reviews')->where('model_id', Input::get('id'))->order_by('created_at', 'desc')->execute();
        $list = [];
        foreach($arr as $k => $l){
            $list[$k] = $l;
            $list[$k]['created_at'] = Date::forge($list[$k]['created_at'])->format("%m/%d/%Y %H:%M", true);
            $list[$k]['updated_at'] = Date::forge($list[$k]['updated_at'])->format("%m/%d/%Y %H:%M", true);
        }

        return $this->response(json_encode($list), 200);
    }

    
    public function post_add(){
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $data->review->created_at =  Date::forge()->set_timezone('Europe/Kiev')->get_timestamp();
        $data->review->updated_at =  Date::forge()->set_timezone('Europe/Kiev')->get_timestamp();

        list($insert_id, $rows_affected) = DB::insert('reviews')->set(
            (array) $data->review
        )->execute();

        return $this->response(json_encode(['code' => 'success']), 200);
    }

}
