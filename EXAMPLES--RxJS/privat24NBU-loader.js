const Rx     = require('rx')
const axios  = require('axios')
const colors = require('colors')
const moment = require('moment')
const fs     = require('fs')

// define for which period get archive
const YEAR  = '2018'
const MONTH = '05'

const DAYS  = moment(`01.${MONTH}.${YEAR}`, 'DD.MM.YYYY').daysInMonth()
const DATES = getDates(DAYS)
const FIRST_DELAY = 0
const DELAY       = 10000
const ALL_DATA    = []  // данные полученные с запросов успешно

console.log('START HERE')
getArchives()


/**
 * Main function
 */
function getArchives () {

  let delay  = Rx.Observable.timer(FIRST_DELAY, DELAY)
  Rx.Observable
    .fromArray(DATES)
    .zip(delay, (date) => date)   
    .subscribe(
      // next
      (date) => { 

        // let promise = new Promise((r,j) => r({date, bank: 'PB'}))
        console.log(colors.cyan(date) + ' - ARCHIVE DOWNLOADING')

        Rx.Observable
        .fromPromise(privat24NBU(date))
        // .fromPromise(promise)
        .subscribe(
          // onResolve
          (data) => {
            let {date, bank} = data
            console.log(colors.cyan({date, bank}) + colors.green(' - ARCHIVE RECEIVED'))
            ALL_DATA.push(data)
            DATES.shift()
          },

          // onReject
          (err) => {
            console.log(colors.red('==============> ERROR in subscriber'))
            console.log(colors.yellow.bold('Date: ', date))
            console.log(colors.yellow.bold('Status =', err.response.status))
            console.log(colors.red('==============> ERROR in subscriber'))
          }
      )
    },
    
    // err
    console.log,
    
    // complete
    () => {
      console.log(DATES)
      DATES.length ? getArchives() : WriteDataIntoFile()
      // console.log('COMPLETE')
    }
  )
}


/**
 * Набить массив датами за данный промежуток
 * @param {String} month
 * @param {String} year
 * @return {Array} dates 
 */
function getDates(days) {
  let dates = []

  for(let i = 0; i < days; i++) {
    // incrementing i, and making from '1' to '01'
    let day = i+1
    day = day < 10 ? '0' + day : day
  
    dates.push(`${day}.${MONTH}.${YEAR}`)
  }

  return dates
}


/**
 * Privat24 API
 * @param {String} date 
 * @return {Promise} 
 */
function privat24NBU(date = '01.12.2014') {
    return axios.get('https://api.privatbank.ua/p24api/exchange_rates?json&date=' + date)
                .then((response) => response.data)
      // .catch((error) => {
      //     console.log(colors.red('==============> ERROR in privat24NBU() catch'))
      //    console.log(error);
      //    console.log(colors.red('==============> ERROR in privat24NBU() catch'))
  
      //    REST_DATES.push(date)
      // })
  //   .then(function () {
  //     // always executed
  //   });
}
  

/**
 * Запись массива с данными "ALL_DATA" в файл
 */
function WriteDataIntoFile() {
  console.log(colors.green('ALL DATA HAS BEEN RECEIVED'))
  fs.writeFileSync('./data.json',  JSON.stringify(ALL_DATA, null, 2)  , 'utf-8');  
}
