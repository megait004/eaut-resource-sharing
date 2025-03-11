<?php
function renderRequestBody($data)
{
    if (empty($data['requestBody'])) {
        return '';
    }
    return sprintf('
        <div class="mt-4">
            <h4 class="text-lg font-bold mb-2 text-[#f8f8f2]">Request Body:</h4>
            <div class="bg-[#282a36] rounded-lg p-4 border-2 border-[#6272a4]">
                <pre class="line-numbers"><code class="language-json">%s</code></pre>
            </div>
        </div>',
        json_encode($data['requestBody'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}

function renderResponses($data)
{
    if (empty($data['responses'])) {
        return '';
    }
    $html = '<h4 class="text-lg font-bold mt-6 mb-2 text-[#f8f8f2]">Responses:</h4>';
    foreach ($data['responses'] as $code => $response) {
        $html .= sprintf('
            <div class="mb-4">
                <h5 class="mb-2"><span class="bg-[#44475a] text-[#f8f8f2] px-3 py-1 rounded-lg text-sm">%s</span> <span class="text-[#f8f8f2] ml-2">%s</span></h5>
                <pre class="line-numbers"><code class="language-json">%s</code></pre>
            </div>',
            $code,
            $response['description'],
            json_encode($response['content'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
    return $html;
}

function renderValidations($data)
{
    if (empty($data['validations'])) {
        return '';
    }
    $html = '
        <div class="mt-6">
            <h4 class="text-lg font-bold mb-2 text-[#f8f8f2]">Validation Rules:</h4>
            <div class="overflow-x-auto">
                <table class="w-full border-2 border-[#6272a4] rounded-lg overflow-hidden">
                    <tr>
                        <th class="px-6 py-3 border-b-2 border-[#6272a4] text-left bg-[#44475a] text-[#f8f8f2]">Field</th>
                        <th class="px-6 py-3 border-b-2 border-[#6272a4] text-left bg-[#44475a] text-[#f8f8f2]">Type</th>
                        <th class="px-6 py-3 border-b-2 border-[#6272a4] text-left bg-[#44475a] text-[#f8f8f2]">Required</th>
                        <th class="px-6 py-3 border-b-2 border-[#6272a4] text-left bg-[#44475a] text-[#f8f8f2]">Additional</th>
                    </tr>';

    foreach ($data['validations'] as $rule) {
        $html .= sprintf('
            <tr class="border-b border-[#6272a4] hover:bg-[#44475a] text-[#f8f8f2]">
                <td class="px-6 py-3">%s</td>
                <td class="px-6 py-3">%s</td>
                <td class="px-6 py-3">%s</td>
                <td class="px-6 py-3">%s</td>
            </tr>',
            $rule['field'],
            $rule['type'],
            $rule['required'] ? 'Yes' : 'No',
            $rule['format'] ?? $rule['minLength'] ?? ''
        );
    }

    return $html . '</table></div></div>';
}

function renderNotes($data)
{
    if (empty($data['notes'])) {
        return '';
    }
    $notes = array_map(function ($note) {
        return sprintf('<li class="mb-2 last:mb-0 text-[#f8f8f2]">%s</li>', $note);
    }, $data['notes']);

    return sprintf('
        <div class="mt-6 border-2 border-[#6272a4] p-6 rounded-lg bg-[#44475a]">
            <h4 class="text-lg font-bold mb-3 text-[#f8f8f2]">Notes:</h4>
            <ul class="list-disc pl-5 space-y-1">%s</ul>
        </div>',
        implode('', $notes)
    );
}

function renderEndpoint($data)
{
    $pathHtml = !empty($data['link'])
        ? sprintf(
            '<a href="%s" target="%s" class="ml-3 font-mono hover:underline text-[#8be9fd]">%s</a>',
            $data['link'],
            $data['target'],
            $data['path']
        )
        : sprintf('<span class="ml-3 font-mono text-[#f8f8f2]">%s</span>', $data['path']);

    return sprintf('
        <div class="bg-[#44475a] border-2 border-[#6272a4] p-8 rounded-lg mb-8">
            <h3 class="flex items-center text-lg">
                <span class="bg-[#6272a4] text-[#f8f8f2] px-4 py-2 rounded-lg font-bold">%s</span>
                %s
            </h3>
            <p class="mt-4 text-lg text-[#f8f8f2]">%s</p>
            %s
            %s
            %s
            %s
        </div>',
        $data['method'],
        $pathHtml,
        $data['description'],
        renderRequestBody($data),
        renderResponses($data),
        renderValidations($data),
        renderNotes($data)
    );
}
