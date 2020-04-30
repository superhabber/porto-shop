<?php

use Fuel\Core\Input;

class Controller_Size extends Controller_Rest
{
    protected $format = 'json';

    public function get_size_names()
    {
        return $this->response(json_encode([
            'sizes' => [
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
                '3XL',
                '4XL',
                '5XL',
                '6XL'
            ]
        ]), 200);
    }

    public function get_size_by_key_man()
    {
        $key = Input::get('key');
        $height = Input::get('height');
        $width = Input::get('width');

        $sizes = [
            'XS' => [
                66, 46
            ],
            'S' => [
                67, 47
            ],
            'M' => [
                68, 49
            ],
            'L' => [
                69, 51
            ],
            'XL' => [
                70, 52
            ],
            'XXL' => [
                71, 55
            ],
            '3XL' => [
                71.5, 57
            ],
            '4XL' => [
                72, 59
            ],
            '5XL' => [
                72.5, 61
            ],
            '6XL' => [
                73, 64
            ]
        ];


        $cur = $sizes[$key];

        $sizes = [
            'height' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'width' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ]
        ];


        $sizes['height']['mark'] = 10 - ($cur[0] - $height);

        $sizes['height']['diff'] = $cur[0] > $height ? "-" : "+";

        $sizes['height']['diff'] .= round($cur[0] - $height, 1);

        $sizes['height']['status'] = $cur[0] - $height >= 2 ? 2 : ($cur[0] - $height <= 2 && $cur[0] - $height !== 0 ? 1 : 0);

        $sizes['height']['cm'] = $cur[0];

        $sizes['width']['mark'] = 10 - ($cur[1] - $width);

        $sizes['width']['diff'] = $cur[1] > $width ? "-" : "+";

        $sizes['width']['diff'] .= round($cur[1] - $width, 1);

        $sizes['width']['status'] = $cur[1] - $width >= 2 ? 2 : ($cur[0] - $width <= 2 && $cur[1] - $width !== 0 ? 1 : 0);

        $sizes['width']['cm'] = $cur[1];

