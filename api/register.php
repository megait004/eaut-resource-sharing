<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config/database.php';

function sendResponse($status, $data = null, $message = null, $code = 200)
{
    http_response_code($code);
    echo json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'Chỉ chấp nhận phương thức POST!', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$fullName = $data['full_name'] ?? null;
$role = $data['role'] ?? '';

if (empty($email) || empty($password) || empty($role)) {
    sendResponse(false, null, 'Vui lòng điền đầy đủ thông tin!', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, null, 'Email không hợp lệ!', 400);
}

if (!in_array($role, ['teacher', 'student'])) {
    sendResponse(false, null, 'Vai trò không hợp lệ!', 400);
}

try {
    $db = getDB();

    $stmt = $db->prepare("SELECT email FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        sendResponse(false, null, 'Email đã được sử dụng!', 400);
    }

    $stmt = $db->prepare("INSERT INTO users (email, password, full_name, role) VALUES (?, ?, ?, ?)");
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt->execute([$email, $hashedPassword, $fullName, $role]);

    sendResponse(
        true,
        [
            'user' => [
                'email' => $email,
                'full_name' => $fullName,
                'role' => $role
            ]
        ],
        'Đăng ký thành công!',
        201
    );
} catch (PDOException $e) {
    sendResponse(false, null, 'Lỗi server!', 500);
}
