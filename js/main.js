function createProcessTable() {
    const numProcesses = parseInt(document.getElementById('numProcesses').value);
    const processTableContainer = document.getElementById('processTableContainer');
    processTableContainer.innerHTML = ''; 

    let table = '<table id="processTable"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th>';

    const schedulingType = document.getElementById('schedulingType').value;
    if (schedulingType === 'Priority') {
        table += '<th>Priority</th>';
    }

    table += '<th>Completion Time</th><th>Turnaround Time</th><th>Waiting Time</th></tr>';

    for (let i = 0; i < numProcesses; i++) {
        table += `<tr>
            <td>Process ${i + 1}</td>
            <td><input type="number" id="arrival${i}" required></td>
            <td><input type="number" id="burst${i}" required></td>`;
        if (schedulingType === 'Priority') {
            table += `<td><input type="number" id="priority${i}" required></td>`;
        }
        table += `<td class="completion"></td><td class="turnaround"></td><td class="waiting"></td>`;
        table += '</tr>';
    }
    table += '</table>';
    processTableContainer.innerHTML = table;

    document.getElementById('calculateButton').style.display = 'inline-block';

    showPriorityType();
}

function showPriorityType() {
    const schedulingType = document.getElementById('schedulingType').value;
    const priorityTypeGroup = document.getElementById('priorityTypeGroup');
    const quantumGroup = document.getElementById('quantumGroup');

    priorityTypeGroup.style.display = schedulingType === 'Priority' ? 'block' : 'none';
    quantumGroup.style.display = schedulingType === 'RoundRobin' ? 'block' : 'none';
}

function calculateScheduling() {
    const schedulingType = document.getElementById('schedulingType').value;
    const numProcesses = parseInt(document.getElementById('numProcesses').value);
    const processes = [];

    for (let i = 0; i < numProcesses; i++) {
        processes.push({
            id: i + 1,
            arrival: parseInt(document.getElementById(`arrival${i}`).value),
            burst: parseInt(document.getElementById(`burst${i}`).value),
            priority: schedulingType === 'Priority' ? parseInt(document.getElementById(`priority${i}`).value) : 0,
            remaining: parseInt(document.getElementById(`burst${i}`).value),
            completed: false,
            start: 0,
            completion: 0,
            turnaround: 0,
            waiting: 0
        });
    }

    switch(schedulingType) {
        case 'FCFS':
            fcfsScheduling(processes);
            break;
        case 'SJF':
            sjfScheduling(processes);
            break;
        case 'SRTF':
            srtfScheduling(processes);
            break;
        case 'Priority':
            const priorityType = document.getElementById('priorityType').value;
            if (priorityType === 'preemptive') {
                preemptivePriorityScheduling(processes);
            } else {
                nonPreemptivePriorityScheduling(processes);
            }
            break;
        case 'RoundRobin':
            const timeQuantum = parseInt(document.getElementById('timeQuantum').value);
            roundRobinScheduling(processes, timeQuantum);
            break;
    }
}

function updateProcessTable(process) {
    const row = document.querySelector(`#processTable tr:nth-child(${process.id + 1})`);
    row.querySelector('.completion').textContent = process.completion;
    row.querySelector('.turnaround').textContent = process.turnaround;
    row.querySelector('.waiting').textContent = process.waiting;
}

function calculateAverages(processes) {
    const avgWaiting = processes.reduce((sum, p) => sum + p.waiting, 0) / processes.length;
    const avgTurnaround = processes.reduce((sum, p) => sum + p.turnaround, 0) / processes.length;

    document.getElementById('avgWaitingTime').textContent = avgWaiting.toFixed(2);
    document.getElementById('avgTurnaroundTime').textContent = avgTurnaround.toFixed(2);
}