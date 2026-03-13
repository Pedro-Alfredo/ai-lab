let pyodide
let editor

async function init(){

pyodide = await loadPyodide()

require.config({
paths:{vs:'https://unpkg.com/monaco-editor/min/vs'}
})

require(['vs/editor/editor.main'],function(){

editor = monaco.editor.create(
document.getElementById("editor"),
{
value:`import numpy as np

print("AI Lab ready")

data = [1,3,2,5,4]
print(data)
`,
language:"python",
theme:"vs-dark"
}

)

})

document.getElementById("run").onclick = run

}

async function run(){

let code = editor.getValue()

try{

let result = await pyodide.runPythonAsync(code)

document.getElementById("output").textContent = result

}catch(err){

document.getElementById("output").textContent = err

}

}

init()
