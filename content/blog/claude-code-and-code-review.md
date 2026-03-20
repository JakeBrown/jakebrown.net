---
title: "The Tech Lead's Advantage in AI Coding"
date: "2025-07-15"
tags: ["ai", "development"]
status: "published"
---

I've been using Claude Code daily for a few months now, and the thing that strikes me most is how familiar it feels. Not because it's like using an IDE or a search engine - it feels like managing a team of developers.

---

## The skills that transfer

I spent years reviewing pull requests, mentoring junior developers, and leading small teams. The core of that work was never writing the code myself. It was:

1. Reading someone else's code and quickly identifying what's wrong
2. Giving clear, specific feedback that leads to a better result on the next iteration
3. Knowing when the approach is fundamentally off vs. when it just needs polish
4. Maintaining a mental model of the whole system being built
5. And when 3 and 4 are not possible, using gut-feeling or instinct to know when a solution just doesn't feel right. Like there should be a simpler architecture, design pattern, or algorithm

Every one of these skills transfers directly to working with Claude Code. You're not pair programming. You're reviewing and directing.

## Pros use it the opposite way

Vibe coding is real, and it's great for the initial lift — getting a non-developer from zero to a working prototype. That's genuinely powerful and wasn't possible before. And a perfectly valid approach for someone who isn't a developer.

But experienced developers use it the opposite way around. We're not vibing our way to an architecture and hoping it works. We know what the system should look like. The LLM fills in the implementation.

The value isn't that I don't have to think — it's that I don't have to type. I can focus on the decisions that matter: data model, system boundaries, error handling strategy, deployment topology. The stuff that matters for security, performance, deployability, and maintainability.

This is the same dynamic as leading a team. A good tech lead doesn't write every line of code. They make sure the team is building the right thing, the right way, and they catch problems early through review.


## The Socratic method

I've found the most effective code review strategies are based around asking questions. "What happens if this list is empty?" "Have you considered what this looks like with 10,000 rows?" "Why did you choose a map here instead of a reduce?"

The same technique works remarkably well with Claude. When I hit a bug, I don't say "there's a bug in the submit handler, fix it." I say "walk me through what happens when the user clicks Submit." Claude traces through the code path step by step, and almost always finds the bug itself - without me ever telling it where to look.

This produces better fixes than pointing at the broken line, because Claude re-evaluates the whole flow rather than patching the specific thing I pointed at. With a junior developer, the goal of Socratic questioning is to build their judgement over time. Longer term payoffs. But with Claude, this approach can have immediate payoff when you prompt it to think rather than just comply.

## Types as abstraction

You probably don't need to review every line of code an LLM writes. You certainly can't hold it all in your head. But this isn't a new problem - it's the oldest problem in software engineering. We've always invented abstractions to manage complexity we can't hold in our heads. Higher-level programming languages, frameworks, libraries, APIs. Each one lets you reason about a system without understanding every line underneath.

We're still figuring out what abstractions work best in this new era of AI-generated code. But one that I've found works well is keeping a very close eye on the TypeScript types. I can't review every function body, but I can watch the types - and immediately see when Claude strays, makes overcomplicated decisions, or introduces unnecessary indirection - even if I haven't read the implementation yet. Types are the contract of your codebase. It's the same principle as deploying a well-defined API and then building on top of it. You don't need to understand every line of the implementation if the interface is clear and correct.

Supabase has turned out to be a great tool for this workflow. I can spend my time where it matters most - iterating on the database design, getting the tables, relationships, and RLS policies right - and then hand that foundation over to Claude to fill in the gaps and iterate on the UI. The database schema *is* the specification. Supabase generates TypeScript types directly from the schema, and its client gives Claude a well-defined API to work against. I'm not reviewing every React component line by line. I'm reviewing the data model, and trusting that if the foundation is solid, the implementation built on top of it will be reasonable. When it's not, I can usually trace the problem back to a schema decision rather than a UI bug.


## The future

I can now genuinely work more effectively than when I had a team of junior developers to direct. And that's unsettling - If a senior engineer with an LLM can out-produce a senior engineer with three juniors, there's very little incentive for companies to hire those juniors in the first place. No incentive to pay someone to bang their head against a wall for six hours figuring out why their database query is slow, or what that abstract compiler error means. 

But that's exactly where the learning happens. The skills and instincts I'm relying on now came from years of getting things wrong and struggling with difficult problems. If we cut off that pipeline, I'm not sure where the next generation of senior engineers comes from. But if you've spent your career getting good at code review and mentoring, you're better prepared for this world than you might think.
