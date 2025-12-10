# Oráculo Documentation Structure

**Last Updated:** December 10, 2025

## 📚 Complete Documentation Set

The Oráculo project uses a **3-document structure** optimized for clarity and minimal redundancy:

### 1. README.md (17KB) - Primary Documentation
**Audience:** Developers, API users, new contributors

**Contains:**
- Quick start with `setup.sh` script
- Installation (automated & manual)
- All 7 API endpoints with request/response examples
- Environment variables
- Deployment (PM2, Docker, Nginx)
- Development commands
- Project structure
- Testing examples
- Philosophical context

**When to use:** Start here for everything - installation, API usage, deployment basics

---

### 2. API_ENDPOINTS.md (47KB) - Complete API Reference
**Audience:** API consumers, integration developers, AI/LLM agents

**Contains:**
- Detailed specifications for all 8 endpoints:
  1. Traditional I-Ching (`/api/reading`)
  2. Ifá Correspondences (`/api/ifa-reading`)
  3. Rune Reading (`/api/rune-reading`)
  4. Tarot Reading (`/api/tarot-reading`)
  5. Unified Oracle (`/api/unified-oracle`)
  6. AI-Optimized Oracle (`/api/ai-oracle`)
  7. Hexagram Lookup (`/api/hexagram/:id`)
  8. Health Check (`/api/health`)
- Full request/response schemas
- All parameters (required/optional)
- curl examples for each endpoint
- Error response formats
- CORS information
- Best practices

**When to use:** Need detailed API specifications, integration examples, or LLM consumption details

---

### 3. COMPREHENSIVE_DEPLOYMENT_GUIDE.md (30KB) - Production Guide
**Audience:** DevOps, system administrators, production deployers

**Contains:**
- MVP assessment & status
- Architecture overview
- Technology stack details
- Deployment instructions (multiple methods)
- Production readiness checklist
- Monitoring & maintenance
- Performance optimization
- Security considerations
- Scalability planning
- Troubleshooting
- Development roadmap

**When to use:** Deploying to production, scaling, monitoring, or long-term planning

---

## 🎯 Documentation Decision Tree

**I want to...**

- ✅ **Get started quickly** → README.md Quick Start
- ✅ **Install locally** → README.md Installation section
- ✅ **Use the API** → README.md API Endpoints (overview) or API_ENDPOINTS.md (detailed)
- ✅ **Integrate with my app** → API_ENDPOINTS.md
- ✅ **Build for AI/LLM** → API_ENDPOINTS.md (AI-Optimized Oracle section)
- ✅ **Deploy to production** → README.md Deployment section, then COMPREHENSIVE_DEPLOYMENT_GUIDE.md
- ✅ **Monitor in production** → COMPREHENSIVE_DEPLOYMENT_GUIDE.md
- ✅ **Understand the architecture** → COMPREHENSIVE_DEPLOYMENT_GUIDE.md
- ✅ **Contribute code** → README.md Development section
- ✅ **Report a bug** → Check README.md first, then open GitHub issue

---

## 🗂️ File Hierarchy

```
Documentation Priority:
1. README.md           ← Start here
2. API_ENDPOINTS.md    ← For API details
3. COMPREHENSIVE...md  ← For production deployment

Supporting Files:
- setup.sh             ← Automated installation
- .nvmrc               ← Node version (22.21.1)
- package.json         ← Dependencies & scripts
```

---

## 📝 What Was Removed

**Consolidated from 13+ files to 3 focused documents:**

❌ Removed (redundant):
- `INSTALLATION.md` → Merged into README.md
- `QUICK_REFERENCE.md` → Merged into README.md
- `SETUP_CHECKLIST.md` → Replaced by setup.sh + README.md
- `CONTRIBUTING.md` → Can be restored if open-sourcing
- `REVISION_SUMMARY.md` → No longer needed
- `API.md` → Replaced by README.md + API_ENDPOINTS.md
- `DEPLOYMENT_GUIDE.md` → Empty file, removed
- `PRODUCTION_API_DOCUMENTATION.md` → Merged into API_ENDPOINTS.md
- `PRODUCTION_READINESS.md` → Merged into COMPREHENSIVE_DEPLOYMENT_GUIDE.md

---

## 🔧 Maintenance Guidelines

**When updating documentation:**

1. **API changes** → Update README.md (quick examples) AND API_ENDPOINTS.md (full specs)
2. **New feature** → Update README.md overview, API_ENDPOINTS.md if it's an endpoint
3. **Deployment changes** → Update COMPREHENSIVE_DEPLOYMENT_GUIDE.md
4. **Quick start changes** → Update README.md and setup.sh
5. **Environment variables** → Update README.md Environment Variables section

**Keep it DRY:**
- Don't duplicate detailed API specs - reference API_ENDPOINTS.md from README.md
- Don't duplicate deployment details - reference COMPREHENSIVE_DEPLOYMENT_GUIDE.md from README.md
- Keep README.md focused on getting started and common tasks
- Keep specialized details in the specialized docs

---

## ✅ Quality Standards Met

- ✓ No redundant files
- ✓ Clear separation of concerns
- ✓ Logical information hierarchy
- ✓ Single source of truth for each topic
- ✓ Cross-referenced where needed
- ✓ Focused on API engine use case
- ✓ Port 4545 consistently documented
- ✓ Environment variables clearly explained
- ✓ setup.sh for automation

---

**Status:** Documentation structure optimized and consolidated ✨
