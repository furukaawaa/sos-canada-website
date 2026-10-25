# 🤝 Guia de Contribuição

## Para subir este repo no GitHub

```bash
# 1. Crie o repositório no GitHub (github.com/new)
#    Nome sugerido: sos-canada-mundo-dos-vistos
#    NÃO marque "Initialize with README"

# 2. Conecte o repositório local ao remoto
git remote add origin https://github.com/SEU-USUARIO/sos-canada-mundo-dos-vistos.git

# 3. Suba o código
git branch -M main
git push -u origin main
```

## Convenções de commit

Usamos commits semânticos:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação (sem mudança de lógica)
- `refactor:` refatoração
- `perf:` performance
- `chore:` tarefas de manutenção

Exemplos:
```
feat: add payment integration
fix: correct date format on dashboard
docs: update API endpoints in README
```

## Workflow

1. Crie uma branch: `git checkout -b feat/minha-feature`
2. Faça seus commits
3. Abra um Pull Request
4. Aguarde review e merge

## Setup para novos devs

Ver [README.md](README.md#-quick-start)
