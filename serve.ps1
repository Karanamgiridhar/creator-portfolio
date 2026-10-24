if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "[Server] Launching Python Multi-Threaded Streaming Server..."
    python "$PSScriptRoot\serve.py"
    exit
}

$port = 8080
# Use port 8080 to ensure clean fresh listener without conflicts
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")
$listener.Start()
Write-Host "[PowerShell Server] Serving GiriEditsZone on http://localhost:$port"

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
    ".mp4"  = "video/mp4"
    ".mov"  = "video/quicktime"
    ".heic" = "image/heic"
}

function Resolve-StaticFile($rootDir, $requestPath) {
    $parts = $requestPath.TrimStart('/').Split('/\\') | Where-Object { $_ -ne '' }
    $current = $rootDir
    foreach ($part in $parts) {
        $matched = Get-ChildItem -LiteralPath $current | Where-Object { $_.Name -eq $part -or $_.Name.Trim() -eq $part } | Select-Object -First 1
        if ($matched) {
            $current = $matched.FullName
        } else {
            return $null
        }
    }
    if (Test-Path -LiteralPath $current -PathType Leaf) {
        return $current
    }
    return $null
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        
        $rawPath = [System.Net.WebUtility]::UrlDecode($request.Url.AbsolutePath)
        if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
            $rawPath = "/index.html"
        }
        
        $targetFile = Resolve-StaticFile $PSScriptRoot $rawPath
        
        if ($targetFile) {
            $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
            if ($mime.ContainsKey($ext)) {
                $response.ContentType = $mime[$ext]
            } else {
                $response.ContentType = "application/octet-stream"
            }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($targetFile)
            $response.ContentLength64 = $fileBytes.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found: $rawPath")
            $response.ContentLength64 = $buffer.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        }
        $response.OutputStream.Close()
    } catch {
        # continue on client disconnect
    }
}
