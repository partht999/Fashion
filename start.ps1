Write-Host "Installing dependencies..."
& "C:\Program Files\nodejs\npm.cmd" install

Write-Host "`nStarting development server..."
& "C:\Program Files\nodejs\npx.cmd" next dev 