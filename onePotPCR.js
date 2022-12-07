const inquirer = require('inquirer');
// import chalk from 'chalk';

const calnumber=(a,b,c)=>{
    //set array number 
    let arr=[];
    for (let i=0; i<a; i++){
        arr[i]=i+1;
    }
    let arr1=[];
    arr.map(element=>arr1.push(element));
    let arr2=arr.reverse();
    let templateArr1=[arr1];
    let templateArr2=[arr2];
    let productArr1=[];
    let productArr2=[]

    for (let j=0; j<c; j++){
        productArr1=[];
        productArr2=[];

        if (j!=c-1){
        templateArr1.push(arr1);
        templateArr2.push(arr2);
        } 

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
    let lengthArr=[]
    for (i=0;i,productArr.length;i++){
        let temp=productArr[i];//.join('');
        console.log(temp);
        let len=temp.length;
        lengthArr.push(len);
    }
    console.log(lengthArr);
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
                message: 'Please enter the estimate how many primers that one pcr cycle can cover(required, >=1):',
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