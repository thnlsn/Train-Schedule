$(document).ready(function() {
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

    function calcMinutesAway(currentTime, nextTrain) {
        return parseInt(nextTrain - currentTime, 10);
    };
    
    
    var ref = firebase.database().ref();
    ref.on('value', gotData);
    
    function gotData(data) {
        console.log(data.val());
        var trains = data.val();
        var keys = Object.keys(trains);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var trainName = trains[k].newName;
            var trainDest = trains[k].newDest;
            var trainTime = trains[k].newTime;
            var trainFreq = trains[k].newFreq;
            
            var m = moment(new Date());
            var timeNow = (m.hour()*60) + m.minute();
            console.log("timenow = " + timeNow); //THE TIME NOW
            var n = (moment.duration(trainTime).asHours())*60;
    
            var nextArrival = moment().startOf('day').add(calcNextArrival(timeNow, n, trainFreq), 'minutes').format('hh:mm A')
            var nextArrivalInMinutes = calcNextArrival(timeNow, n, trainFreq);
            console.log(calcNextArrival(timeNow, n, trainFreq)); //NEXT ARRIVAL IN TOTAL MINUTES
            console.log(nextArrival); //THE NEXT ARRIVAL IN CORRECT FORMAT
    
            //COLUMN 5 MINUTESAWAY
            var minutesAway = calcMinutesAway(timeNow, nextArrivalInMinutes);
            console.log(minutesAway);
            var generateRow = "<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>"
            $("#train-table").append(generateRow);
            console.log(generateRow);
        };
        ref.off('value', gotData);
    }
    function errData(err) {
        console.log('error!!!');
        console.log(err);
    }
});

var now = moment().format("hh:mm");
console.log(now);
//▓▓▓▓▓ array for table ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

//THIS INFORMATION IS USED TO FIND
    //*TRAIN NAME*
    //*DESTINATION*
    //*FREQUENCY*
    //*NEXT ARRIVAL*
    //*MINUTES AWAY*

//▓▓▓▓▓ render table function ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

//THIS WILL BE INVOKED IN THE BUTTON CLICK EVENT

//▓▓▓▓▓ push user inputted values to array ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

//FUNCTION TO PUSH VALUES TO ARRAY AS AN OBJECT
$("#submit-button").click(function() {
    $("#train-table").empty;
    event.preventDefault()

    var obj = {
        name: $("#train-name").val().trim(),
        destination: $("#train-destination").val().trim(),
        time: $("#train-time").val().trim(),
        frequency: parseInt($("#train-freq").val().trim(), 10),
    };
    firebase.database().ref().push({
        newName: obj.name,
        newDest: obj.destination,
        newTime: obj.time,
        newFreq: obj.frequency
      }, function(error) {
        if (error) {
          console.log("error")
        } else {
          console.log("success")
        }
      });
      var m = moment(new Date());
      var timeNow = (m.hour()*60) + m.minute();
      console.log("timenow = " + timeNow); //THE TIME NOW
      var n = (moment.duration(obj.time).asHours())*60;
      console.log("firsttraintime = " + n); //THE FIRST TRAIN TIME

      var nextArrival = moment().startOf('day').add(calcNextArrival(timeNow, n, obj.frequency), 'minutes').format('hh:mm A')
      var nextArrivalInMinutes = calcNextArrival(timeNow, n, obj.frequency);
      console.log(calcNextArrival(timeNow, n, obj.frequency)); //NEXT ARRIVAL IN TOTAL MINUTES
      console.log(nextArrival); //THE NEXT ARRIVAL IN CORRECT FORMAT

      //COLUMN 6 MINUTESAWAY
      var minutesAway = calcMinutesAway(timeNow, nextArrivalInMinutes);
      console.log(minutesAway);
      console.log("------------");

      var generateRow = "<tr><td>" + obj.name + "</td><td>" + obj.destination + "</td><td>" + obj.frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>";
      $("#train-table").append(generateRow);
    $("#train-name, #train-destination, #train-time, #train-freq").val('');
    console.log(obj);
    console.log(tableArray);

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
