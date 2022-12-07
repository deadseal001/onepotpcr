const inquirer = require('inquirer');
//const chalk = require('chalk');
//import chalk from 'chalk';

const calnumber=(a,b,c)=>{
    //set array number 
    if (c===1){
        console.log("Attention! the PCR product won't be amplified by adaptor primer!");
    }

    let arr=[];
    for (let i=0; i<a; i++){
        arr[i]=i+1;
    }
    let arr1=[];
    arr.map(element=>arr1.push(element));
    let arr2=arr.reverse();
    let templateArr1=[];
    let templateArr2=[];
    let productArr1=[];
    let productArr2=[]

    for (let j=0; j<c; j++){
        productArr1=[];
        productArr2=[];

        if (j===0){
            console.log("cycle else "+(j+1));
            templateArr1.push(arr1);
            templateArr2.push(arr2);
        }
        else if (j===c-1){
            console.log("cycle "+(j+1));
        } else {
            console.log("cycle else "+(j+1));
            templateArr1.push(arr1);
            templateArr2.push(arr2);
        } 
        console.log("  template: ",templateArr1,templateArr2);

        for (let i=0;i<templateArr1.length;i++){
            //push pcr product into new array
            for (let k=0; k<templateArr1[i].length;k++){
                    newArr1=templateArr1[i];
                    newArr2=templateArr2[i];
                let tempArr1=newArr1.slice(k,Math.min(b+k,templateArr1[i].length))
                let tempArr2=newArr2.slice(k,Math.min(b+k,templateArr2[i].length))
                productArr1.push(tempArr1); 
                productArr2.push(tempArr2); 
            }
        }
        templateArr1=productArr1;
        templateArr2=productArr2;
    }

    let productArr=productArr1.concat(productArr2);
    console.log(productArr.length);
    console.log(productArr);
    let lengthArr=[]
    let midnumber=Math.floor(a/2);
    let midArry=[];
    let midLengthArr=[];
    for (let i=0;i<productArr.length;i++){
        productArr[i].sort(function(a, b){return a - b});
        lengthArr.push(productArr[i].length);
        if (productArr[i].includes(arr[midnumber])){
            midArry.push(productArr[i]);
            midLengthArr.push(productArr[i].length);
        }
    }
    console.log(lengthArr);
    console.log("fragment containing middle fragment",midArry,midArry.length);
    console.log(midLengthArr,midLengthArr.length);


}

function calculate () {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'primersetnumber',
                message: 'Please enter the primer set number for onePOT PCR(required):',
                validate: Input=>{
                    if (!Number.isInteger(Input)){
                        console.log("The primer set number must be integer number larger than 0!");
                    } else if (Input <0) {
                        console.log("The primer set number must be integer number larger than 0!");
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'number',
                name: 'extentnumber',
                message: 'Please enter the estimate of primer numbers that one pcr cycle can cover(required, >=1):',
                validate: Input=>{
                    if (!Number.isInteger(Input)){
                        console.log("The input number must be integer number larger than 0!");
                    } else if (Input <0) {
                        console.log("The input number must be integer number larger than 0!");
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'number',
                name: 'firstcycles',
                message: 'Please enter the cycles nubmer for phi29 PCR (required, >=1):',
                validate: Input=>{
                    if (!Number.isInteger(Input)){
                        console.log("The input number must be integer number and larger than 0!");
                    } else if (Input <0) {
                        console.log("The input number must be integer number and larger than 0!");
                    } else {
                        return true;
                    }
                }
            }
        ])
        .then (Input=>{
            calnumber(Input.primersetnumber,Input.extentnumber,Input.firstcycles);
           
        })
}


calculate();