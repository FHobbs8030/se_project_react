param(
  [string]$Root = "src"
)

Write-Host "Scanning imports/exports..." -ForegroundColor Cyan

$importRegex = '^\s*import\s+(?<what>[\s\S]+?)\s+from\s+["''](?<path>\.[^"'']+)["''];?\s*$'
$namedDefaultRegex = 'export\s+default\s+function\s+|export\s+default\s*\('
$namedOnlyRegex    = 'export\s+(function|const|class)\s+([A-Za-z0-9_]+)\s*\('
$defaultOnlyRegex  = 'export\s+default\s+'
$exportObjectRegex = 'export\s+default\s+\{'
$issues = @()

function Get-File([string]$base, [string]$rel){
  $p1 = Join-Path $base "$rel"
  $candidates = @($p1, "$p1.jsx", "$p1.js", "$p1/index.jsx", "$p1/index.js")
  foreach($c in $candidates){ if(Test-Path $c){ return (Resolve-Path $c).Path } }
  return $null
}

$jsxFiles = Get-ChildItem -Path $Root -Recurse -Include *.jsx,*.js | Where-Object { $_.FullName -notmatch '\\node_modules\\' }
foreach($f in $jsxFiles){
  $lines = Get-Content $f.FullName
  foreach($line in $lines){
    if($line -match $importRegex){
      $what = $Matches['what'].Trim()
      $rel  = $Matches['path'].Trim()
      if($rel -notlike './*' -and $rel -notlike '../*'){ continue } # skip library imports

      $target = Get-File (Split-Path $f.FullName) $rel
      if(-not $target){
        $issues += "Missing file: $($f.FullName) imports $rel"
        continue
      }

      $targetText = (Get-Content $target -Raw)
      $hasDefault = ($targetText -match $defaultOnlyRegex)
      $hasNamedOnly = ($targetText -match $namedOnlyRegex) -and -not $hasDefault
      $exportsObject = ($targetText -match $exportObjectRegex)

      $usesDefaultStyle = $what -match '^[A-Za-z0-9_\$]+'  # import Foo from './Foo'
      $usesNamedStyle   = $what -match '^{[\s\S]*}$'       # import { Foo } from './Foo'
      $usesNamespace    = $what -match '^\*\s+as\s+'       # import * as Foo from './Foo'

      if($exportsObject){
        $issues += "Invalid component export (object): $target"
      }

      if($usesDefaultStyle -and -not $hasDefault){
        $issues += "Import wants DEFAULT but target has no default: $($f.FullName) -> $rel ($target)"
      }
      if($usesNamedStyle -and $hasDefault -and -not $hasNamedOnly){
        $issues += "Import wants NAMED but target is default-only: $($f.FullName) -> $rel ($target)"
      }
      if($usesNamespace){
        # namespace is rare for components; warn if file looks like a component
        if($target -match '\\components\\'){
          $issues += "Suspicious namespace import for component: $($f.FullName) -> $rel ($target)"
        }
      }
    }
  }
}

if($issues.Count){
  $issues | Set-Content .\import_export_report.txt
  Write-Host "Found $($issues.Count) problems. See import_export_report.txt" -ForegroundColor Yellow
  exit 1
} else {
  Write-Host "All clear on imports/exports." -ForegroundColor Green
  exit 0
}
