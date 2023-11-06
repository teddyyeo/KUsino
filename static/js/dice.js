function roll(a,b){
    const textToChange1 = document.getElementById('textToChange1');
    const textToChange2 = document.getElementById('textToChange2');

    const one = '⚀';
    const two = '⚁';
    const three = '⚂';
    const four = '⚃';
    const five = '⚄';
    const six = '⚅';

    let first, second;

    first = a-1;
    second = b-1;

    arr = [one, two, three, four, five, six];

    const totalIterations = 20;
    let currentIteration = 0;
  
    function changeText() {
        if (currentIteration < totalIterations) {            
            textToChange1.textContent = arr[Math.floor(Math.random() * 6)];
            textToChange2.textContent = arr[Math.floor(Math.random() * 6)];
    
            currentIteration++;
            
            if (currentIteration === totalIterations) {
                textToChange1.textContent = arr[first];
                textToChange2.textContent = arr[second];
            } else {
                setTimeout(changeText, 40);
            }
        }
    }
  
    changeText();
};
  