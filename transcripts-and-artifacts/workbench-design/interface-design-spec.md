# Context Mechanics Research Interface Design Specification

**Version**: 1.0  
**Purpose**: Define the user interface and experience for Context Mechanics research sessions  
**Target**: VSCode Extension Implementation

## Overview

The research interface consists of three main components:
1. **Session Planning Screen** - Configure and initiate research sessions
2. **Research Workbench** - Dual-pane conversation interface for active sessions
3. **Session Management Panel** - Navigate and manage research sessions

## Session Planning Screen

### Layout
Full-screen modal or dedicated webview panel that appears when creating a new research session.

```
┌─────────────────────────────────────────────────────────────────┐
│ Create Research Session                                    [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Session Details                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Title: Context Health Exploration                           │ │
│ │ Protocol: [Context Health Check ▼] [New Template]          │ │
│ │ Objective: Validate context pollution detection methods    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Configuration                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Provider: [Claude 3.5 Sonnet ▼]                           │ │
│ │ Tools: ☑ MCP Filesystem  ☑ Git  ☐ Web Search              │ │
│ │ Context Files:                                              │ │
│ │   📄 @docs/protocols/TARP.md                               │ │
│ │   📄 @research-sessions/2025-01-25_baseline/session.md     │ │
│ │   [+ Add Files]                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Initial Message                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Template: [Context Health Check ▼] [Load] [Clear]          │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Let me initiate a systematic context health assessment  │ │ │
│ │ │ following our established protocol...                   │ │ │
│ │ │                                                         │ │ │
│ │ │ [Markdown editing with preview]                         │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ 📝 Preview  📄 Template Variables  🔍 File References      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Research Notes Setup                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ External Context:                                           │ │
│ │   Environment: Quiet office, focused session               │ │
│ │   Researcher State: Well-rested, high energy               │ │
│ │   Prior Work: Following up on 2025-01-25 findings         │ │
│ │                                                             │ │
│ │ Hypotheses:                                                 │ │
│ │   - Current metrics miss subtle degradation patterns       │ │
│ │   - TARP interventions most effective at transitions       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│                           [Cancel] [Start Session]             │
└─────────────────────────────────────────────────────────────────┘
```

### Key Features

**Template System**:
- Dropdown with predefined session templates
- Template variables (${DATE}, ${OBJECTIVE}, etc.)
- Custom template creation and editing
- Template preview before use

**File Reference Integration**:
- Drag-and-drop from VSCode Explorer
- @file autocomplete with live preview
- File content preview on hover
- Automatic context size estimation

**Configuration Validation**:
- Provider availability checking
- Tool compatibility verification
- Context size warnings
- Estimated token usage

## Research Workbench Interface

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ Session: Context Health Exploration  [⚙️] [📊] [💾] [❌]        │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────┬─────────────────────────────┐ │
│ │           Conversation          │        Research Notes       │ │
│ │                                 │                             │ │
│ │ Exchange 1  [🔗] [📋]          │ 🗒️ Exchange Notes          │ │
│ │ ┌─────────────────────────────┐ │ ┌─────────────────────────┐ │ │
│ │ │ 👤 Human [14:30:15]         │ │ │ 📝 Exchange 1 Notes     │ │ │
│ │ │                             │ │ │                         │ │ │
│ │ │ Let me initiate a           │ │ │ Decision: Systematic    │ │ │
│ │ │ systematic context health   │ │ │ approach chosen         │ │ │
│ │ │ assessment...               │ │ │                         │ │ │
│ │ │                             │ │ │ Tags: #baseline         │ │ │
│ │ │ 📎 @docs/protocols/TARP.md  │ │ │ #methodology            │ │ │
│ │ └─────────────────────────────┘ │ └─────────────────────────┘ │ │
│ │                                 │                             │ │
│ │ ┌─────────────────────────────┐ │ 🗒️ Session Notes           │ │
│ │ │ 🤖 AI [14:30:45]            │ │ ┌─────────────────────────┐ │ │
│ │ │ Tokens: 1,234→567           │ │ │ External Context:       │ │ │
│ │ │                             │ │ │ - Focused session       │ │ │
│ │ │ I'll analyze the context    │ │ │ - Following up on...    │ │ │
│ │ │ systematically...           │ │ │                         │ │ │
│ │ │                             │ │ │ Emerging Patterns:      │ │ │
│ │ │ 🔧 search_files("health")   │ │ │ - AI prefers technical  │ │ │
│ │ │    ✅ Approved [14:30:52]    │ │ │   solutions             │ │ │
│ │ └─────────────────────────────┘ │ │ - TARP working well     │ │ │
│ │                                 │ └─────────────────────────┘ │ │
│ │ Exchange 2  [🔗] [📋]          │                             │ │
│ │ [Previous exchanges...]         │ 📊 Session Metrics          │ │
│ │                                 │ ┌─────────────────────────┐ │ │
│ ├─────────────────────────────────┤ │ Exchanges: 5            │ │ │
│ │         Message Composer        │ │ TARP: 3✅ 1❌           │ │ │
│ │ ┌─────────────────────────────┐ │ │ Duration: 47m           │ │ │
│ │ │ 📝 Compose your message...  │ │ │ Tokens: 12.5k           │ │ │
│ │ │                             │ │ └─────────────────────────┘ │ │
│ │ │ [Rich markdown editor]      │ │                             │ │
│ │ │                             │ │ 🏷️ Quick Tags              │ │
│ │ │                             │ │ #methodology #baseline      │ │
│ │ └─────────────────────────────┘ │ #intervention #breakthrough │ │
│ │ 📎 @files  📋 Templates  [Send] │ #false-positive #pattern    │ │
│ └─────────────────────────────────┴─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Left Panel: Conversation View

