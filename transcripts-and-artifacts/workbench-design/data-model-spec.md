# Context Mechanics Research Data Model Specification

**Version**: 1.0  
**Purpose**: Define the data structures, file formats, and organization for Context Mechanics research sessions  
**Target**: VSCode Extension Implementation

## File Structure

### Session Organization
```
research-sessions/
├── YYYY-MM-DD_session-slug/
│   ├── session.md              # Main transcript
│   ├── notes.md               # Research notes with message links
│   ├── metadata.json          # Session configuration and timestamps
│   ├── planning.md            # Session planning notes (optional)
│   └── artifacts/            # Generated files, exports, media
│       ├── exports/          # Analysis exports, reports
│       ├── files/            # Files created during session
│       └── media/            # Screenshots, diagrams, etc.
└── templates/
    ├── session-templates/     # Session planning templates
    └── note-templates/        # Quick note templates
```

### Naming Conventions
- **Session folders**: `YYYY-MM-DD_descriptive-slug` (e.g., `2025-01-27_context-health-exploration`)
- **Multi-day sessions**: Use start date, update metadata with actual duration
- **Duplicated conversations**: `YYYY-MM-DD_original-slug_branch-description`

## Core Data Formats

### Session Transcript (session.md)

```markdown
# Session: [Session Title]

**Protocol**: [Protocol Name or "Ad-hoc"]  
**Started**: 2025-01-27 14:30:15 UTC  
**Last Updated**: 2025-01-27 16:45:22 UTC  
**Status**: Active | Completed | Suspended  
**Objective**: [Research objective]  

## Session Context
- **Files Referenced**: List of @file references used
- **Tools Configured**: MCP tools, providers, etc.
- **Background**: Relevant prior work or context

---

## Exchange 1
**Timestamp**: 2025-01-27 14:30:15  
**Exchange ID**: `ex001`

### Human Message
[Message content in markdown]

**File References**: 
- @docs/protocols/TARP.md
- @research-sessions/2025-01-25_baseline/session.md

**Tools Used**: None

### AI Response  
**Timestamp**: 2025-01-27 14:30:45  
**Provider**: claude-3-5-sonnet-20241022  
**Tokens**: 1,234 input / 567 output

[Response content]

**Tools Used**:
- search_files("context health")
- create_file("analysis.md")

**Intervention Points**: 
- TARP approval at 14:30:52 (approved)

---

## Exchange 2
[Continue pattern...]

## Session Summary
[End-of-session summary when completed]
```

### Research Notes (notes.md)

```markdown
# Research Notes: [Session Title]

**Session**: `2025-01-27_context-health-exploration`  
**Researcher**: [Name]  
**Date Range**: 2025-01-27 to 2025-01-28

## Session-Level Notes

### Objectives & Hypotheses
- Testing new context pollution detection methods
- Hypothesis: Current metrics miss subtle degradation patterns

### External Context
- **Researcher State**: Well-rested, focused session
- **Environment**: Quiet office, no interruptions
- **Prior Context**: Following up on findings from 2025-01-25 session

---

## Exchange-Linked Notes

### Exchange 1 (`ex001`) - 2025-01-27 14:30:15
**Decision Point**: Chose systematic approach over intuitive assessment  
**Reasoning**: Want to establish baseline for comparison  
**Observation**: AI immediately focused on methodical analysis - good sign for protocol adherence  
**Tags**: #methodology #baseline #protocol-adherence

### Exchange 2 (`ex002`) - 2025-01-27 14:35:22
**Unexpected Result**: Context pollution metric triggered false positive  
**Investigation Needed**: Review metric calibration  
**Pattern**: Similar to issue noted in session 2025-01-20  
**Tags**: #metrics #false-positive #cross-session-pattern

### Exchange 5 (`ex005`) - 2025-01-27 15:12:08
**TARP Decision**: Refused tool call to redirect toward business context  
**Outcome**: Led to breakthrough insight about user mental models  
**Meta-observation**: TARP working as intended for strategic guidance  
**Tags**: #tarp #intervention #breakthrough

---

## Patterns & Insights

### Emerging Patterns
- Context health checks revealing consistent blind spots
- AI tends toward technical solutions, human guidance needed for business context
- TARP interventions most valuable at conceptual transition points

### Questions for Follow-up
- Can we automate the false positive detection?
- What makes certain TARP interventions more effective?
- How do context pollution patterns relate to session objectives?

### Cross-Session Connections
- Links to `2025-01-25_baseline`: Similar metric issues
- Links to `2025-01-20_validation`: Pattern confirmation

## Session Outcome
**Status**: Objectives partially met  
**Key Findings**: [Summary of main discoveries]  
**Next Steps**: [Planned follow-up work]
```

