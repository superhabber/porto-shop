<?php

use Fuel\Core\Input;

class Controller_Products extends Controller_Rest
{
    protected $format = 'json';

    public function get_all_sorted_products()
    {
        $limit = !empty(Input::get('limit')) ? Input::get('limit') : 12;

        $category_id = !empty(Input::get('category_id')) ? Input::get('category_id') : null;

        $list = DB::select_array()->from('products')->limit($limit)->as_assoc();

        if (empty(Input::get('with'))) $list = $list->order_by('created_at', 'desc');

        if ($category_id !== null) $list = $list->where('category_id', $category_id);

        $arr = [];

        foreach ($list->execute() as $k => $l) {
            $arr[$k] = $l;
            $arr[$k]['image'] = DB::select()->from('images')->where('model_id', $l['id'])->execute()[0];
        }

        return $this->response(json_encode($arr), 200);
    }

    public function get_single()
    {
        $arr = DB::select()->from('products')->where('id', Input::get('id'))->execute()[0];
        $arr['image'] = DB::select()->from('images')->where('model_id', Input::get('id'))->execute()[0];
        $arr['category'] = DB::select()->from('categories')->where('id', $arr['category_id'])->execute()[0];
        $arr['size_table'] = DB::select()->from('dress_sizes')->where('id', $arr['category']['size_id'])->execute()[0];

        return $this->response(json_encode($arr), 200);
    }
    public function get_colors()
    {
        $arr = DB::select('colors')->from('products')->where('id', Input::get('model_id'))->execute()[0];
        $colors = [];

        foreach (json_decode($arr['colors']) as $color) {
            $c = DB::select()->from('colors')->where('name', $color)->execute()[0];

            if (!empty($c)) $colors[] = $c;
        }

        return $this->response(json_encode($colors), 200);
    }


    public function post_filter()
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $list = [];

        $arr = DB::select()->from('products')->limit($data->filter->limit);

        if (isset($data->category_id)) $arr = $arr->where('category_id', $data->category_id);

        if (isset($data->filter->orderby) && $data->filter->orderby !== 'Default sorting') {
            switch ($data->filter->orderby) {
                case "date": {
                        $arr->order_by('created_at', 'desc');
                        break;
                    }
                case "price": {
                        $arr->order_by('new_price', 'asc');
                        break;
                    }
                case "price-desc": {
                        $arr->order_by('new_price', 'desc');
                        break;
                    }
            }
        }

        if (isset($data->filter->start_price)) {
            $arr->where('new_price', 'between', array($data->filter->start_price, $data->filter->finish_price));
        }

        if (!empty(Input::get('search')) && Input::get('search') !== 'null') {
            $arr->where('title', 'like', '%' . Input::get('search') . '%');
        }

        $c = isset(DB::select()->from('products')->offset($data->filter->limit)->limit(1)->execute()[0]) ? true : false;

        foreach ($arr->execute() as $k => $l) {

            if (!empty($data->filter->sizes)) {

                foreach ($data->filter->sizes as $s) {

                    if (in_array($s, json_decode($l['sizes'], true))) {
                        $list[$k] = $l;
                        $list[$k]['image'] = DB::select()->from('images')->where('model_id', $l['id'])->execute()[0];
                    }
                }
            } else {
                $list[$k] = $l;
                $list[$k]['image'] = DB::select()->from('images')->where('model_id', $l['id'])->execute()[0];
            }
        }

        $list = array_values($list);

        return $this->response(json_encode(['products' => $list, 'can_load' => $c]), 200);
    }
}
