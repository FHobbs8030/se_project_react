$API = "http://127.0.0.1:3001"
$JWT = $env:JWT

if (-not $JWT) { Write-Error "Missing JWT. Set `$env:JWT first."; exit 1 }

$items = @(
  @{ name="T-Shirt";      weather="warm"; imageUrl="/images/clothes/T-shirt.png" }
  @{ name="Shorts";       weather="hot";  imageUrl="/images/clothes/shorts.png" }
  @{ name="Cap";          weather="hot";  imageUrl="/images/clothes/cap.png" }
  @{ name="Sneakers";     weather="warm"; imageUrl="/images/clothes/sneakers.png" }
  @{ name="Jeans";        weather="warm"; imageUrl="/images/clothes/jeans.png" }
  @{ name="Sweatshirt";   weather="cold"; imageUrl="/images/clothes/sweatshirt.png" }
  @{ name="Coat";         weather="cold"; imageUrl="/images/clothes/coat.png" }
  @{ name="Beanie";       weather="cold"; imageUrl="/images/clothes/beanie.png" }
  @{ name="Puffy Jacket"; weather="cold"; imageUrl="/images/clothes/puffy_jacket.png" }
  @{ name="Scarf";        weather="cold"; imageUrl="/images/clothes/scarf.png" }
  @{ name="Sandals";      weather="hot";  imageUrl="/images/clothes/sandals.png" }
  @{ name="Loafers";      weather="hot";  imageUrl="/images/clothes/loafers.png" }
)

$rows = New-Object System.Collections.Generic.List[object]

foreach ($item in $items) {
  $body = $item | ConvertTo-Json -Depth 4
  $status = $null; $ok = $false
  try {
    $resp = Invoke-RestMethod -Method Post `
                              -Uri "$API/items" `
                              -Headers @{ Authorization = "Bearer $JWT" } `
                              -ContentType "application/json" `
                              -Body $body
    $status = 201; $ok = $true
  }
  catch {
    $status = try { $_.Exception.Response.StatusCode.Value__ } catch { "ERR" }
    $ok = $false
  }
  $rows.Add([pscustomobject]@{ Name=$item.name; Status=$status; Ok=$ok })
}

$rows | Format-Table -Auto