### Session Metadata (metadata.json)

```json
{
  "session": {
    "id": "2025-01-27_context-health-exploration",
    "title": "Context Health Exploration",
    "protocol": "Context Health Check",
    "created": "2025-01-27T14:30:15Z",
    "lastUpdated": "2025-01-27T16:45:22Z",
    "status": "completed",
    "duration": {
      "started": "2025-01-27T14:30:15Z",
      "ended": "2025-01-27T16:45:22Z",
      "totalMinutes": 135,
      "activeMinutes": 127
    }
  },
  "configuration": {
    "provider": "claude-3-5-sonnet-20241022",
    "tools": ["mcp-filesystem", "mcp-git"],
    "fileReferences": [
      "@docs/protocols/TARP.md",
      "@research-sessions/2025-01-25_baseline/session.md"
    ],
    "templateUsed": "context-health-check"
  },
  "researcher": {
    "name": "[Researcher Name]",
    "timezone": "America/New_York"
  },
  "metrics": {
    "totalExchanges": 12,
    "humanMessages": 12,
    "aiMessages": 12,
    "tarpInterventions": 3,
    "tarpApprovals": 7,
    "tarpRefusals": 3,
    "tokenUsage": {
      "input": 15420,
      "output": 8936
    },
    "toolCalls": 15,
    "filesCreated": 2,
    "filesModified": 4
  },
  "outcomes": {
    "objectivesMet": "partial",
    "keyFindings": [
      "Context pollution metrics need recalibration",
      "TARP most effective at conceptual transitions"
    ],
    "artifactsGenerated": [
      "artifacts/exports/context-analysis.md",
      "artifacts/files/improved-metrics.py"
    ]
  },
  "relationships": {
    "parentSession": null,
    "childSessions": [],
    "relatedSessions": [
      "2025-01-25_baseline",
      "2025-01-20_validation"
    ],
    "duplicatedFrom": null,
    "duplicatedAt": null
  }
}
```

## Conversation Duplication

### Duplication Workflow
1. User selects "Duplicate from this point" on any exchange
2. System creates new session folder with naming convention: `original-slug_branch-description`
3. Copies transcript up to duplication point
4. Updates metadata to reflect relationship
5. New conversation continues from that point

### Duplication Metadata
```json
{
  "relationships": {
    "duplicatedFrom": "2025-01-27_context-health-exploration",
    "duplicatedAt": "ex005",
    "duplicatedTimestamp": "2025-01-27T15:12:08Z",
    "branchDescription": "alternative-approach"
  }
}
```

## Integration Requirements

### Git Integration
- All session files tracked in git
- Automatic commits at session completion
- Commit messages: "Research session: [session-title]"
- .gitignore excludes temporary files only

### VSCode Workspace Integration
- Sessions appear in Explorer as workspace folders
- Quick navigation between related sessions
- File references (@file) work across session boundaries

### Export Formats
- **Academic**: LaTeX-compatible format for papers
- **Analysis**: CSV/JSON for quantitative analysis
- **Presentation**: Cleaned markdown for sharing
- **Archive**: Complete session bundle with metadata

## Validation Rules

### File Integrity
- All timestamps must be valid ISO 8601 format
- Exchange IDs must be unique within session
- File references must be valid paths
- Tool call records must match actual tool usage

### Consistency Checks
- Metadata metrics must match transcript content
- Note references must link to valid exchanges
- Session duration must match timestamp ranges
- Related session links must be bidirectional

## Future Extensions

### Planned Enhancements
- **Multi-researcher sessions**: Support for collaborative research
- **Video/audio integration**: Timestamps for recorded sessions
- **Automated analysis**: Pattern detection across sessions
- **Template evolution**: Learning from successful session patterns

### Research Integration
- **Citation support**: BibTeX integration for academic references
- **IRB compliance**: Anonymization and consent tracking
- **Data analysis**: Integration with R/Python analysis workflows
- **Publication pipeline**: Direct export to academic formats

---

**Implementation Notes**:
- Use TypeScript interfaces for metadata structure
- Implement JSON Schema validation for metadata
- Consider using front-matter in markdown files for lightweight metadata
- Plan for migration between format versions as research needs evolve