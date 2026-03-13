---
title: "Claude Code Is Not Pair Programming"
date: "2025-09-15"
tags: ["ai", "development"]
status: "published"
---

Everyone keeps calling AI-assisted coding "pair programming." GitHub named their product Copilot. The mental model people reach for is two developers sitting side by side, working through a problem together — Cal Newport's description of pair programming captures it well: it's like working on a whiteboard with someone on a maths problem. Two minds actively collaborating, building on each other's ideas in real time.

That's not what's happening with Claude Code. Not even close.

---

## What's actually happening

When I use Claude Code, I'm not collaborating on a problem. I'm delegating implementation and reviewing the result. I describe what I want. Claude writes it. I read what it wrote, decide if it's right, and either approve it or send it back with feedback.

That's not pair programming. That's code review. That's management.

The skills I use most aren't the ones I'd use sitting at a whiteboard — riffing on ideas, building intuition together, catching each other's mistakes in real time. They're the skills I built over years of reviewing pull requests and leading teams:

- Reading someone else's code and quickly spotting what's wrong
- Giving clear, specific feedback that leads to a better next iteration
- Knowing when the approach is fundamentally off vs. when it just needs polish
- Maintaining a mental model of the whole system while someone else writes the parts

## Why the distinction matters

If you think this is pair programming, you'll try to use it like pair programming — thinking out loud, exploring the problem space together, hoping two heads are better than one. And you'll be disappointed, because LLMs don't actually think with you. They generate plausible output based on your input.

If you recognise it as code review, you'll use it much more effectively. You'll spend your time on architecture and design decisions. You'll write clear specifications. You'll read the output critically instead of assuming it's correct. You'll catch the subtle bugs that look right at first glance.

The pair programming framing also leads people to undervalue the human side. "Anyone can pair program with an AI" implies the skill ceiling is low. But code review and technical direction have a very high skill ceiling. A junior developer reviewing Claude's output will miss things a senior developer catches immediately — the same way they'd miss things in a pull request.

## The archetype that matters

There's a useful framing from Cal Newport about how senior individual contributors fork into different archetypes: the person who writes exceptional code, the deep domain expert, and the high-level tech lead who understands the whole system and coordinates the work.

AI-assisted coding rewards the third archetype disproportionately. You don't need to write exceptional code anymore — Claude does that. You don't necessarily need deep domain expertise — Claude has read the docs. But you absolutely need to understand how the system works end to end, give clear direction, and review the output critically.

That's not pair programming. That's leadership. And it's a skill set that gets more valuable, not less, as the tools get better.
