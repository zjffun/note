---
date: 'Fri, 30 Oct 2020 11:39:53 GMT'
updated: 'Fri, 30 Oct 2020 11:39:53 GMT'
---

`.PHONY` 用来告诉 `make` 和文件无关的命令。

PS：经我测试不加也行。。我用的版本：

```bash
$ make -v
GNU Make 4.3
Built for Windows32
```

测试代码：

```makefile
# .PHONY: build build-bundle clean test-clean lint lint-js lint-ts

build: build-bundle
	echo build

build-bundle: clean
	echo build-bundle

clean: test-clean
	echo clean

test-clean:
	echo test-clean

lint: lint-js lint-ts
	echo lint

lint-js:
	echo lint-js

lint-ts:
	echo lint-ts
```

See: [What is the purpose of .PHONY in a Makefile? - Stack Overflow](https://stackoverflow.com/questions/2145590/what-is-the-purpose-of-phony-in-a-makefile)
