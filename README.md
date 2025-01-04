# Yandex Alpha

An AI Agent system designed to improve Yandex's search engine capabilities through automated website grading and analysis.

## Project Structure

```
src/
├── agents/                 # AI Agents implementations
│   └── grading-agent/     # Website grading specific agent
├── tools/                 # Custom tools
│   └── website-content/   # Firecrawl integration tool
├── rag/                   # RAG system implementation
│   ├── documents/         # Raw instruction documents
│   └── embeddings/        # Embedded documents and utils
├── config/               # Configuration files
└── utils/               # Helper functions
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Add your API keys for:
  - Langbase
  - LLM
  - Firecrawl

## Features

- Website grading based on search queries
- RAG system for instruction processing
- Integration with Firecrawl for website content analysis
- Langbase SDK integration for AI Agent pipeline

## Development

```bash
npm run dev     # Start development server
npm run test    # Run tests
``` 