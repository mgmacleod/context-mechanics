# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Context Mechanics is a research framework for studying human-AI collaborative cognition. This repository contains:
- Theoretical documentation and research transcripts
- A Python tool for parsing chat transcripts from Claude.ai conversations

## Commands

### Running the Chat Parser
```bash
python3 src/chat_parser.py <input_file> <output_file> [-t <title>]
```

The parser converts Claude.ai chat transcripts to markdown format. Expected input format:
- Human messages start first
- Human to AI transition: 1 blank line + "Edit" line
- AI to Human transition: 4 blank lines

## Architecture Overview

### Repository Structure
- **docs/**: Core research documentation
  - `bootstrap-context/`: Insights on context engineering approaches
  - `foundation/`: Theoretical frameworks and principles
  - `metaphors-and-guideposts/`: Biological and philosophical grounding
  - `protocols/`: Formal interaction protocols (e.g., TARP)
- **logs/**: Research session transcripts and retrospectives
- **src/**: Python tools for processing research artifacts

### Key Concepts

**Context Mechanics vs Context Engineering**: This project studies fundamental dynamics (mechanics) rather than applying known principles (engineering). Focus is on understanding how human-AI collaboration actually works at a theoretical level.

**Tool Approval/Refusal Protocol (TARP)**: A formal protocol in `docs/protocols/TARP/` that creates structured observation points in human-AI collaboration.

**AI Perspectivism**: Using AI's different analytical capabilities to study collaborative dynamics from multiple angles without requiring claims about consciousness.

## Research Guidelines

When working on this codebase:
1. Maintain distinction between theoretical research (docs/) and practical tools (src/)
2. Preserve existing transcript formats for consistency
3. Follow the biological grounding approach - use established patterns from nature rather than inventing new theoretical frameworks
4. Document integrative insights that emerge from human-AI collaboration itself

## Python Development

The codebase uses standard Python 3 with no external dependencies for the chat parser. When extending tools:
- Keep dependencies minimal
- Focus on research support rather than production features
- Maintain clear documentation of expected input/output formats