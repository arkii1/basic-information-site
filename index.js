const http = require("http")
const fs = require("fs");

const allFiles = fs.readdirSync("./", { withFileTypes: true });

const htmlFiles = allFiles
.filter((file) => {
    return /.+\.(html)$/.test(file.name)
})
.map((file) => {
    return file.name.slice(0, -5)
})

const server = http.createServer((req, res) => {
    const requestedUrl = req.url.slice(1) 

    if(requestedUrl === "") {
        const html = fs.readFileSync('index.html', 'utf8')
        res.end(html)
        return
    }

    const found = htmlFiles.find(file => file === requestedUrl)
    if(found === undefined) {
        const html = fs.readFileSync('404.html', 'utf8')
        res.end(html)
    }
    else {
        const html = fs.readFileSync(`${found}.html`, 'utf8')
        res.end(html)        
    }
})

server.listen(3000, () => {
    console.log("You're connected!");
});