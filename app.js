
    const startBtn = document.querySelector('.start');
    const screens = document.querySelectorAll('.screen');
    const timeList = document.querySelector('#time-list');
    const timeEl = document.querySelector('#time');
    const board = document.querySelector('#board');
    const colors = ['IndianRed','LightCoral','Salmon','DarkSalmon','LightSalmon','Crimson','Red','FireBrick','DarkRed','LawnGreen','Lime','LimeGreen','PaleGreen','LightGreen','MediumSpringGreen','SpringGreen','MediumSeaGreen','SeaGreen','ForestGreen','Green','DarkGreen','YellowGreen','OliveDrab','Olive','DarkOliveGreen','MediumAquamarine','DarkSeaGreen','LightSeaGreen','DarkCyan','Teal','LightSalmon','Coral','Tomato','OrangeRed','DarkOrange',	'Orange','LightSkyBlue',	'DeepSkyBlue',	'DodgerBlue',	'CornflowerBlue',	'MediumSlateBlue',	'RoyalBlue',	'Blue','Plum',	'Violet',	'Orchid',	'Fuchsia',	'Magenta',	'MediumOrchid','MediumPurple','BlueViolet','DarkViolet','DarkOrchid','DarkMagenta','Purple','Gold','Yellow','LightYellow'];
    let time = 0;
    let score = 0;

    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        screens[0].classList.add('up');
    })

    timeList.addEventListener('click', (event) => {
        if(event.target.classList.contains('time-btn')) {
            time = parseInt(event.target.getAttribute('data-time'));
            screens[1].classList.add('up');
            startGame();
        }
    })

    board.addEventListener('click', event => {
        if (event.target.classList.contains('circle')) {
            ++score;
            event.target.remove();
            createCircle();
        }
    })

    function startGame() {
        setInterval(decreaseTime, 1000);
        setTime(time);
        createCircle();
    }

    function decreaseTime() {
        if(time === 0) {
            finishGame();
        } else {
            let currentTime = --time;
            if(time < 10) {
                currentTime = `0${currentTime}`;
            }
            setTime(currentTime);
        }
    }

    function setTime(value) {
        timeEl.innerHTML = `00:${value}`;
    }

    function finishGame() {
        timeEl.parentNode.classList.add('hide');
        board.innerHTML = `<h1>Счет: <span class ='primary'>${score}</span></h1> <button class='oneMoreBtn'>Еще раз?</button>`
        document.querySelector('.oneMoreBtn').addEventListener('click', () => {
            location.reload();
        });
    }

    function createCircle() {
        const circle = document.createElement('div');
        const size = getRandomSize(10,60);
        const {width, height} = board.getBoundingClientRect();
        const x = getRandomSize(0, width - size);
        const y = getRandomSize(0, height - size);
        const color = getRandomColor();
        circle.classList.add('circle');
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.top = `${y}px`;
        circle.style.left = `${x}px`;
        circle.style.background = `${color}`;
        circle.style.boxShadow = `0 0 15px ${color}`;
        board.append(circle);
    }

    function getRandomSize(min, max) {
        return Math.floor(Math.random() * (max-min) + min);
    }

    function getRandomColor() {
        const index = Math.floor(Math.random() * colors.length);
        return colors[index];
    }

