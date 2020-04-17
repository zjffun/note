const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const remark = require("remark");
const vfile = require("vfile");
const remarkHandleLocalImg = require("../index");

function reslove(relativePath) {
  return path.resolve(__dirname, relativePath);
}

// clean
rimraf.sync(reslove("./images"));

// prepare
const remarkHandleLocalImgInstance = remark().use(remarkHandleLocalImg);
const mdText = `![test-img](${__dirname}/test.jpg)`;
let testVFile = null;

// test begin
// test mv and rename img
testVFile = vfile({
  cwd: __dirname,
  path: "./test.md",
  contents: mdText,
});
remarkHandleLocalImgInstance.processSync(testVFile);
console.assert(
  String(testVFile).trim() ===
    String(fs.readFileSync(reslove("./test.md.snap"))).trim(),
  "fail:mv and rename img"
);
try {
  fs.statSync(reslove("./images/test-img.jpg"));
} catch (_) {
  console.assert(false, "test mv and rename img");
}

// test same name img
testVFile = vfile({
  cwd: __dirname,
  path: "./test.md",
  contents: mdText,
});
remarkHandleLocalImgInstance.processSync(testVFile);
try {
  fs.statSync(reslove("./images/test-img(z).jpg"));
} catch (_) {
  console.assert(false, "test same name img");
}

// test no dirname
testVFile = vfile({
  cwd: __dirname,
  contents: mdText,
});
remarkHandleLocalImgInstance.processSync(testVFile);
console.assert(String(testVFile).trim() === mdText.trim(), "test no dirname");
