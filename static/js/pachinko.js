function roll(a,b,c,d,e,f,g,h,i){
    const textToChange1 = document.getElementById('textToChange1');
    const textToChange2 = document.getElementById('textToChange2');
    const textToChange3 = document.getElementById('textToChange3');
    const textToChange4 = document.getElementById('textToChange4');
    const textToChange5 = document.getElementById('textToChange5');
    const textToChange6 = document.getElementById('textToChange6');
    const textToChange7 = document.getElementById('textToChange7');
    const textToChange8 = document.getElementById('textToChange8');
    const textToChange9 = document.getElementById('textToChange9');

    let first, second, third, fourth, fifth, sixth, seventh, eighth, nineth;

    
    first = Math.floor(Math.random() * 10);
    second = Math.floor(Math.random() * 10);
    third = Math.floor(Math.random() * 10);
    fourth = Math.floor(Math.random() * 10);
    fifth = Math.floor(Math.random() * 10);
    sixth = Math.floor(Math.random() * 10);
    seventh = Math.floor(Math.random() * 10);
    eighth = Math.floor(Math.random() * 10);
    nineth = Math.floor(Math.random() * 10);
    

    
    first = a;
    second = b;
    third = c;
    fourth = d;
    fifth = e;
    sixth = f;
    seventh = g;
    eighth = h;
    nineth = i;
    

    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let interval = 10;
    const totalIterations = interval * 9 + 1;
    let currentIteration = 0;

    function changeText() {
        if (currentIteration < totalIterations) {
            if (currentIteration < interval * 1)
                textToChange1.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 1 + 1)
                textToChange1.textContent = arr[first];

            if (currentIteration < interval * 2)
                textToChange2.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 2 + 1)
                textToChange2.textContent = arr[second];

            if (currentIteration < interval * 3)
                textToChange3.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 3 + 1)
                textToChange3.textContent = arr[third];

            if (currentIteration < interval * 4)
                textToChange4.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 4 + 1)
                textToChange4.textContent = arr[fourth];

            if (currentIteration < interval * 5)
                textToChange5.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 5 + 1)
                textToChange5.textContent = arr[fifth];

            if (currentIteration < interval * 6)
                textToChange6.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 6 + 1)
                textToChange6.textContent = arr[sixth];

            if (currentIteration < interval * 7)
                textToChange7.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 7 + 1)
                textToChange7.textContent = arr[seventh];

            if (currentIteration < interval * 8)
                textToChange8.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 8 + 1)
                textToChange8.textContent = arr[eighth];

            if (currentIteration < interval * 9)
                textToChange9.textContent = arr[Math.floor(Math.random() * 10)];
            if (currentIteration == interval * 9)
                textToChange9.textContent = arr[nineth];

            currentIteration++;
            /*
            if (currentIteration === totalIterations) {
                textToChange1.textContent = arr[first];
                textToChange2.textContent = arr[second];
                textToChange3.textContent = arr[third];
                textToChange4.textContent = arr[fourth];
                textToChange5.textContent = arr[fifth];
                textToChange6.textContent = arr[sixth];
                textToChange7.textContent = arr[seventh];
                textToChange8.textContent = arr[eighth];
                textToChange9.textContent = arr[nineth];
            } else {
                setTimeout(changeText, 25);
            }*/
            setTimeout(changeText, 25);
        }
    }
  
    changeText();
};
  