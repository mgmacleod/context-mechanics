Hello,

I'm working on a research project called context mechanics. Some parts of it seem to be new, some parts others are also doing and calling it something else. We've established that the term "context mechanics" doesn't seem to be in wide use. I haven't published anything on it yet, as I'm still doing background research; it's possible others are in a similar situation.

You should already have a collection of documents in context about it. 

# For today  

## Terminology  

First I'll define a few terms as I use them when referring to the conversational interface itself:
- A "conversation" is a series of one or more "exchanges", each composed of a request "message" from the human participant and a response "message" from the AI participant. 
- A conversation has at least one exchange (barring technical failure) but may have many more, depending on what happens in the exchanges.
- A conversation always begins with a human request message and ends with an AI response message, regardless of how many exchanges occur.

## Task

We're designing a VSCode extension for conducting context mechanics research. I'll provide an initial design started in Claude Code. I'd like to have a bit more of an exploratory discussion about the requirements and implementation options. The overall workflow in the design is fairly accurate and it would provide a great start for such a tool, but I'm not sure it's the right direction. 

Two things to guide the conversation:
1. Does it make more sense to build a new extension from scratch or fork and modify an existing open source extension? Most of existing ones will be code-oriented, but should still provide a solid base with many of the necessary features (Continue, Cline, etc.). 
2. We don't necessarily need to replicate the simple linear conversation flow that most chat interfaces provide. In a research context, it would be very handy to be able to branch out at certain points to try different strategies and compare results. But this also complicates the data model, so I think it makes sense to consider the requirements from the beginning. 

## Approach

This is primarily a design conversation, but I expect there will be some exploratory aspects. I'm still figuring out how this should work, so I thought we could talk through how these conversations typically go and see what shakes out. 

Do you have any questions before we begin?