        return $this->response(json_encode([
            'sizes_info' => $sizes
        ]), 200);
    }

    public function get_sizes_man()
    {
        $height = Input::get('height');
        $width = Input::get('width');
        $arr = [
            [
                'ua' => 'Висота',
                'en' => 'Height',
                'code' => 'B',
                'sizes' => [
                    42 => 66,
                    44 => 67,
                    46 => 68,
                    48 => 69,
                    50 => 70,
                    52 => 71,
                    54 => 71.5,
                    56 => 72,
                    58 => 72.5,
                    60 => 73
                ]
            ],
            [
                'ua' => 'Ширина',
                'en' => 'Width',
                'code' => 'A',
                'sizes' => [
                    42 => 46,
                    44 => 47,
                    46 => 49,
                    48 => 51,
                    50 => 52,
                    52 => 55,
                    54 => 57,
                    56 => 59,
                    58 => 61,
                    60 => 64
                ]
            ]

        ];

        $size_keys = [
            42 => 'XS',
            44 => 'S',
            46 => 'M',
            48 => 'L',
            50 => 'XL',
            52 => 'XXL',
            54 => '3XL',
            56 => '4XL',
            58 => '5XL',
            60 => '6XL'
        ];

        $sizes = [
            'height' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'width' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ]
        ];

        foreach ($arr[0]['sizes'] as $key => $v) {
            if ($height == $v) {
                $sizes['height']['size'] = $key;
            } else if ($height < $v && $sizes['height']['size'] === 0) {
                $sizes['height']['size'] = $key;
                $sizes['height']['mark'] = $sizes['height']['mark'] - ($v - $height);
            }
        }

        if ($sizes['height']['size'] === 0) {
            $sizes['height']['size'] = 60;
            $sizes['height']['mark'] = 0;
        }

        foreach ($arr[1]['sizes'] as $key => $v) {
            if ($width == $v) {
                $sizes['width']['size'] = $key;
            } else if ($width < $v && $sizes['width']['size'] === 0) {
                $sizes['width']['size'] = $key;
                $sizes['width']['mark'] = $sizes['width']['mark'] - ($v - $width);
            }
        }

        if ($sizes['width']['size'] === 0) {
            $sizes['width']['size'] = 60;
            $sizes['width']['mark'] = 0;
        }


        $size = [
            'name' => '',
            'mark' => 0
        ];

        if ($sizes['width']['size'] > $sizes['height']['size']) {

            $sizes['height']['mark'] = 10 - ($arr[0]['sizes'][$sizes['width']['size']] - $height);
            $size = [
                'name' => $sizes['width']['size'],
                'code' => $size_keys[$sizes['width']['size']],
                'mark' => ($sizes['width']['mark'] + $sizes['height']['mark']) / 2
            ];
        } else if ($sizes['height']['size'] > $sizes['width']['size']) {

            $sizes['width']['mark'] = 10 - ($arr[1]['sizes'][$sizes['height']['size']] - $width);
            $size = [
                'name' => $sizes['height']['size'],
                'code' => array_search($sizes['height']['size'], $arr[0]['sizes']),
                'code' => $size_keys[$sizes['height']['size']],
                'mark' => ($sizes['width']['mark'] + $sizes['height']['mark']) / 2
            ];
        } else if ($sizes['height']['size'] == $sizes['width']['size']) {
            $sizes['width']['mark'] = 10;
            $sizes['height']['mark'] = 10;
            $size = [
                'name' => $sizes['height']['size'],
                'code' => array_search($sizes['height']['size'], $arr[0]['sizes']),
                'code' => $size_keys[$sizes['height']['size']],
                'mark' => 10
            ];
        }

        $h_cm = $arr[0]['sizes'][$sizes['height']['size']];
        $w_cm = $arr[1]['sizes'][$sizes['width']['size']];

        $sizes['height']['code'] = $size_keys[$sizes['height']['size']];
        $sizes['height']['cm'] = $h_cm;

        $sizes['height']['diff'] = (int) $h_cm > (int) $height ? "-" : "+";

        $sizes['height']['diff'] .= abs(round($h_cm - $height, 1));

        $sizes['height']['status'] = $h_cm - $height >= 2 ? 2 : ($h_cm - $height <= 2 && $h_cm - $height > 0.5 ? 1 : 0);


        $sizes['width']['code'] = $size_keys[$sizes['width']['size']];
        $sizes['width']['cm'] = $w_cm;

        $sizes['width']['diff'] = $w_cm > $width ? "-" : "+";

        $sizes['width']['diff'] .= abs(round($w_cm - $width, 1));

        $sizes['width']['status'] = $w_cm - $width >= 2 ? 2 : ($w_cm - $width <= 2 && $w_cm - $width > 0.5 ? 1 : 0);

        return $this->response(json_encode([
            'good_size' => $size,
            'sizes_info' => $sizes
        ]), 200);
    }


    public function get_sizes_woman()
    {
        $height = Input::get('height');
        $width = Input::get('width');
        $bust = Input::get('bust');
        $hips = Input::get('hips');

        $arr = [
            [
                'ua' => 'Висота',
                'en' => 'Height',
                'code' => 'B',
                'sizes' => [
                    42 => 66,
                    44 => 67,
                    46 => 68,
                    48 => 69,
                    50 => 70,
                    52 => 71,
                    54 => 71.5,
                    56 => 72,
                    58 => 72.5,
                    60 => 73
                ]
            ],
            [
                'ua' => 'Ширина',
                'en' => 'Width',
                'code' => 'A',
                'sizes' => [
                    42 => 46,
                    44 => 47,
                    46 => 49,
                    48 => 51,
                    50 => 52,
                    52 => 55,
                    54 => 57,
                    56 => 59,
                    58 => 61,
                    60 => 64
                ]
            ],
            [
                'ua' => 'Груди',
                'en' => 'Bust',
                'code' => 'C',
                'sizes' => [
                    42 => 76,
                    44 => 80,
                    46 => 81,
                    48 => 82,
                    50 => 83,
                    52 => 84,
                    54 => 86,
                    56 => 90,
                    58 => 94,
                    60 => 102
                ]
            ],
            [
                'ua' => 'Бедра',
                'en' => 'Hips',
                'code' => 'D',
                'sizes' => [
                    42 => 86,
                    44 => 89,
                    46 => 91,
                    48 => 93,
                    50 => 94,
                    52 => 95,
                    54 => 96,
                    56 => 98,
                    58 => 110,
                    60 => 112
                ]
            ]

        ];

        $size_keys = [
            42 => 'XS',
            44 => 'S',
            46 => 'M',
            48 => 'L',
            50 => 'XL',
            52 => 'XXL',
            54 => '3XL',
            56 => '4XL',
            58 => '5XL',
            60 => '6XL'
        ];

        $sizes = [
            'height' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'width' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'bust' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'hips' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ]
        ];

        foreach ($arr[0]['sizes'] as $key => $v) {
            if ($height == $v) {
                $sizes['height']['size'] = $key;
            } else if ($height < $v && $sizes['height']['size'] === 0) {
                $sizes['height']['size'] = $key;
                $sizes['height']['mark'] = $sizes['height']['mark'] - ($v - $height);
            }
        }

        if ($sizes['height']['size'] === 0) {
            $sizes['height']['size'] = 60;
            $sizes['height']['mark'] = 0;
        }

        foreach ($arr[1]['sizes'] as $key => $v) {
            if ($width == $v) {
                $sizes['width']['size'] = $key;
            } else if ($width < $v && $sizes['width']['size'] === 0) {
                $sizes['width']['size'] = $key;
                $sizes['width']['mark'] = $sizes['width']['mark'] - ($v - $width);
            }
        }

        if ($sizes['width']['size'] === 0) {
            $sizes['width']['size'] = 60;
            $sizes['width']['mark'] = 0;
        }

        foreach ($arr[2]['sizes'] as $key => $v) {
            if ($bust == $v) {
                $sizes['bust']['size'] = $key;
            } else if ($bust < $v && $sizes['bust']['size'] === 0) {
                $sizes['bust']['size'] = $key;
                $sizes['bust']['mark'] = $sizes['bust']['mark'] - ($v - $bust);
            }
        }

        if ($sizes['bust']['size'] === 0) {
            $sizes['bust']['size'] = 60;
            $sizes['bust']['mark'] = 0;
        }

        foreach ($arr[3]['sizes'] as $key => $v) {
            if ($hips == $v) {
                $sizes['hips']['size'] = $key;
            } else if ($hips < $v && $sizes['hips']['size'] === 0) {
                $sizes['hips']['size'] = $key;
                $sizes['hips']['mark'] = $sizes['hips']['mark'] - ($v - $hips);
            }
        }

        if ($sizes['bust']['size'] === 0) {
            $sizes['bust']['size'] = 60;
            $sizes['bust']['mark'] = 0;
        }

        $size = [
            'name' => '',
            'mark' => 0
        ];

        $code = '';

        $big = $sizes['height']['size'] > $sizes['bust']['size'] ? 
                ($sizes['height']['size'] > $sizes['hips']['size'] ? $size_keys[$sizes['height']['size']] : $size_keys[$sizes['hips']['size']]) 
                : ($sizes['bust']['size'] > $sizes['hips']['size'] ? $size_keys[$sizes['bust']['size']] : $size_keys[$sizes['hips']['size']]);

        if ($sizes['width']['size'] > $sizes['height']['size']) {
            
            $sizes['height']['mark'] = 10 - ($arr[0]['sizes'][$sizes['width']['size']] - $height);
            $size = [
                'name' => $sizes['width']['size'],
                'code' => $big,
                'mark' => ($sizes['width']['mark'] + $sizes['height']['mark'] + $sizes['bust']['mark'] + $sizes['hips']['mark']) / 4
            ];
        } else if ($sizes['height']['size'] > $sizes['width']['size']) {

            $sizes['height']['mark'] = 10 - ($arr[0]['sizes'][$sizes['width']['size']] - $height) > 10 ? 10 : 10 - ($arr[0]['sizes'][$sizes['width']['size']] - $height);

            $size = [
                'name' => $sizes['width']['size'],
                'code' => $big,
                'mark' => ($sizes['width']['mark'] + $sizes['height']['mark'] + $sizes['bust']['mark'] + $sizes['hips']['mark']) / 4
            ];
            
        } else if ($sizes['height']['size'] == $sizes['width']['size']) {

            $sizes['width']['mark'] = 10;
            $sizes['height']['mark'] = 10;
            $size = [
                'name' => $sizes['height']['size'],
                'code' => $big,
                'mark' => ($sizes['width']['mark'] + $sizes['height']['mark'] + $sizes['bust']['mark'] + $sizes['hips']['mark']) / 4
            ];
        }

        $h_cm = $arr[0]['sizes'][$sizes['height']['size']];
        $w_cm = $arr[1]['sizes'][$sizes['width']['size']];
        $b_cm = $arr[2]['sizes'][$sizes['bust']['size']];
        $hi_cm = $arr[3]['sizes'][$sizes['hips']['size']];

        $sizes['height']['code'] = $size_keys[$sizes['height']['size']];
        $sizes['height']['cm'] = $h_cm;

        $sizes['height']['diff'] = (int) $h_cm > (int) $height ? "-" : "+";

        $sizes['height']['diff'] .= abs(round($h_cm - $height, 1));

        $sizes['height']['status'] = $h_cm - $height >= 2 ? 2 : ($h_cm - $height <= 2 && $h_cm - $height > 0.5 ? 1 : 0);


        $sizes['width']['code'] = $size_keys[$sizes['width']['size']];
        $sizes['width']['cm'] = $w_cm;

        $sizes['width']['diff'] = $w_cm > $width ? "-" : "+";

        $sizes['width']['diff'] .= abs(round($w_cm - $width, 1));

        $sizes['width']['status'] = $w_cm - $width >= 2 ? 2 : ($w_cm - $width <= 2 && $w_cm - $width > 0.5 ? 1 : 0);


        $sizes['bust']['code'] = $size_keys[$sizes['bust']['size']];
        $sizes['bust']['cm'] = $b_cm;

        $sizes['bust']['diff'] = $b_cm > $bust ? "-" : "+";

        $sizes['bust']['diff'] .= abs(round($b_cm - $bust, 1));

        $sizes['bust']['status'] = $b_cm - $bust >= 2 ? 2 : ($b_cm - $bust <= 2 && $b_cm - $bust > 0.5 ? 1 : 0);


        $sizes['hips']['code'] = $size_keys[$sizes['hips']['size']];
        $sizes['hips']['cm'] = $hi_cm;

        $sizes['hips']['diff'] = $hi_cm > $hips ? "-" : "+";

        $sizes['hips']['diff'] .= abs(round($hi_cm - $hips, 1));

        $sizes['hips']['status'] = $hi_cm - $hips >= 2 ? 2 : ($hi_cm - $hips <= 2 && $hi_cm - $hips > 0.5 ? 1 : 0);


        return $this->response(json_encode([
            'good_size' => $size,
            'sizes_info' => $sizes
        ]), 200);
    }

    public function get_size_by_key_woman()
    {
        $key = Input::get('key');
        $height = Input::get('height');
        $width = Input::get('width');
        $bust = Input::get('bust');
        $hips = Input::get('hips');

        $sizes = [
            
            'XS' => [
                66, 46, 76, 86
            ],
            'S' => [
                67, 47, 80, 89
            ],
            'M' => [
                68, 49, 81, 91
            ],
            'L' => [
                69, 51, 82, 93
            ],
            'XL' => [
                70, 52, 83, 94
            ],
            'XXL' => [
                71, 55, 84, 95
            ],
            '3XL' => [
                71.5, 57, 86, 96
            ],
            '4XL' => [
                72, 59, 90, 98
            ],
            '5XL' => [
                72.5, 61, 94, 102
            ],
            '6XL' => [
                73, 64, 102, 104
            ]
        ];

        $cur = $sizes[$key];

        $sizes = [
            'height' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'width' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'bust' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ],
            'hips' => [
                'mark' => 10,
                'size' => 0,
                'code' => ''
            ]
        ];


        $sizes['height']['mark'] = 10 - ($cur[0] - $height);

        $sizes['height']['diff'] = $cur[0] > $height ? "-" : "+";

        $sizes['height']['diff'] .= round($cur[0] - $height, 1);

        $sizes['height']['status'] = $cur[0] - $height >= 2 ? 2 : ($cur[0] - $height <= 2 && $cur[0] - $height !== 0 ? 1 : 0);


        $sizes['height']['cm'] = $cur[0];

        $sizes['width']['mark'] = 10 - ($cur[1] - $width);

        $sizes['width']['diff'] = $cur[1] > $width ? "-" : "+";

        $sizes['width']['diff'] .= round($cur[1] - $width, 1);

        $sizes['width']['status'] = $cur[1] - $width >= 2 ? 2 : ($cur[0] - $width <= 2 && $cur[1] - $width !== 0 ? 1 : 0);

        $sizes['width']['cm'] = $cur[1];


        $sizes['bust']['mark'] = 10 - ($cur[2] - $bust);

        $sizes['bust']['diff'] = $cur[2] > $bust ? "-" : "+";

        $sizes['bust']['diff'] .= round($cur[2] - $bust, 1);

        $sizes['bust']['status'] = $cur[2] - $bust >= 2 ? 2 : ($cur[2] - $bust <= 2 && $bust[2] - $bust !== 0 ? 1 : 0);

        $sizes['bust']['cm'] = $cur[2];

        
        $sizes['hips']['mark'] = 10 - ($cur[3] - $hips);

        $sizes['hips']['diff'] = $cur[3] > $hips ? "-" : "+";

        $sizes['hips']['diff'] .= round($cur[3] - $hips, 1);

        $sizes['hips']['status'] = $cur[3] - $hips >= 2 ? 2 : ($cur[3] - $hips <= 2 && $hips[3] - $hips !== 0 ? 1 : 0);

        $sizes['hips']['cm'] = $cur[3];

        return $this->response(json_encode([
            'sizes_info' => $sizes
        ]), 200);
    }
}
