<?php

use Fuel\Core\Input;

class Controller_User extends Controller_Rest
{
    protected $format = 'json';

    public function post_login()
    {

        $json = file_get_contents('php://input');

        $data = json_decode($json);

        $email = $data->email;

        $password = $data->password;

        $list = [];

        if (Auth::login($email, $password)) {
            $list['usertoken'] = Auth::get('login_hash');
        } else {
            $list['errors'] = 'User not found or something went wrong';
        }

        $list = json_encode($list);

        return $this->response($list, 200);
    }

    public function post_register()
    {

        $json = file_get_contents('php://input');
        $list = [];
        $data = json_decode($json);
        try {
            $user = Auth::create_user(
                $data->username,
                $data->password,
                $data->email,
                1,
                []
            );
        } catch (SimpleUserUpdateException $e) {
            //var_dump($e);die;
            $list['errors'] = 'Username or Email already exists';
        }

        $list = json_encode($list);

        return $this->response($list, 200);
    }

    public function post_data()
    {

        $json = file_get_contents('php://input');
        $list = [1];
        $data = json_decode($json);

        $list = DB::select()->from('users')->where('login_hash', $data->token)->execute();

        return $this->response($list, 200);
    }

    public function get_compares_cat()
    {
        $arr = [];
        $list = DB::select('products')->from('compares')->where('user_id', Input::get('user_id'))->execute()[0];

        $products = json_decode($list['products']);

        if (!empty($products)) {
            foreach ($products as $k => $l) {
                $arr[$k] = DB::select('id', 'title', 'category_id', 'parameters')->from('products')->where('id', $l)->execute()[0];
            }
        }

        $parameters = DB::select('parameters')->from('categories')->where('id', $arr[0]['category_id'])->execute()[0]['parameters'];

        $compares = [];

        foreach (json_decode($parameters) as $k => $p) {

            foreach ($arr as $a => $val) {

                foreach (json_decode($val['parameters'], true) as $kk => $j) {

                    $compares[$kk]['values'][$a] = $j;
                }
            }
        }

        $compares = array_values($compares);

        foreach (json_decode($parameters) as $k => $p) {
            $compares[$k]['name'] = $p;
        }

        return $this->response(json_encode(['data' => $arr, 'count' => count($arr), 'compares' => $compares]), 200);
    }

    public function get_compares()
    {
        $arr = [];
        $list = DB::select('products')->from('compares')->where('user_id', Input::get('user_id'))->execute()[0];

        $products = json_decode($list['products']);

        if (!empty($products)) {
            foreach ($products as $k => $l) {
                $arr[$k] = DB::select('id', 'title', 'category_id')->from('products')->where('id', $l)->execute()[0];
            }
        }

        //$parameters = DB::select('parameters')->from('categories')->where('id', $arr[0]['category_id'])->execute()[0];

        return $this->response(json_encode(['data' => $arr, 'count' => count($arr)]), 200);
    }

    public function get_add_compare()
    {
        $id = Input::get('id');
        $user_id = Input::get('user_id');

        $arr = DB::select()->from('compares')->where('user_id', $user_id)->execute()[0];

        if (!empty($arr)) {
            $products = json_decode($arr['products']);
            if (!in_array($id, $products)) {
                $products[] = $id;

                $products = json_encode($products);

                $result = DB::update('compares')->value("products", $products)
                    ->where('user_id', $user_id)
                    ->execute();
            }
        }
        return $this->response(json_encode(['code' => 'success']), 200);
    }

    public function post_set_compare()
    {
        $json = file_get_contents('php://input');

        $data = json_decode($json);

        //$arr = DB::select()->from('compares')->where('user_id', $data->user_id)->execute()[0];

        $result = DB::update('compares')
            ->value("products", json_encode($data->new_list))
            ->where('user_id', $data->user_id)
            ->execute();


        return $this->response(json_encode(['code' => 'success']), 200);
    }

    public function post_edit_info()
    {
        $json = file_get_contents('php://input');
        $list = [];
        $data = json_decode($json);
        $data = $data->data;
        // if (Auth::force_login($data->user->id)){
        //     Auth::update_user(
        //         array(
        //             'username' => $data->first_name . ' ' . $data->last_name,
        //             'email' => $data->email,
        //             'password' => null
        //         )
        //     );
        // }



        $result = DB::update('users')
            ->set(array(
                'username' => $data->first_name . ' ' . $data->last_name,
                'email' => $data->email,
            ))
            ->where('id', '=', $data->user->id)
            ->execute();
        if (!empty($data->pass)) {
            $result = DB::update('users')
                ->set(array(
                    'password' => \Auth::instance()->hash_password($data->pass)
                ))
                ->where('id', '=', $data->user->id)
                ->execute();
        }
        var_dump($result);
    }
}