**Exchange Display**:
- Clear visual separation between exchanges
- Timestamps and participant identification
- Token usage and provider info for AI messages
- Tool usage with approval/refusal indicators
- File references as expandable attachments

**Message Actions**:
- 🔗 Link icon: Copy direct link to exchange (for notes)
- 📋 Duplicate icon: Start new conversation from this point
- Expand/collapse for long messages
- Export individual exchanges

**Message Composer**:
- Rich markdown editor with live preview
- @file autocomplete and reference insertion
- Template insertion and variable substitution
- Context size indicator and warnings
- Send button with keyboard shortcuts

### Right Panel: Research Notes

**Exchange-Linked Notes**:
- Automatically linked to current exchange
- Real-time sync with conversation progress
- Rich text editing with markdown support
- Tagging system with autocomplete
- Quick note templates

**Session-Level Notes**:
- External context tracking
- Emerging patterns documentation
- Cross-session connections
- Hypothesis tracking and validation

**Session Metrics Dashboard**:
- Real-time statistics (exchanges, tokens, duration)
- TARP intervention tracking
- Progress toward objectives
- Context health indicators

**Quick Actions**:
- Tag autocomplete from previous sessions
- Note templates (decision points, observations, patterns)
- Cross-reference linking to other sessions
- Export note sections

## TARP Integration Interface

### Approval Flow
```
┌─────────────────────────────────────────────────────────────────┐
│ 🔧 Tool Call Requested                                          │
├─────────────────────────────────────────────────────────────────┤
│ search_files("context health patterns")                        │
│                                                                 │
│ Purpose: Looking for recurring patterns in previous sessions    │
│ Impact: Will search across 15 session files                    │
│ Estimated time: 3-5 seconds                                    │
│                                                                 │
│                    [❌ Refuse] [✅ Approve]                     │
│                                                                 │
│ Quick refusal reasons:                                          │
│ • Different approach needed                                     │
│ • Missing context                                               │
│ • Timing issue                                                  │
│ • [Custom reason...]                                            │
└─────────────────────────────────────────────────────────────────┘
```

### Intervention Points
- Non-blocking notification overlay
- Configurable auto-approve for routine operations
- Quick reason selection for refusals
- Automatic note creation for interventions
- Timing data collection for analysis

## Session Management Panel

### Session Browser
```
┌─────────────────────────────────────────────────────────────────┐
│ Research Sessions                                          [+]  │
├─────────────────────────────────────────────────────────────────┤
│ 📁 Active Sessions                                              │
│   🔬 2025-01-27_context-health-exploration        [📊] [🔄]    │
│   🔬 2025-01-26_tarp-validation                   [📊] [⏸️]    │
│                                                                 │
│ 📁 Recent Sessions                                              │
│   📄 2025-01-25_baseline-measurement              [📊] [📁]    │
│   📄 2025-01-25_baseline-measurement_alt-approach [📊] [📁]    │
│   📄 2025-01-23_protocol-development              [📊] [📁]    │
│                                                                 │
│ 📁 Archives                                                     │
│   📂 2025-01 (12 sessions)                                     │
│   📂 2024-12 (8 sessions)                                      │
│                                                                 │
│ 🔍 Search: [Enter session title, tags, or content...]          │
│                                                                 │
│ 📊 Analytics                                                    │
│   • Total sessions: 23                                         │
│   • Active research hours: 47.5h                               │
│   • TARP interventions: 156 (68% approved)                     │
│   • Most used tags: #methodology, #baseline, #tarp             │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Actions
- 🔬 Active session indicator with resume capability
- 📊 Quick metrics view for any session
- 🔄 Resume suspended session
- ⏸️ Suspend active session
- 📁 Open session folder in Explorer
- Search across all session content

## Navigation and Integration

### Workspace Integration
- Research sessions appear as workspace folders
- Quick switch between regular Continue chat and research workbench
- File references work across all project files
- Git integration for session versioning

### Keyboard Shortcuts
- `Ctrl+Shift+R`: New research session
- `Ctrl+Shift+N`: Quick note for current exchange
- `Ctrl+Enter`: Send message (in composer)
- `Ctrl+D`: Duplicate conversation from current point
- `Ctrl+/`: Quick tag insertion
- `F2`: Rename current session

## Responsive Behavior

### Panel Sizing
- Resizable splitter between conversation and notes
- Collapsible notes panel for focus on conversation
- Full-screen mode for intensive research sessions
- Floating notes window for dual-monitor setups

### Session State Management
- Auto-save every 30 seconds
- Session suspension/resume with state preservation
- Crash recovery with unsaved work protection
- Cross-session navigation with context preservation

## Accessibility

### Screen Reader Support
- Proper ARIA labels for all interactive elements
- Keyboard navigation for all features
- High contrast mode support
- Text scaling compatibility

### Usability Features
- Undo/redo for note editing
- Autofill for common research patterns
- Context-sensitive help
- Progressive disclosure for advanced features

---

**Implementation Notes**:
- Use VSCode webview API for rich interface components
- Maintain consistency with VSCode design system
- Implement progressive enhancement (core features work without advanced UI)
- Plan for mobile/tablet support in future versions