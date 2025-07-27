# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Context Mechanics is a research framework for studying human-AI collaborative cognition. This is primarily a theoretical research project that emerged from practical AI collaboration work, focusing on understanding the fundamental dynamics of human-AI interaction.

## Commands

### Chat Parser Tool
Convert Claude.ai chat transcripts to markdown format:
```bash
python3 src/chat_parser.py <input_file> <output_file> [-t <title>]
```

Expected transcript format:
- Human messages start first
- Human to AI transition: 1 blank line + "Edit" line
- AI to Human transition: 4 blank lines

## Architecture Overview

### Repository Structure
- **docs/**: Core research documentation organized by topic
  - `foundation/`: Theoretical frameworks and core principles
  - `protocols/`: Formal interaction protocols (notably TARP - Tool Approval/Refusal Protocol)
  - `reports/`: AI-generated research reports in PDF and markdown
  - `research/`: Active research questions and directions
- **transcripts-and-artifacts/**: Individual research session documentation
- **src/**: Python tool for transcript processing (no external dependencies)

### Key Concepts

**Context Mechanics vs Context Engineering**: This project studies fundamental dynamics rather than applying known principles. It's about understanding how collaboration works at a theoretical level, not prescribing how it should work.

**TARP (Tool Approval/Refusal Protocol)**: A formal protocol that creates structured observation points in human-AI collaboration, documented in `docs/protocols/TARP/`.

**Self-Referential Research**: The project studies human-AI collaboration while actively using it as its primary research method.

## Development Guidelines

When working in this repository:
1. This is a research project, not a software development project - prioritize documentation clarity
2. The Python tool uses only standard library - maintain this simplicity
3. Preserve existing transcript formats for consistency across research sessions
4. Focus on theoretical insights rather than technical implementation details