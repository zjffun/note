---
updated: 'Wed, 14 Oct 2020 01:00:53 GMT'
date: 'Wed, 14 Oct 2020 01:00:53 GMT'
---

FLIP stands for First, Last, Invert, Play.

Let’s break it down:

-   First: the initial state of the element(s) involved in the transition.
-   Last: the final state of the element(s).
-   Invert: here’s the fun bit. You figure out from the first and last how the element has changed, so – say – its width, height, opacity. Next you apply transforms and opacity changes to reverse, or invert, them. If the element has moved 90px down between First and Last, you would apply a transform of -90px in Y. This makes the elements appear as though they’re still in the First position but, crucially, they’re not.
-   Play: switch on transitions for any of the properties you changed, and then remove the inversion changes. Because the element or elements are in their final position removing the transforms and opacities will ease them from their faux First position, out to the Last position.

> -   [Aerotwist - FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
