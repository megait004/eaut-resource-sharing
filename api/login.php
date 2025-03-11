<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config/database.php';

function sendResponse($status, $data = null, $message = null, $code = 200) {
    http_response_code($code);
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'WTF! Chỉ xài POST thôi', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    sendResponse(false, null, 'VCL điền thiếu kìa!', 400);
}

try {
    $db = getDB();
    $stmt = $db->prepare("SELECT email, password, full_name, role FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        sendResponse(false, null, 'WTF sai hết rồi!', 401);
    }
    unset($user['password']);
    sendResponse(
        true,
        ['user' => $user],
        'Đăng nhập thành công',
        200
    );

} catch (PDOException $e) {
    sendResponse(false, null, 'VL server sập!', 500);
}
