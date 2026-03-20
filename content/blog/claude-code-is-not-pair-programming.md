---
title: "It's Not Pair Programming"
date: "2025-09-15"
tags: ["ai", "development"]
status: "published"
---

Everyone keeps calling AI-assisted coding "pair programming." When GitHub launched Copilot, CEO Nat Friedman introduced it as ["your AI pair programmer."](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) Their blog describes it as ["an AI pair programmer that seems capable of reading your mind."](https://github.blog/ai-and-ml/github-copilot/responsible-ai-pair-programming-with-github-copilot/) When Amazon launched CodeWhisperer, TechCrunch called it ["a GitHub Copilot-like AI pair programming tool."](https://techcrunch.com/2022/06/23/amazon-launches-codewhisperer-its-ai-pair-programming-tool/) LinkedIn Learning has [an entire course](https://www.linkedin.com/learning/ai-pair-programming-with-github-copilot-25302433) called "AI Pair Programming with GitHub Copilot." It's the industry's default metaphor.

But pair programming actually works for a specific reason, and it has nothing to do with what these tools do.

But pair programming actually works for a specific reason. Cal Newport describes it well: it's like working on a whiteboard with someone on a maths problem. The reason it's effective isn't just "two heads are better than one." It's that the social pressure of having another person right there forces you to focus. You're locking in on understanding what you're working on because you don't want to be the one who says "wait, wait, go back — I wasn't paying attention." You track the logic more carefully. You stay engaged. The presence of another mind keeps yours sharp.

That's not what's happening with Claude Code. Not even close.

---

## What's actually happening

When I use Claude Code, there's no social pressure. No one is watching me think. I'm not tracking someone else's reasoning in real time — I'm delegating implementation and reviewing the result. I describe what I want. Claude writes it. I read what it wrote, decide if it's right, and either approve it or send it back with feedback.

That's not pair programming. That's code review.

The skills I use most aren't the ones I'd use sitting at a whiteboard — riffing on ideas, building intuition together, staying sharp because someone's right there with me. They're the skills I built over years of reviewing pull requests and leading teams:

- Reading someone else's code and quickly spotting what's wrong
- Giving clear, specific feedback that leads to a better next iteration
- Knowing when the approach is fundamentally off vs. when it just needs polish
- Maintaining a mental model of the whole system while someone else writes the parts

## Why the distinction matters

Pair programming makes you smarter. That's the whole point. An LLM doesn't hijack your social circuits the way another person does. There's no one next to you whose attention you need to keep up with, no pressure to stay locked in, no risk of embarrassment if you zone out. The thing that makes pair programming work — the involuntary concentration boost of another human being right there — is completely absent.

What happens without that social effect? It's easy to skim, nod along, and stop really thinking. When someone else is writing all the code and you're just approving it, you can drift. The feedback loop that keeps you sharp in pair programming — the social pressure to track every line of reasoning — doesn't exist. You have to supply that discipline yourself.

That means actively reading the output, not scanning it. Questioning architectural choices, not just checking if it compiles. Maintaining your own mental model of the system instead of trusting that the LLM has one. The skill ceiling here is high, and it's entirely self-imposed — no one is forcing you to concentrate except you.

## What are you actually doing?

There's a useful framing about how senior individual contributors fork into different archetypes: the person who writes exceptional code, the deep domain expert, and the high-level tech lead who understands the whole system and coordinates the work.

AI-assisted coding rewards the third archetype disproportionately. You don't need to write exceptional code anymore — Claude does that. You don't necessarily need deep domain expertise — Claude has read the docs. What's left is the hard part: understanding how the whole system fits together, giving clear direction, catching the mistakes that look right at first glance. Pair programming gave you a cognitive boost to do all of that. Can you still do it when nothing is keeping you focused but yourself?

