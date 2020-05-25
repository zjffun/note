SCSS:

```scss
%hide-scroll-bar {
  &::-webkit-scrollbar {
    display: none; /* webkit */
  }
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
}

.article {
  @extend %hide-scroll-bar;
}
```

CSS:

```css
.article {
  -ms-overflow-style: none;
  /* IE 11 */
  scrollbar-width: none;
  /* Firefox 64 */
}
.article::-webkit-scrollbar {
  display: none;
  /* webkit */
}
```
