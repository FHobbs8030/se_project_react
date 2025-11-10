param(
  [string]$Root = "src"
)

$errors = @()

function Section($title){ Write-Host "`n=== $title ===" -ForegroundColor Cyan }

function Check($title, $path, $pattern, [switch]$CaseSensitive=$false) {
  Section $title
  $params = @{ Path = $path; Pattern = $pattern; ErrorAction = 'SilentlyContinue' }
  if ($CaseSensitive) { $params.Add('CaseSensitive', $true) }
  $hits = Select-String @params
  if ($hits) {
    $hits | ForEach-Object {
      $msg = "$($_.Path):$($_.LineNumber): $($_.Line.Trim())"
      Write-Host $msg -ForegroundColor Yellow
      $script:errors += "$title -> $msg"
    }
  } else {
    Write-Host "✔ None found" -ForegroundColor Green
  }
}

Check "Contexts rendered as elements (should be .Provider)" `
  "$Root/**/*.jsx" `
  '<(CurrentUserContext|CurrentTemperatureUnitContext|WeatherContext)(\s|>)' -CaseSensitive

Check "Wrong router imports (must use react-router-dom)" `
  "$Root/**/*.*" `
  'from\s+["'']react-router["'']'

Check "Components exporting an object (invalid to render)" `
  "$Root/components/**/*.jsx" `
  'export\s+default\s+\{'

Check "UI still importing contexts (we pass via Layout/outletContext)" `
  @("$Root/components/**/*.jsx","$Root/pages/**/*.jsx","$Root/routes/**/*.jsx") `
  'from\s+["'']\.\.\/contexts\/'

Check "ToggleSwitch missing required props" `
  "$Root/**/*.jsx" `
  '<ToggleSwitch(?![^>]*\bvalue=)(?![^>]*\bonToggle=)[^>]*>'

Check "Stray /signout calls" `
  "$Root/**/*.js" `
  '\/signout'

Write-Host "`n=== Summary ==="
if ($errors.Count -gt 0) {
  $errors | Out-File -Encoding utf8 -FilePath ".\sprint14_sanity_report.txt"
  Write-Host ("Found {0} issues. See sprint14_sanity_report.txt" -f $errors.Count) -ForegroundColor Red
  exit 1
} else {
  Write-Host "All clear." -ForegroundColor Green
  exit 0
}
