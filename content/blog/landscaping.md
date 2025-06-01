---
title: "Landscaping"
date: "2025-03-01"
tags: []
status: "published"
---

It's been a minute since I've stepped back to survey landscape for web development frameworks in 2025. I took some time this week to do so. Note that I am really delving into Cloudflare at the moment, so I'm testing each of these out with Cloudflare Workers with the new [static assets](https://developers.cloudflare.com/workers/static-assets/) feature, instead of the now deprecated Pages. 

---

## SvelteKit
This was, and still is, my choice for the easiest to teach full-stack framework. 

The magic is in all the right places for a CS grad with little or no web development experience. I do like JSX, but it is an abstraction over HTML, and you don't want to be living in that abstraction if you don't yet know HTML. 

Recent changes such as the (very magic-literal) [Runes](https://svelte.dev/blog/runes) and [Routing](https://svelte.dev/docs/kit/routing) with `+Page.ts do push the balance for convention-over-configuration a little far for my liking, and it all feels very strict and arbitrary. 

Plus, I could never remember the syntax for writing a loop in Svelte (spoiler - it's not that [hard](https://svelte.dev/tutorial/svelte/each-blocks).

Deploys to Cloudflare easily. 

## NextJS
A refreshing change to go back to the explicitness of React and NextJS, vs the magic of SvelteKit. React Server Components are really nice, and take the idea of *single file components* to the next level, by enabling you to write server logic right inside a component, hidden from the outside. 

I could see myself building an entire application in React Server Components, with pretty heavy use of HTMX, and a little bit of vanilla JS. But if you're doing that then you're introducing a lot of framework, not to mention cognitive overhead, just to build a predominantly server rendered app. 

Deploys to Cloudflare easily, however there's no easy way to deploy the application and any Durable Objects at the same time. You need a separate worker for that. See [this issue](https://github.com/opennextjs/opennextjs-cloudflare/issues/207). Note that SvelteKit has the same problem. 

## Hono
A strikingly simple framework, with JSX built in. No page-based routing or anything like that built-in, and although [honox](https://github.com/honojs/honox) is tackling that, it's trivial to wire up your routes to JSX components manually. That's my preferred approach. It's basically convention-free, but it doesn't feel like a foot gun. 

Runs perfectly on Cloudflare, without even an external build step (eg. vite). There's actually a big advantage to this, because `wrangler dev` just works with no build step or configuration, and so you get a full local development experience, with even Durable Objects and [Workflows](https://developers.cloudflare.com/workflows/) working locally. 

You're directly writing the script that the worker runs, so there's no issues deploying DO's like with NextJS and SvelteKit. 

I'm going to keep delving into this. I'm working on a little [Starter Kit](git@github.com:JakeBrown/kickoff.git) to document usage of all the CloudFlare APIs and as a reference for my own conventions. 

