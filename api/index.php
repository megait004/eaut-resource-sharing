<?php
define('CONTENT_TYPE_JSON', 'Content-Type: application/json');

$request_uri = $_SERVER['REQUEST_URI'];
$request_uri = strtok($request_uri, '?');

switch ($request_uri) {
    case '/':
        require_once __DIR__ . '/docs/render.php';
        $endpoints = ['login', 'phpinfo', 'register'];
        $documentation = '';

        foreach ($endpoints as $endpoint) {
            $json = file_get_contents(__DIR__ . "/docs/{$endpoint}.json");
            $data = json_decode($json, true);
            $documentation .= renderEndpoint($data);
        }

        echo '<!DOCTYPE html>
<!--
                                _ooOoo_
                               o8888888o
                               88" . "88
                               (| -_- |)
                               O\  =  /O
                            ____/`---\'____
                          .\'  \\|     |//  `.
                         /  \\|||   :  |||//  \
                        /  _||||| -:- |||||-  \
                        |   | \\\   -  /// |   |
                        | \_|  \'\'\---/\'\'  |_/ |
                        \  .-\__  `-`  ___/-. /
                        ___`. .\'  /--.--\  `. . __
                      ."" \'<  `.___\_<|>_/___.\' >\'""".
                     | | :  `- \`.;`\ _ /`;.`/ - ` : |
                     \  \ `-.   \_ __\ /__ _/   .-` /
                   ====`-.____`-.___\_____/___.-`____.-\'=====
                   ==========================================
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                          "A DI ĐÀ LẠT.🙏"
-->
        <html lang="vi">
        <head>
            <title>EAUT API Documentation</title>
            <meta name="description" content="API Documentation for EAUT Resource Sharing - A platform for sharing educational resources at EAUT">
            <link rel="icon" type="image/png" href="https://github.com/megait004.png">

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

            <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-dracula.min.css" rel="stylesheet" />

            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/show-language/prism-show-language.min.js"></script>

            <style>
                body {
                    font-family: "JetBrains Mono", monospace;
                }
            </style>
        </head>
        <body class="bg-[#282a36] p-8">
            <div class="max-w-5xl mx-auto">
                <div class="flex justify-between items-center mb-12 border-b-2 border-[#ff79c6] pb-4">
                    <h1 class="text-4xl font-bold text-[#f8f8f2]">
                        EAUT Resource Sharing API
                        <p class="text-sm font-normal mt-2 text-[#6272a4]">
                            Tài liệu API cho nền tảng chia sẻ tài nguyên học tập tại EAUT
                        </p>
                    </h1>
                    <a href="https://github.com/megait004/eaut-resource-sharing"
                       target="_blank"
                       class="text-[#f8f8f2] hover:text-[#ff79c6] transition-colors duration-200">
                        <i class="fab fa-github text-4xl"></i>
                    </a>
                </div>
                <div id="endpoints">
                    ' . $documentation . '
                </div>
            </div>
            <script>
                Prism.highlightAll();
            </script>
        </body>
        </html>';
        break;

    case '/api/docs/login.json':
        header(CONTENT_TYPE_JSON);
        echo file_get_contents(__DIR__ . '/docs/login.json');
        break;

    case '/api/docs/phpinfo.json':
        header(CONTENT_TYPE_JSON);
        echo file_get_contents(__DIR__ . '/docs/phpinfo.json');
        break;

    case '/api/login':
        require_once __DIR__ . '/login.php';
        break;

    case '/api/phpinfo':
        phpinfo();
        break;

    case '/api/register':
        require_once __DIR__ . '/register.php';
        break;

    case '/api/docs/register.json':
        header(CONTENT_TYPE_JSON);
        echo file_get_contents(__DIR__ . '/docs/register.json');
        break;

    default:
        header(CONTENT_TYPE_JSON);
        http_response_code(404);
        echo json_encode([
            'status' => false,
            'message' => 'Endpoint không tồn tại'
        ]);
        break;
}
