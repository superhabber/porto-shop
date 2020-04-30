<?php

use Fuel\Core\Input;

class Controller_Wishlist extends Controller_Rest
{
    protected $format = 'json';

    public function post_add(){
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        $code = 'success';

        $old = DB::select('id')->from('wishlist')->where('model_id', $data->model_id)->and_where('user_id', $data->user_id)->execute()[0];

        if( empty( $old ) ){
            list($insert_id, $rows_affected) = DB::insert('wishlist')->set(
                (array) $data
            )->execute();
        }else{
            $code = 'found';
        }

        return $this->response(json_encode(['code' => $code]), 200);
    }

    public function get_products(){
        $user_id = Input::get('user_id');

        $list = DB::select()->from('wishlist')->where('user_id', $user_id)->execute();

        $arr = [];

        foreach($list as $k => $l){
            $arr[$k] = DB::select()->from('products')->where('id', $l['model_id'])->execute()[0];

            $arr[$k]['image'] = DB::select()->from('images')->where('model_id', $arr[$k]['id'])->execute()[0];

        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_delete(){
        $model_id = Input::get('model_id');
        $user_id = Input::get('user_id');

        $result = DB::delete('wishlist')->where('model_id', $model_id)->and_where('user_id', $user_id)->execute();

        return $this->response(json_encode(['code'=>'success']), 200);
    }

    
}
