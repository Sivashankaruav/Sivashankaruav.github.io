//Global variable to store the result of the CSV file
var result = [];

//Function read a CSV file with headers date,in,out,amount,io_tag,account,dec and return there values in a dictionary
function readCSVFile(file) {
    var lines = file.split('\n');
    var headers = ["Date", "Dec", "Amount"];
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(',');
        
        obj[headers[0]] = currentline[0];
        obj[headers[2]] = currentline[currentline.length - 1];
        //if the current line length is more that 3 then the dec is addition on currentline[1] and currentline[2]
        //else the dec is on currentline[1]
        if (currentline.length > 3) {
            obj[headers[1]] = currentline[1] + currentline[2];
        } else{
            obj[headers[1]] = currentline[currentline.length - 2];
        }     
        result.push(obj);
    }
    return result;
}

function readSummeryCSV(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = readCSVFile(e.target.result);
        // console.log(data);
    }
    reader.readAsText(file);
}

function listResults() {
    //Create a table element and lsit all elements in the result
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var headers = ["Date", "Dec", "Amount"];
    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement('th');
        th.textContent = headers[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);
    for (var i = 0; i < result.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < headers.length; j++) {
            var td = document.createElement('td');
            td.textContent = result[i][headers[j]];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);
    //insert the table in div id element result
    document.getElementById('result').appendChild(table);
}

//Writa a function to read each recode in the result and insert them in 
//summery object with the key as date,io_dir,amount,io_tag,account,dec
function createSummery() {
    var summery = {};
    for (var i = 0; i < result.length; i++) {
        var date = result[i].Date;
        if (summery[date] == undefined) {
            summery[date] = [];
        }
        var obj = {};
        obj["io_dir"] = result[i].Amount > 0 ? "in" : "out";
        obj["amount"] = result[i].Amount;
        obj["io_tag"] = result[i].Amount > 0 ? "income" : "expense";
        obj["account"] = "cash";
        obj["dec"] = result[i].Dec;
        summery[date].push(obj);
    }
    return summery;
}