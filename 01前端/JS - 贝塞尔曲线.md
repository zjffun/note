---
updated: 'Mon, 03 Aug 2020 02:47:25 GMT'
date: 'Mon, 03 Aug 2020 02:47:25 GMT'
---

```js
/**
* @desc First-order Bessel
* @param {number} t Current percentage
* @param {Array} p1 Starting coordinates
* @param {Array} p2 Terminal coordinates
*/
oneBezier(t, p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    let x = x1 + (x2 - x1) * t;
    let y = y1 + (y2 - y1) * t;
    return [x, y];
}

/**
* @desc Second-order Bessel
* @param {number} t Current percentage
* @param {Array} p1 Starting coordinates
* @param {Array} p2 Terminal coordinates
* @param {Array} cp control point
*/
twoBezier(t, p1, cp, p2) {
    const [x1, y1] = p1;
    const [cx, cy] = cp;
    const [x2, y2] = p2;
    let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return [x, y];
}

/**
* @desc Third-order Bessel
* @param {number} t Current percentage
* @param {Array} p1 Starting coordinates
* @param {Array} p2 Terminal coordinates
* @param {Array} cp1 Control point 1
* @param {Array} cp2 Control point 2
*/
threeBezier(t, p1, cp1, cp2, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [cx1, cy1] = cp1;
    const [cx2, cy2] = cp2;
    let x =
        x1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cx1 * t * (1 - t) * (1 - t) +
        3 * cx2 * t * t * (1 - t) +
        x2 * t * t * t;
    let y =
        y1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cy1 * t * (1 - t) * (1 - t) +
        3 * cy2 * t * t * (1 - t) +
        y2 * t * t * t;
    return [x, y];
}
```

-   [JS Acquisition Points of Bessel Curve Algorithms](https://programmer.group/js-acquisition-points-of-bessel-curve-algorithms.html)
-   [How to Understand and Apply Bessel Curve | Develop Paper](https://developpaper.com/how-to-understand-and-apply-bessel-curve/)
