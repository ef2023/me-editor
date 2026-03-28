# Análise do Projeto — me-editor

_Data da análise: 2026-03-28 (UTC)_

## Visão geral

- Monorepo com `pnpm` e workspaces (`apps/*`, `packages/*`).
- Duas aplicações principais:
  - `apps/web`: front-end editorial em Next.js 16 (App Router, TypeScript, Sass).
  - `apps/studio`: CMS com Sanity Studio 5.
- Foco em conteúdo bíblico/editorial com páginas estáticas, rotas dinâmicas de categorias/autores/artigos e integração com newsletter.

## Pontos fortes

1. **Arquitetura separada (Web + CMS)**
   - Boa divisão entre experiência pública (`apps/web`) e operação de conteúdo (`apps/studio`).
2. **Base moderna de stack**
   - Next.js 16, React 19 e TypeScript com scripts claros para lint/build/typecheck.
3. **Modelagem editorial consistente**
   - Tipos e consultas do Sanity bem estruturados para categorias, autores e posts.
4. **Preocupação com consentimento**
   - Banner de cookies e configuração explícita de consentimento para analytics.

## Achados críticos (prioridade alta)

### 1) Segredos/versionamento sensível em código

No arquivo `apps/web/src/lib/sanity/env.ts` existem valores padrão de segredo/token (`viewerToken` e `revalidateSecret`) hardcoded.

**Riscos:**
- Exposição de credenciais no repositório.
- Uso acidental em produção.
- Dificulta rotação/auditoria de segredos.

**Recomendação imediata:**
- Remover defaults sensíveis do código.
- Exigir variáveis de ambiente em runtime.
- Rotacionar os segredos atualmente versionados.

---

### 2) Qualidade de build parcialmente quebrada em `apps/web`

Status dos checks executados:

- `pnpm lint:web` ❌
  - 1 erro (`react-hooks/set-state-in-effect`) em `cookie-consent-banner.tsx`.
  - 3 warnings de variáveis não utilizadas.
- `pnpm typecheck:web` ❌
  - Conflito de tipo em `window.dataLayer` no `tracked-link.tsx`.
- `pnpm typecheck:studio` ✅

**Recomendação imediata:**
- Corrigir erro de hook para estabilizar lint.
- Unificar tipagem global de `window.dataLayer` em um único tipo compartilhado.
- Tratar warnings restantes para evitar dívida técnica incremental.

## Achados importantes (prioridade média)

### 3) Fonte de conteúdo dual (mock local + Sanity)

A camada de conteúdo combina dados locais (`content.ts`) com fallback/integração via Sanity (`content-source.ts`). Isso é útil para bootstrap, mas aumenta a complexidade de manutenção.

**Riscos:**
- Divergência entre conteúdo local e CMS.
- Lógica duplicada de transformação/consulta.

**Recomendação:**
- Definir política explícita: modo desenvolvimento local vs produção CMS.
- Documentar o fluxo de fallback para reduzir ambiguidade.

### 4) Ausência de suíte de testes automatizados

Não há scripts de teste de unidade/integrados no `package.json` raiz nem nos apps.

**Recomendação:**
- Introduzir ao menos:
  - testes unitários para funções de conteúdo/SEO;
  - smoke tests de rotas críticas;
  - checks CI obrigatórios para lint/typecheck/build.

## Oportunidades de melhoria (prioridade baixa)

1. **Observabilidade:** padronizar logs de erros de newsletter e integrações externas.
2. **Segurança de runtime:** validar variáveis de ambiente em bootstrap com schema.
3. **Documentação:** adicionar README com setup, variáveis obrigatórias e fluxo editorial.
4. **Governança de qualidade:** bloquear merge com lint/typecheck quebrados via CI.

## Plano sugerido (2 semanas)

### Semana 1 — Estabilização
- [ ] Remover segredos hardcoded + rotacionar credenciais.
- [ ] Corrigir lint/typecheck do `apps/web`.
- [ ] Adicionar validação de env com falha explícita no boot.

### Semana 2 — Confiabilidade
- [ ] Adicionar testes unitários mínimos.
- [ ] Criar pipeline CI (`lint`, `typecheck`, `build`).
- [ ] Documentar arquitetura e runbook no README.

## Comandos usados na análise

```bash
pnpm lint:web
pnpm typecheck:web
pnpm typecheck:studio
```

