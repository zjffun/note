-   场景：快速得到一段数组元素的和
-   题目：[Insertion Sort Advanced Analysis | HackerRank](https://www.hackerrank.com/challenges/insertion-sort/problem)
-   算法：[binary-indexed-tree :: HackerRank](https://www.hackerrank.com/topics/binary-indexed-tree)
-   实现：[binary-indexed-tree :: HackerRank](https://www.hackerrank.com/topics/binary-indexed-tree) 已经给出基本的实现了

```c
// get cumulative sum up to and including i
int Get(int i) {
  int res = 0;
  while(i) {
    res += B[i];
    i -= (i & -i);
  }
  return res;
}

// add val to value at i
void Set(int i, int val) {
  while(i <= N) {
    B[i] += val;
    i += (i & -i);
  }
}
```
