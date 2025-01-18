<?php
function renderLayout($title, $content)
{
    ob_start();
?>
<!DOCTYPE html>
<html lang="vi" class="h-full">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title) ?> - EAUT Resource Sharing</title>
    <link rel="stylesheet" href="assets/style/style.css">
</head>

<body class="min-h-full bg-gray-100">
    <header class="bg-white shadow">
        <?php include_once __DIR__ . '/header.php'; ?>
    </header>
    <main class="container mx-auto px-4 py-8">
        <?= $content ?>
    </main>
    <footer class="bg-white shadow mt-auto">
        <?php include_once __DIR__ . '/footer.php'; ?>
    </footer>
</body>
</html>
<?php
    return ob_get_clean();
}
?>
