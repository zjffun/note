const fs = require("fs");
const path = require("path");
const readline = require('readline');
const remark = require('remark');
const pangu = require('remark-pangu');
const execSync = require('child_process').execSync

// 1失败
process.exitCode = 1;

var root = path.join(__dirname),
    do_pangu_list = [];

execSync('git status -s', {
        encoding: "utf8"
    })
    .split("\n")
    .forEach(d => {
        let status = d.split(" ");
        // 1.暂存区的文件，2.修改或增加的文件，3.md文件
        ['M', 'A'].find(d => d == status[0]) 
            && /\.md$/.test(status[status.length - 1]) 
            && do_pangu_list.push(status[2])
            && console.log(status[2] + '\n');
    });

// 是否修改排版？
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('是否修改排版[Y/n]? ', (answer) => {
    if ('Y' == answer) {
        do_pangu_list.forEach(d => {
            let fpath = path.resolve(root, d),
                fname = path.basename(fpath, ".md"),
                fdir = path.dirname(fpath),
                data = fs.readFileSync(fpath);
            remark()
                .use(pangu)
                .use({
                    settings: {
                        commonmark: true,
                        emphasis: '*',
                        strong: '*'
                    }
                }).process(data, function (err, file_content /*vfile*/ ) {
                    if (err) throw err;
                    remark().use(pangu).process(fname, function (err, file_name /*vfile*/ ) {
                        if (err) throw err;
                        fs.writeFileSync(fpath, String(file_content));
                        fs.renameSync(fpath, path.resolve(fdir, String(file_name).trim() + ".md"));
                    })
                });
        })
        // 0成功
        process.exitCode = 0;
    }
    rl.close();
});

