const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            countToTal = 0,
            interval = null;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }
        

        const counted = () => {
            if (countToTal < total) {
                countToTal += 10;
                totalValue.textContent = countToTal;
            }

            if (countToTal === total) {
                cancelAnimationFrame(interval);
            }

            interval = requestAnimationFrame(counted, 1);
        };
        
        counted();
    };

    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
            countSum();
            
        }

    });
};

export default calc;