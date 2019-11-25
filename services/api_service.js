const request = require("request");
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { imageToText } = require("./image_to_text");
var find = require('cheerio-eq');




module.exports.getVehicleDetails = async (req, res) => {
    // code : HR26BR9044
    // HR 26 BR 9044
    //https://vahan.nic.in/nrservices/faces/user/searchstatus.xhtml
    request('https://vahan.nic.in/nrservices/faces/user/searchstatus.xhtml', async function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var cookies = response.headers["set-cookie"]
            var $ = cheerio.load(html);
            // Get text 
            console.log($(".captcha-image")[0].attribs.src);
            var captchaImageSrc = "https://vahan.nic.in" + $(".captcha-image")[0].attribs.src
            var text = await imageToText(captchaImageSrc)
            console.log(text)
            $("#txt_ALPHA_NUMERIC").val(text.text)
            console.log($("[id$='ViewState:0']").val())
            var formData = {
                "javax.faces.partial.ajax": true,
                "javax.faces.source": "j_idt46",
                "javax.faces.partial.execute": "@all",
                "javax.faces.partial.render": "j_idt46:pnl_show j_idt46:pg_show j_idt46:rcdl_pnl",
                "j_idt46": $("input[name=j_idt46]").val(),
                "masterLayout": $("input[name=masterLayout]").val(),
                "j_idt36": $("input[name=j_idt36]").val(),
                "regn_no1_exact": $("input[name=regn_no1_exact]").val(),
                "txt_ALPHA_NUMERIC": $("input[name=txt_ALPHA_NUMERIC]").val(),
                "javax.faces.ViewState": $("[id$='ViewState:0']").val()

            }
            request.post({
                headers: {
                    'Host': 'vahan.nic.in',
                    "Origin": "https://vahan.nic.in",
                    "Accept": "application/xml, text/xml, */*; q=0.01",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
                    "Connection": "keep-alive",
                    "Content-Length": "1750",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Cookie": cookies,
                    "Faces-Request": "partial/ajax",
                    "X-Requested-With": "XMLHttpRequest",
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36",
                    "Referer": "https://vahan.nic.in/nrservices/faces/user/searchstatus.xhtml",
                },
                url: 'https://vahan.nic.in/nrservices/faces/user/searchstatus.xhtml',
                form: formData
            }, function (error, response, body) {
                // console.log(error)
                // console.log(response)
                // console.log(body)
                var resData = {
                    err: error,
                    response: response,
                    body: body
                }
                res.send(body);
            });
            //res.send(response);
        }
    });


};


