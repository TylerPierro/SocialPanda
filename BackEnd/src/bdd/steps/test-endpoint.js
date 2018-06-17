const {Before, Given, Then, When} = require('cucumber')
//const {defineSupportCode} = require('cucumber')
const chai = require('chai')
const expect = chai.expect;
//const incrementer = require('../incrementer')
const chaiHttp = require('chai-http')
const server = require('../../../dist/index')

chai.use(chaiHttp);

let url = ''
let resp = null


    Given('The url is {string}', function(input){
        url = input
    })
    When('Method is GET', ()=>{
        resp = chai.request(server).get(url)

    })
    Then('Status should be {int} and contents should be {string}', (status, content)=>{
        expect(resp).to.not.equal(null)
        return resp && 
            resp.then(res =>{
                expect(res.status).to.equal(status)
                expect(res.body.content).to.equal(content)
            },
            err =>{
                console.log(err)
            }
        )
            
    })
