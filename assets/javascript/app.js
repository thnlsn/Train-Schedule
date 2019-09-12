var now = moment().format("hh:mm");
console.log(now);

//▓▓▓▓▓ array for table ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

var tableArray = [
    //0 (1)
    {
        name: "Polar Express",
        destination: "North Pole",
        firstTime: "00:00",
        frequency: 1440,
    },
    //1 (2)
    {
        name: "Thomas the Tank Engine",
        destination: "Sodor Island",
        firstTime: "14:00",
        frequency: 40,
    },
    //2 (3)
    {
        name: "Bullet Train",
        destination: "Magazine Mountain",
        firstTime: "02:30",
        frequency: 30,
    },
];

//THIS INFORMATION IS USED TO FIND
    //*TRAIN NAME*
    //*DESTINATION*
    //*FREQUENCY*
    //*NEXT ARRIVAL*
    //*MINUTES AWAY*

//▓▓▓▓▓ render table function ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

//THIS WILL BE INVOKED IN THE BUTTON CLICK EVENT
function renderTable() {
    $("#train-table").empty();

    for (var i = 0; i < tableArray.length; i++) {
        console.log("------------");
        //COLUMN 1 #
        var trainNum = i+1;
        console.log("number ▓ = " + trainNum);
        //COLUMN 2 NAME
        var trainName = tableArray[i].name;
        console.log("name ▓ = " + trainName);
        //COLUMN 3 DESTINATION
        var trainDest = tableArray[i].destination;
        console.log("destination ▓ = " + trainDest);
        //COLUMN 4 FREQUENCY
        var trainFreq = tableArray[i].frequency;
        console.log("frequency ▓ = " + trainFreq);

        //COLUMN 5 NEXTARRIVAL
        var m = moment(new Date());
        var timeNow = (m.hour()*60) + m.minute();
        console.log("timenow = " + timeNow); //THE TIME NOW
        var n = (moment.duration(tableArray[i].firstTime).asHours())*60;
        console.log("firsttraintime = " + n); //THE FIRST TRAIN TIME

        var nextArrival = moment().startOf('day').add(calcNextArrival(timeNow, n, trainFreq), 'minutes').format('hh:mm A')
        var nextArrivalInMinutes = calcNextArrival(timeNow, n, trainFreq);
        console.log(calcNextArrival(timeNow, n, trainFreq)); //NEXT ARRIVAL IN TOTAL MINUTES
        console.log(nextArrival); //THE NEXT ARRIVAL IN CORRECT FORMAT

        //COLUMN 6 MINUTESAWAY
        var minutesAway = calcMinutesAway(timeNow, nextArrivalInMinutes);
        console.log(minutesAway);
        console.log("------------");

        var generateRow = "<tr><th scope='row'>" + trainNum + "</th><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>";
        $("#train-table").append(generateRow);
        console.log(generateRow);
    };
};

//▓▓▓▓▓ push user inputted values to array ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

//FUNCTION TO PUSH VALUES TO ARRAY AS AN OBJECT
$("#submit-button").click(function() {
    event.preventDefault()

    var obj = {
        name: $("#train-name").val().trim(),
        destination: $("#train-destination").val().trim(),
        time: $("#train-time").val().trim(),
        frequency: parseInt($("#train-freq").val().trim(), 10),
    };

    tableArray.push(obj);
    $("#train-name, #train-destination, #train-time, #train-freq").val('');
    console.log(obj);
    console.log(tableArray);

    renderTable();
});

//▓▓▓▓▓ calculate next arrival ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

function calcNextArrival(currentTime, firstTrain, trainFrequency) {
    if (currentTime < firstTrain) {
        return firstTrain
    } else {
        while (currentTime > firstTrain) {
            firstTrain += trainFrequency;
            if (firstTrain >= currentTime) {
                return firstTrain;
            };
        };
    };
};

//▓▓▓▓▓ calculate minutes away ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

function calcMinutesAway(currentTime, nextTrain) {
    return parseInt(nextTrain - currentTime, 10);
};

//▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓



//▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓



//▓▓▓▓▓ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓



//▓▓▓▓▓ pseudocode ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

/* 

click event for SUBMIT button
 - takes .val of each form group and runs the CALCULATE function and appends all the neccesary info to the table.

CALCULATE function
 - uses moment.js and logic to take the .val of #first-train-time and #train-freq and output *next arrival and *minutes away, along with name, destination and frequency, directly.
    //if (now < first-train-time)
        find minutes between now and first-train-time --> MINUTESAWAY
    //else ()
        while (now > first-train-time)

    //this output is pushed as an object to the table array, then the RENDERTABLE function is called.

RENDERTABLE function
 - takes the information in the tableArray and appends that information in the form of a table.

*/

/* if (now < firstTime) {
    firstTime.subtract(now.format())
}

var firsttraintime = 10;
var now = 45;
var freq = 30;

//
var nextTrain = firsttraintime;

while (now > nextTrain) {
        nextTrain + [i].frequency;    */     
 //after this take the value of nextTrain and the difference of it and now --> MINUTESAWAY

/* var regEx = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/; */

renderTable();