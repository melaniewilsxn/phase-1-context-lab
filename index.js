function createEmployeeRecord(employeeRecordArray){
    const employeeRecordObj = {
        firstName: employeeRecordArray[0],
        familyName: employeeRecordArray[1],
        title: employeeRecordArray[2],
        payPerHour: employeeRecordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecordObj
}

function createEmployeeRecords(employeeRecordsArray){
    let employeeRecords = employeeRecordsArray.map(createEmployeeRecord)
    return employeeRecords;
}

function createTimeInEvent(date){
    const newTimeInEvent= {
        type: "TimeIn",
        hour: Number(date.slice(-4,-2)+'00'),
        date: date.slice(0, 10)
    }
    this.timeInEvents.push(newTimeInEvent)
    return this
}

function createTimeOutEvent(date){
    const newTimeOutEvent= {
        type: "TimeOut",
        hour: Number(date.slice(-4,-2)+'00'),
        date: date.slice(0, 10)
    }
    this.timeOutEvents.push(newTimeOutEvent)
    return this
}

function hoursWorkedOnDate(date){
    let timeIn = 0
    let timeOut = 0
    let hoursWorked = 0
    for (let i=0; i<this.timeInEvents.length; i++){
        if(this.timeInEvents[i].date === date.slice(0, 10)){
            timeIn = this.timeInEvents[i].hour
        }
        if(this.timeOutEvents[i].date === date.slice(0, 10)){
            timeOut = this.timeOutEvents[i].hour
        }
    }
    hoursWorked = (timeOut-timeIn)/100
    return hoursWorked;
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date)*this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecordArray, targetFirstName){
    return employeeRecordArray.find(employeeRecord => employeeRecord.firstName === targetFirstName)
}

function calculatePayroll(employeeRecordsArray){
    let payroll = 0
    employeeRecordsArray.forEach(employeeRecordArray => {
        payroll += allWagesFor.call(employeeRecordArray)
    })
    return payroll;
}

