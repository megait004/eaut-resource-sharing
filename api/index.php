<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/components/layout.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if (preg_match('/\.(css|js|png|jpg|jpeg|gif)$/', $uri, $matches)) {
    $file_path = __DIR__ . $uri;
    if (file_exists($file_path)) {
        $content_types = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif'
        ];

        $extension = $matches[1];
        header('Content-Type: ' . $content_types[$extension]);
        readfile($file_path);
        exit();
    }
}

try {
    switch ($uri) {
        case '/test':
            phpinfo();
            break;
        // case '/meo':
        //     ob_start();
        //     include_once 'meo/index.php';
        //     $content = ob_get_clean();
        //     echo renderLayout('Trang chu', $content);
        //     break;

        case '/':
            ob_start();
            ?>
            <div class="text-center">
                <h1 class="text-4xl font-bold">Hello World</h1>
                <a href="/test" class="text-blue-500 hover:underline">test php</a>
            </div>
            <?php
            $content = ob_get_clean();
            echo renderLayout('Home', $content);
            break;

        default:
            header('Content-Type: application/json');
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            break;
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}