const express = require("express")
const router = express.Router()
const axios = require("axios")
const cryptoModel = require("../model/mode")

router.get("/assets", async function (req, res) {
try {
        let key= req.headers.Authorization
        
        let docx = {
            method: "Get",
            url: "https://api.coincap.io/v2/assets",
                headers: {
               Authorization: `Bearer ${key}`,
            }
        }
        let result = await axios(docx)
        let arr = result.data.data
        let sortArr = arr.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr)

         await cryptoModel.deleteMany()

         await cryptoModel.insertMany(sortArr)

        sortArr.forEach(x => {delete x.explorer})

        return res.status(201).send({status:true, data: sortArr })
} 
catch (err) {res.status(500).send(err.message)}})

module.exports = router
