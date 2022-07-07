const date = new Date();
let chosen_date = new Date();

const renderCalendar = ()=>{
    
    date.setDate(1);
    console.log(date.getDay());
    document.querySelector('.date p').innerHTML = date.toDateString(); // reload for every day


    var monthDays = document.querySelector('.days');

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // the last day of current month 

    var prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // the last day of previus month, it's 30

    var firstDayIndex = date.getDay(); // get a Index

    var lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay(); // the last day in sunday then 31 it will be 0

    var nextDays = 7 - lastDayIndex - 1;

    var months = ["January","February","March","April","May","June","July","August","September","October","November","December",];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    
    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date" onclick="moveData('prev')">${prevLastDay - x + 1}</div>`; // + 1 it's for 30 bulishi uchun
    }

    for (let i = 1; i <= lastDay; i++) {
        if(i === chosen_date.getDate() && date.getMonth() === chosen_date.getMonth()){
            days += `<div class="active"  onclick="choose_date(${i},${date.getMonth()},${date.getFullYear()})">${i}</div>`;
            document.querySelector('.date p').innerHTML = chosen_date.toDateString(); // reload for every day
        }
        else{
            days += `<div onclick="choose_date(${i},${date.getMonth()},${date.getFullYear()})">${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date" onclick="moveData('next')">${j}</div>`;
    }

    monthDays.innerHTML = days;

}

function moveData(pagination){
    if(pagination === 'prev'  ){
        date.setMonth(date.getMonth() - 1);
    }
    else if(pagination === 'next'){
        date.setMonth(date.getMonth() + 1);
    }
    else if(pagination === 'today'){
        location.reload();
    }
    renderCalendar();
    
}

function moveKey(e){
    if (e){
        switch(e.key){
            case "ArrowLeft":
                moveData('prev');
                renderCalendar();
            break;
            case "ArrowRight":
                moveData('next');
                renderCalendar();
            break;
        }
    }
}
addEventListener("keydown", moveKey);

// document.querySelector('.prev').addEventListener("click", () => {
//     date.setMonth(date.getMonth() - 1);
//     renderCalendar();
// })

// document.querySelector('.next').addEventListener("click", () => {
//     date.setMonth(date.getMonth() + 1);
//     renderCalendar();
// })

renderCalendar();

function choose_date(d, m, y){
    chosen_date.setDate(d);
    chosen_date.setMonth(m);
    chosen_date.setFullYear(y);
    renderCalendar();
}