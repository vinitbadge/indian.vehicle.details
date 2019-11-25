
var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
//var url = 'http://tesseract.projectnaptha.com/img/eng_bw.png'


function imageToText(url) {
    return new Promise(function (resolve, reject) {
        Tesseract.recognize(url)
            .progress(function (p) { /* console.log('progress', p) */ })
            .catch(err => resolve(""))
            .then(function (result) {
                //console.log(result.text)
                //process.exit(0)
                var data = {
                    text: result.text,
                    //body: body
                }
                resolve(data)
            })
    });
    //     console.log("hereee" + url)
    //     var filename = 'pic.jsp'
    //     var writeFile = fs.createWriteStream(filename)
    //     const req = request.get(url)
    //         .on('body', function () {
    //             console.log(body)
    //         }).on('response', function (res) {
    //             console.log(res)
    //             if (res.statusCode === 200) {
    //                 req.pipe(writeFile).on('close', function () {
    //                     console.log(url, 'saved to', filename)
    //                     Tesseract.recognize(filename)
    //                         .progress(function (p) { /* console.log('progress', p) */ })
    //                         .catch(err => resolve(""))
    //                         .then(function (result) {
    //                             //console.log(result.text)
    //                             //process.exit(0)
    //                             var data = {
    //                                 text: result.text,
    //                                 //body: body
    //                             }
    //                             resolve(data)
    //                         })
    //                 });
    //             }
    //         })
    // })

}

exports.imageToText = imageToText;
