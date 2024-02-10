// const { PythonShell } = require("python-shell");
// let options = {
//     scriptPath : "/Users/hyojong/Documents/_SUNY 2024 Spring/HACKATHON/"
// };

// PythonShell.run("check.py", options, (err,res) => {
//     if(err)console.log(err)
//     if(res)console.log(res)
// });

const { spawn } = require('child_process')
const childPython = spawn ('python', ['check.py', 5, "Vega", false])

childPython.stdout.on('data',(data) => {
    console.log(`stdout: ${data}`)
})

childPython.stderr.on('data',(data) => {
    console.error(`stdout: ${data}`)
})

childPython.on('close', (code) => {
    console.log(`connection closed with code ${code}`)
})