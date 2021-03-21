function convertDateToUTC(date) {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

function generateTable(data, doctor, onClickFunc) {
    data = data.filter((d) => d.doctor === doctor);
    let table = document.createElement('table');
    let thead = table.createTHead();
    let row = thead.insertRow(0);
    row.insertCell();
    let date = new Date();
    let dates = [];
    // First row, labelling dates
    for (let i = 1; i <= 7; i++) {
        let newCell = row.insertCell();
        newCell.classList.add('p-4');
        newCell.innerText = date.toLocaleDateString('en-US');
        dates.push(newCell.innerText);
        date.setDate(date.getDate() + 1);
    }

    // Creating all open slots for each hour
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17].forEach((num) => {
        let newRow = table.insertRow();
        let timeCell = newRow.insertCell();
        timeCell.classList.add('p-2');
        timeCell.innerText = String(num).padStart(2, '0') + ':00';
        for (let i = 0; i < 7; i++) {
            let newCell = newRow.insertCell();
            newCell.classList.add('p-2', 'open-slot', 'cursor-pointer');
            newCell.innerText = 'Open';
            newCell.id = `${dates[i]}-${num}`;
            if (onClickFunc) {
                newCell.onclick = (e) => {
                    try {
                        document
                            .getElementsByClassName('bg-green-600')[0]
                            .classList.remove('bg-green-600');
                    } catch {}
                    e.target.classList.add('bg-green-600', 'opacity-75');
                };
            }
        }
    });

    // Populating the table with slots that are booked
    data.forEach((d) => {
        const date = new Date(d.date + ' UTC');
        const cell = document.getElementById(
            `${date.toLocaleDateString()}-${date.getHours()}`
        );
        cell.innerHTML = 'Booked';
        cell.onclick = () => false;
        cell.classList.remove('open-slot');
        cell.classList.add(...'bg-indigo-600 opacity-75 text-white'.split(' '));
    });

    return table;
}

let bookingData;

document.addEventListener('DOMContentLoaded', () => {
    // Show form on "Book Now!" button click
    document.getElementById('book-now').onclick = (e) => {
        if (!Object.keys(localStorage).includes('jwt')) {
            alert('Members only!');
        } else {
            document.getElementById('remove').remove();
            const pages = document.getElementsByClassName('page');
            for (let i = 0; i < pages.length; i++) {
                pages[i].classList.add('hidden');
            }
            document.getElementById('book').classList.remove('hidden');

            // Update table
            fetch('/booking/all', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        localStorage.clear();
                        alert('Please sign in again');
                        window.location.pathname = '/creds.html';
                    }
                })
                .then((res) => res.json())
                .then((res) => {
                    bookingData = res;
                    let secondDoctor = document.getElementById(
                        'ye-which-doctor'
                    );
                    secondDdoctor = doctor.options[doctor.selectedIndex].value;
                    let secondTable = generateTable(res, secondDoctor, true);
                    secondTable.id = 'yes-edit';
                    document
                        .getElementById('yes-edit')
                        .replaceWith(secondTable);
                })
                .catch((err) => {
                    alert('Something went wrong');
                });
        }
    };

    // Select booking time slot
    openSlots = document.getElementsByClassName('open-slot');
    for (let i = 0; i < openSlots.length; i++) {
        openSlots[i].onclick = (e) => {
            try {
                document
                    .getElementsByClassName('bg-green-600')[0]
                    .classList.remove('bg-green-600');
            } catch {}
            e.target.classList.add('bg-green-600', 'opacity-75');
        };
    }

    // Update schedule for each doctor
    document.getElementById('which-doctor').onchange = (e) => {
        let doctor = e.target;
        doctor = doctor.options[doctor.selectedIndex].value;
        let table = generateTable(res, doctor, true);
        table.id = 'yes-edit';
        document.getElementById('yes-edit').replaceWith(table);
    };

    // Submit appointment on submit
    document.getElementById('book-submit').onclick = (e) => {
        const token = localStorage.getItem('jwt');
        try {
            const booking = document.getElementsByClassName('bg-green-600')[0];
            const time = booking.id.split('-')[1];
            const date = booking.id.split('-')[0];
            let datetime = new Date(date + ' ' + time);
            datetime = convertDateToUTC(datetime);
            let doctor = document.getElementById('doctor');
            doctor = doctor.options[doctor.selectedIndex].value;
            const reason = document.getElementById('reason').value;
            fetch('/booking/add', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    date: datetime,
                    time,
                    doctorName,
                    reason,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        localStorage.clear();
                        alert('Please sign in again');
                        window.location.pathname = '/creds.html';
                    } else {
                        alert('Successful booking');
                    }
                })
                .catch((err) => {
                    alert('Something went wrong!');
                });
        } catch {
            alert('Please select an appointment');
        }
    };
});
