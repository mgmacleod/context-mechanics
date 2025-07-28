#!/usr/bin/env python3
"""
Chat Transcript Parser

Parses human-AI conversation transcripts and converts them to markdown format.
The script expects a specific format where:
- Human always starts the conversation
- AI always finishes the conversation  
- Human to AI transition: 1 blank line + "Edit" line
- AI to Human transition: 4 blank lines

Made for transcripts manually copied from the Claude.ai chat interface.
"""

import argparse
import sys
import re
from datetime import datetime

def parse_chat_transcript(input_file, output_file, title=None):
    """
    Parse a chat transcript and convert it to markdown format.
    
    Args:
        input_file (str): Path to input text file
        output_file (str): Path to output markdown file
        title (str, optional): Custom title for the conversation
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.", file=sys.stderr)
        return False
    except Exception as e:
        print(f"Error reading input file: {e}", file=sys.stderr)
        return False
    
    # Split content into lines for processing
    lines = content.split('\n')
    
    # Remove leading/trailing empty lines
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    
    if not lines:
        print("Error: Input file is empty or contains no content.", file=sys.stderr)
        return False
    
    messages = []
    current_message = []
    current_speaker = "Human"  # Always starts with Human
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check for Human to AI transition (blank line + "Edit")
        if (current_speaker == "Human" and 
            line.strip() == "" and 
            i + 1 < len(lines) and 
            lines[i + 1].strip() == "Edit"):
            
            # Save current human message
            if current_message:
                messages.append(("Human", '\n'.join(current_message).strip()))
                current_message = []
            
            # Skip the blank line and "Edit" line
            i += 2
            current_speaker = "AI"
            continue
        
        # Check for AI to Human transition (4 consecutive blank lines)
        if (current_speaker == "AI" and 
            line.strip() == "" and 
            i + 3 < len(lines) and
            all(lines[j].strip() == "" for j in range(i, min(i + 4, len(lines))))):
            
            # Save current AI message
            if current_message:
                messages.append(("AI", '\n'.join(current_message).strip()))
                current_message = []
            
            # Skip the 4 blank lines
            i += 4
            current_speaker = "Human"
            continue
        
        # Regular content line
        current_message.append(line)
        i += 1
    
    # Save the last message
    if current_message:
        messages.append((current_speaker, '\n'.join(current_message).strip()))
    
    # Generate markdown output
    markdown_content = generate_markdown(messages, title)
    
    # Write to output file
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        print(f"Successfully converted chat transcript to markdown: {output_file}")
        return True
    except Exception as e:
        print(f"Error writing output file: {e}", file=sys.stderr)
        return False


def generate_markdown(messages, title=None):
    """
    Generate markdown content from parsed messages.
    
    Args:
        messages (list): List of tuples (speaker, content)
        title (str, optional): Custom title for the conversation
        
    Returns:
        str: Formatted markdown content
    """
    markdown_lines = []
    title_prefix = "Conversation Transcript: "
    conversation_title = title_prefix + title if title else title_prefix
    markdown_lines.append(f"# {conversation_title}\n")
    
    markdown_lines.append(f"*Transcription created on {datetime.now().strftime('%Y-%m-%d')}.*\n")
    
    for i, (speaker, content) in enumerate(messages):
        # Add speaker header
        if speaker == "Human":
            markdown_lines.append("**Human**\n")
        else:
            markdown_lines.append("**AI**\n")
        
        # Add message content
        markdown_lines.append(content)
        markdown_lines.append("\n")
        
        # Add separator between messages (except after the last one)
        if i < len(messages) - 1:
            markdown_lines.append("---\n")
    
    return '\n'.join(markdown_lines)


def main():
    """Main function to handle command line arguments and execute parsing."""
    parser = argparse.ArgumentParser(
        description="Parse human-AI chat transcripts and convert to markdown format"
    )
    parser.add_argument(
        "input_file",
        help="Path to input text file containing chat transcript"
    )
    parser.add_argument(
        "output_file", 
        help="Path to output markdown file"
    )
    parser.add_argument(
        "-t", "--title",
        help="Custom title for the conversation (default: 'Chat Conversation')"
    )
    
    args = parser.parse_args()
    
    success = parse_chat_transcript(args.input_file, args.output_file, args.title)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main() 