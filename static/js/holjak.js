function roll(a) {
    const textToChange1 = document.getElementById('textToChange1');
    const textToChange2 = document.getElementById('textToChange2');
    const textToChange3 = document.getElementById('textToChange3');
    const textToChange4 = document.getElementById('textToChange4');
    const textToChange5 = document.getElementById('textToChange5');
    const textToChange6 = document.getElementById('textToChange6');
    const textToChange7 = document.getElementById('textToChange7');
    const textToChange8 = document.getElementById('textToChange8');
    const answerText = document.getElementById('answer');
    
    arr = [0, 1, 2, 3, 4, 5, 6, 7];

    function getRandomItems(arr, num) {
        const result = [];
        const length = arr.length;
    
        if (num > length) {
            throw new Error('Number of items to extract exceeds the array length');
        }
    
        while (result.length < num) {
            const randomIndex = Math.floor(Math.random() * length);
            if (result.indexOf(arr[randomIndex]) === -1) {
                result.push(arr[randomIndex]);
            }
        }
    
        return result;
    }

    yes_or_no = ['🪙', ' '];

    let answer = a;
    exist_coin = getRandomItems(arr, answer);

    const totalIterations = 10;
    let currentIteration = 0;
    let interval = 250;

    function changeText() {
        if (currentIteration < totalIterations) {

            textToChange1.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange2.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange3.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange4.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange5.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange6.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange7.textContent = yes_or_no[Math.floor(Math.random() * 2)];
            textToChange8.textContent = yes_or_no[Math.floor(Math.random() * 2)];

            currentIteration++;
            
            if (currentIteration == totalIterations) {
                if (exist_coin.includes(0))
                    textToChange1.textContent = '🪙';
                else
                    textToChange1.textContent = ' ';

                if (exist_coin.includes(1))
                    textToChange2.textContent = '🪙';
                else
                    textToChange2.textContent = ' ';

                if (exist_coin.includes(2))
                    textToChange3.textContent = '🪙';
                else
                    textToChange3.textContent = ' ';

                if (exist_coin.includes(3))
                    textToChange4.textContent = '🪙';
                else
                    textToChange4.textContent = ' ';
                
                if (exist_coin.includes(4))
                    textToChange5.textContent = '🪙';
                else
                    textToChange5.textContent = ' ';

                if (exist_coin.includes(5))
                    textToChange6.textContent = '🪙';
                else
                    textToChange6.textContent = ' ';

                if (exist_coin.includes(6))
                    textToChange7.textContent = '🪙';
                 else
                    textToChange7.textContent = ' ';

                if (exist_coin.includes(7))
                    textToChange8.textContent = '🪙';
                else
                    textToChange8.textContent = ' ';

                answerText.textContent = 'THE ANSWER IS : ' + answer;
            } else {
                setTimeout(changeText, interval);
            }
        }
    }
  
    changeText();
};
  