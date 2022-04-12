const studentArray = [{
        sname: 'Сидоров',
        fname: 'Иван',
        lname: 'Михайлович',
        bdate: '1986-05-06',
        startlearn: '2019',
        fac: 'Физики'
    },
    {
        sname: 'Сидорова',
        fname: 'Мария',
        lname: 'Михайловна',
        bdate: '1994-11-05',
        startlearn: '2018',
        fac: 'Астрономии'
    },
    {
        sname: 'Сорокина',
        fname: 'Елена',
        lname: 'Алексеевна',
        bdate: '1992-01-01',
        startlearn: '2008',
        fac: 'Математики'
    },
    {
        sname: 'Андропов',
        fname: 'Александр',
        lname: 'Петрович',
        bdate: '1992-10-03',
        startlearn: '2003',
        fac: 'Информатики'
    },
    {
        sname: 'Никифоров',
        fname: 'Олег',
        lname: 'Олегович',
        bdate: '2004-12-24',
        startlearn: '2004',
        fac: 'Химии'
    }
];


const container = document.getElementById('container');
const form = document.getElementById('form');



//Функция вычисления точного возраста
function getAge(date) {
    let cur = new Date();
    let tar = new Date(date);

    let age = cur.getFullYear() - tar.getFullYear() - 1;

    if (cur.getMonth() > tar.getMonth()) {
        age++;
    } else if (cur.getMonth() === tar.getMonth() && cur.getDate() >= tar.getDate()) {
        age++;
    }
    return age;
}

//Функция "Лет" "Год"
function getAgeText(age) {
    let txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'лет';
    } else {
        count = count % 10;
        if (count == 1) {
            txt = 'год';
        } else if (count >= 2 && count <= 4) {
            txt = 'года';
        } else {
            txt = 'лет';
        }
    }
    return txt;
}



function buildTable(arr) {
    const table = document.getElementById('table');

    if (document.querySelector('tbody')) {
        document.querySelector('tbody').remove();
    }

    const tBody = document.createElement('tbody');
    table.append(tBody);



    arr.forEach(item => {
        let tr = document.createElement('tr');

        let objFullName = item.sname + " " + item.fname + " " + item.lname;
        let studDate = item.bdate;
        let studentDateForHtml = new Date(studDate).toLocaleDateString();

        let startLearnYears = item.startlearn;
        let finishLearnYears = +startLearnYears + 4;

        //Функция вычисления курса
        let currentCourse;
        if (finishLearnYears < new Date().getFullYear()) {
            currentCourse = 'закончил';
        } else if (finishLearnYears === new Date().getFullYear() && new Date().getMonth() > 8) {
            currentCourse = 'закончил';
        } else {
            currentCourse = new Date().getFullYear() - startLearnYears + ' курс';
        }

        let age = getAge(studDate);
        let txt = getAgeText(age);



        tr.innerHTML =
            `
                <td>${objFullName}</td>
                <td>${item.fac}</td>
                <td>${studentDateForHtml} (${getAge(studDate)} ${txt})</td>
                <td>${startLearnYears} - ${finishLearnYears} (${currentCourse})</td>
                
            `;

        tBody.append(tr);
    })
}
buildTable(studentArray);



const fName = document.getElementById('fname');
const sName = document.getElementById('sname');
const lName = document.getElementById('lname');
const fac = document.getElementById('fac');
const birthDate = document.getElementById('birthdate');
birthDate.max = new Date().toISOString().split("T")[0];

const learnDate = document.getElementById('learndate');
learnDate.max = new Date().getFullYear();


function checkInput(value, element) {
    if (value === '') {
        element.classList.add('invalid');
        return false;
    } else {
        element.classList.remove('invalid');
        return true;
    }
}



fName.addEventListener('input', function (e) {
    checkInput(e.target.value, fName);
})
sName.addEventListener('input', function (e) {
    checkInput(e.target.value, sName);
})
lName.addEventListener('input', function (e) {
    checkInput(e.target.value, lName);
})
fac.addEventListener('input', function (e) {
    checkInput(e.target.value, fac);
})
birthDate.addEventListener('change', function (e) {
    checkInput(e.target.value, birthDate);
})
learnDate.addEventListener('change', function (e) {
    checkInput(e.target.value, learnDate);
})


form.addEventListener('submit', function (e) {
    e.preventDefault();

    let newStudentObj = {};
    newStudentObj.fname = fName.value.trim();
    newStudentObj.sname = sName.value.trim();
    newStudentObj.lname = lName.value.trim();
    newStudentObj.fac = fac.value.trim();
    newStudentObj.bdate = birthDate.value;
    newStudentObj.startlearn = learnDate.value;


    if (checkInput(newStudentObj.fname, fName) &&
        checkInput(newStudentObj.sname, sName) &&
        checkInput(newStudentObj.lname, lName) &&
        checkInput(newStudentObj.fac, fac) &&
        checkInput(newStudentObj.bdate, birthDate) &&
        checkInput(newStudentObj.startlearn, learnDate)) {

        console.log(newStudentObj);

        studentArray.push(newStudentObj);

        buildTable(studentArray);
        console.log(studentArray);
        form.reset();
    }


});