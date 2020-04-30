<?php

use Fuel\Core\Input;

class Controller_Admin extends Controller_Rest
{
    protected $format = 'json';

    protected $status = [
        0 => 'Замовлення прийнято',
        1 => 'Замовлення в обробці',
        2 => 'Замовлення відправлено',
        3 => 'Замовлення успішно'
    ];

    public function post_update_order()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);

        $result = DB::update('orders')
            ->set(array(
                'username' => $data->username,
                'email' => $data->email,
                'status' => $data->status
            ))
            ->where('id', '=', $data->id)
            ->execute();
        return $this->response(json_encode(['id' => $data->id]), 200);
    }

    public function get_set_parameters_category()
    {
        return $this->response(json_encode(['hello' => 1]), 200);
    }

    public function get_all_statuses()
    {
        return $this->response(json_encode($this->status), 200);
    }

    public function get_all_products()
    {
        $list = DB::select_array()->from('products')->as_assoc()->order_by('created_at', 'desc')->execute();
        $arr = [];

        foreach ($list as $k => $l) {
            $arr[$k] = $l;
        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_all_categories()
    {
        $list = DB::select_array()->from('categories')->as_assoc()->execute();
        $arr = [];

        foreach ($list as $k => $l) {
            $arr[$k] = $l;
        }

        return $this->response(json_encode($arr), 200);
    }

    /**
     * 
     * COLORS ADMIN
     * 
     */
    public function get_all_colors()
    {
        $list = DB::select_array()->from('colors')->as_assoc()->execute();
        $arr = [];

        foreach ($list as $k => $l) {
            $arr[$k] = $l;
        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_all_orders()
    {
        $list = DB::select_array()->order_by('created_at', 'DESCcd')->from('orders')->as_assoc()->execute();
        $arr = [];

        foreach ($list as $k => $l) {
            $arr[$k] = $l;
            $arr[$k]['created_at'] = Date::forge($arr[$k]['created_at'])->format("%m/%d/%Y %H:%M", true);
            $arr[$k]['status'] = $this->status[$arr[$k]['status']];
        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_all_sizes()
    {
        $arr = [
            'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'
        ];

        return $this->response(json_encode($arr), 200);
    }

    public function post_delete_color()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $list = DB::delete('colors')->where('id', $data->id)->execute()[0];
        return $this->response(json_encode($list), 200);
    }

    public function post_create_color()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);
        // var_dump($data);die;
        list($id, $rows) = DB::insert('colors')->set(
            (array) $data
        )->execute();
        return $this->response(json_encode(['id' => $id]), 200);
    }

    public function get_get_order()
    {
        $id = Input::get('id');
        $list = DB::select_array()->from('orders')->where('id', $id)->as_assoc()->execute()[0];

        $list['created_at'] = Date::forge($list['created_at'])->format("%m/%d/%Y %H:%M", true);
        $list['status'] = $this->status[$list['status']];

        return $this->response(json_encode($list), 200);
    }

    public function get_get_color()
    {
        $id = Input::get('id');
        $list = DB::select_array()->from('colors')->where('id', $id)->as_assoc()->execute()[0];

        return $this->response(json_encode($list), 200);
    }

    /**
     * 
     * PRODUCTS ADMIN
     * 
     */

    public function get_get_product()
    {
        $id = Input::get('id');
        $list = DB::select_array()->from('products')->where('id', $id)->as_assoc()->execute()[0];
        $image = DB::select()->from('images')->where('model_id', $list['id'])->execute()[0];
        $list['image'] = $image;
        return $this->response(json_encode($list), 200);
    }

    public function get_get_category()
    {
        $id = Input::get('id');
        $list = DB::select_array()->from('categories')->where('id', $id)->as_assoc()->execute()[0];

        return $this->response(json_encode($list), 200);
    }

    public function post_image()
    {
        if (!empty($_FILES)) {
            $config = array(
                'path' => DOCROOT . 'assets/img/products',
                'randomize' => true,
                'ext_whitelist' => array('img', 'jpg', 'jpeg', 'gif', 'png'),
            );
            Upload::process($config);

            if (Upload::is_valid()) {
                Upload::save();
                $value = Upload::get_files();
                return $this->response(json_encode(['path' => '/assets/img/products/' . $value[0]['saved_as']]), 200);
            }
        }
    }

    public function post_delete_product()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $list = DB::delete('products')->where('id', $data->id)->execute()[0];
        $img = DB::delete('images')->where('model_id', $data->id)->execute()[0];
        return $this->response(json_encode($list), 200);
    }

    public function post_delete_category()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $list = DB::delete('categories')->where('id', $data->id)->execute()[0];
        return $this->response(json_encode($list), 200);
    }

    public function get_parameters_by_category()
    {
        $id = Input::get('id');

        $parameters = DB::select('parameters')->from('categories')->where('id', $id)->execute()[0];

        return $this->response($parameters['parameters'], 200);
    }

    public function post_update_category()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);

        $result = DB::update('categories')
            ->set(array(
                'title' => $data->title,
                'main' => $data->main
            ))
            ->where('id', '=', $data->id)
            ->execute();
        return $this->response(json_encode(['id' => $data->id]), 200);
    }
    public function post_update_product()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);
        $product = $data->product;

        $result = DB::update('products')
            ->set(array(
                'title' => isset($product->title) ? $product->title : $product->product->title,
                'old_price' => !empty($product->old_price) ? $product->old_price : $product->product->old_price,
                'colors' => json_encode($product->colors),
                'category_id' => isset($product->category_id) ? $product->category_id : $product->product->category_id,
                'new_price' => isset($product->new_price) ? $product->new_price : $product->product->new_price,
                'description' => isset($product->description) ? $product->description : $product->product->description,
            ))
            ->where('id', '=', $data->product->product->id)
            ->execute();

        if (isset($product->imagePath)) {
            $image = DB::update('images')
                ->set(array(
                    'src' => $data->imagePath,
                ))
                ->where('model_id', '=', $data->product->product->id)
                ->execute();
        }
        return $this->response(json_encode(['id' => $product->product->id]), 200);
    }

    public function post_create_product()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);
        $product = $data->product;

        unset($product->parameters->show_c);

        unset($product->parameters->parameters);

        $parameters = json_encode( $product->parameters );

        // var_dump($product);die;

        list($insert_id, $rows_affected) = DB::insert('products')->set(array(
            'title' => $product->title,
            'old_price' => !empty($product->old_price) ? $product->old_price : null,
            'sizes' => json_encode($product->sizes),
            'parameters' => $parameters,
            'colors' => json_encode($product->colors),
            'category_id' => $product->category_id,
            'new_price' => $product->new_price,
            'description' => $product->description,
            'created_at' => Date::forge()->set_timezone('Europe/Kiev')->get_timestamp(),
            'updated_at' => Date::forge()->set_timezone('Europe/Kiev')->get_timestamp()
        ))->execute();

        list($id, $rows) = DB::insert('images')->set(array(
            'model_id' => $insert_id,
            'src' => $data->imagePath,
            'type' => 'single'
        ))->execute();

        return $this->response(json_encode(['id' => $insert_id]), 200);
    }

    public function post_create_category()
    {
        $json = file_get_contents('php://input');
        $data =  json_decode($json);
        $data->parameters = json_encode($data->parameters);

        // var_dump($data);die;

        list($id, $rows) = DB::insert('categories')->set(
            (array) $data
        )->execute();
        
        return $this->response(json_encode(['id' => $id]), 200);
    }

    public function get_email_news()
    {
        $email = Input::get('email');

        $result = '';

        if (DB::select()->from('email_news')->where('email', $email)->execute()[0]) {
            $result = 'already';
        } else {
            list($id, $rows) = DB::insert('email_news')->set([
                'email' => $email
            ])->execute();
            $result = 'created';
        }

        return $this->response(json_encode($result), 200);
    }
}
