# Add Node.js to the current session's PATH
$env:Path = "C:\Program Files\nodejs;$env:Path"

Write-Host "Cleaning up old files..."
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

Write-Host "Installing dependencies..."
& "C:\Program Files\nodejs\npm.cmd" install

Write-Host "`nStarting development server..."
& "C:\Program Files\nodejs\npm.cmd" run dev 