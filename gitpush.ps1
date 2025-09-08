param (
    [string]$mensagem
)

if (-not $mensagem) {
    $mensagem = Read-Host "Digite a mensagem do commit"
}

Write-Host "➡️ Adicionando arquivos..."
git add .

Write-Host "➡️ Fazendo commit: $mensagem"
git commit -m "$mensagem"

Write-Host "➡️ Enviando para o GitHub..."
git push

Write-Host "✅ Processo concluído!"
