const fs = require("fs")  
const path = require("path")  
const readline = require('readline');

var root = path.join(__dirname)  

var repetition = {};
// 1失败
process.exitCode = 1;

readDirSync(root)  
function readDirSync(path){  
    var pa = fs.readdirSync(path) 
    pa.forEach(function(ele,index){  
        var info = fs.statSync(path+"/"+ele)      
        if(info.isDirectory()){  
            readDirSync(path+"/"+ele);  
        }else{
            var mat = ele.match(/^(.*?)\((\d+)\)\.md$/)
            if(mat){
                // mat[1]:主名，mat[2]:编号
                var name = path+"/"+mat[1]
                var no = mat[2]
                !(name in repetition) && (repetition[name] = [])
                repetition[name].push(no)
            }
        }     
    })  
}  

console.log(repetition)

// 是否更新？
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('是否更新[Y/n]? ', (answer) => {
    if('Y' == answer){
        for(r in repetition){
            var v = ''
            var rep = repetition[r]
            // 删除低版本的
            do{
                fs.unlinkSync(`${r}${'' !== v ? `(${v})` : ''}.md`)
                console.log(`del:${r}${'' !== v ? `(${v})` : ''}.md`)
                v = rep.shift()
            }while(rep.length)
            // 重命名高版本
            fs.renameSync(`${r}(${v}).md`, `${r}.md`)
            console.log(`change:${r}(${v}).md to ${r}.md`)
            console.log('-------------')
        }
        // 0成功
        process.exitCode = 0;
    }
    rl.close();
});