# FAQ rápido — leitura de diff e volta para versão anterior

## O que significam `+3 -33` (verde/vermelho)?

- `+3` (verde): **3 linhas adicionadas** no arquivo.
- `-33` (vermelho): **33 linhas removidas** do arquivo.

Isso **não quer dizer necessariamente piora**: muitas vezes remover linhas elimina código duplicado, bugado ou não usado.

## Verde e vermelho no GitHub/Git

- **Verde** = linha nova no resultado final.
- **Vermelho** = linha que existia antes e foi retirada.

O diff sempre compara:

- base (estado antigo) **vs**
- head (estado novo)

## Preciso criar PR para voltar à versão original?

Depende do cenário:

1. **Se você está sozinho e ainda não publicou**
   - Pode usar `git reset --hard <commit_antigo>` localmente (com cuidado).

2. **Se já publicou/compartilhou a branch**
   - Melhor prática: criar um novo commit de reversão com:
     - `git revert <commit>`
   - E abrir PR desse revert (fluxo auditável e seguro para equipe).

3. **Se a mudança já está em `main`**
   - Recomendado: PR de revert (evita reescrever histórico público).

## Clicar em "Criar PR" altera meu Git/localhost?

**Resumo curto:** criar PR **não altera automaticamente seu localhost**.

- Quando você clica em **Criar PR**, você só publica uma proposta de merge no remoto (ex.: GitHub).
- Seu código local só muda se você rodar comandos como:
  - `git pull`
  - `git merge`
  - `git rebase`
  - `git reset`

O que pode mudar com o PR:
- estado no remoto (branch/PR/comentários/checks);
- pipelines de CI podem rodar no servidor.

O que **não** muda por si só:
- arquivos do seu `localhost`;
- banco local;
- app rodando na sua máquina.

## Fluxo seguro recomendado

1. Identificar o commit que você quer desfazer (`git log --oneline`).
2. Rodar `git revert <hash_do_commit>`.
3. Executar lint/testes.
4. Abrir PR com contexto: "Revertendo X por Y".

## Comandos úteis

```bash
git log --oneline --decorate -n 20
git show <hash>
git revert <hash>
```
