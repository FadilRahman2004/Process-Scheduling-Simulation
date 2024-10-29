function nonPreemptivePriorityScheduling(processes) {
    let currentTime = 0;
    let completed = 0;
    let ganttChart = [];

    processes.sort((a, b) => a.arrival - b.arrival);

    while (completed < processes.length) {
        let availableProcesses = processes.filter(p => 
            !p.completed && p.arrival <= currentTime
        );

        if (availableProcesses.length === 0) {
            currentTime++;
            continue;
        }

        availableProcesses.sort((a, b) => a.priority - b.priority);
        let highestPriorityProcess = availableProcesses[0];

        highestPriorityProcess.start = currentTime;
        highestPriorityProcess.completion = currentTime + highestPriorityProcess.burst;
        highestPriorityProcess.turnaround = highestPriorityProcess.completion - highestPriorityProcess.arrival;
        highestPriorityProcess.waiting = highestPriorityProcess.turnaround - highestPriorityProcess.burst;
        highestPriorityProcess.completed = true;

        ganttChart.push({
            id: highestPriorityProcess.id,
            start: currentTime,
            end: highestPriorityProcess.completion
        });

        currentTime = highestPriorityProcess.completion;
        completed++;
        updateProcessTable(highestPriorityProcess);
    }

    displayGanttChart(ganttChart);
    calculateAverages(processes);
}

function preemptivePriorityScheduling(processes) {
    let currentTime = 0;
    let completed = 0;
    let ganttChart = [];
    let currentProcess = null;
    let processStartTime = 0;

    const processesCopy = processes.map(p => ({...p}));

    while (completed < processes.length) {
        let availableProcesses = processesCopy.filter(p => 
            !p.completed && p.arrival <= currentTime && p.remaining > 0
        );

        if (availableProcesses.length === 0) {
            currentTime++;
            if (currentProcess) {
                ganttChart.push({
                    id: currentProcess.id,
                    start: processStartTime,
                    end: currentTime
                });
                currentProcess = null;
            }
            continue;
        }

        let highestPriorityProcess = availableProcesses.reduce((prev, curr) => 
            prev.priority < curr.priority ? prev : curr
        );

        if (currentProcess !== highestPriorityProcess) {
            if (currentProcess) {
                ganttChart.push({
                    id: currentProcess.id,
                    start: processStartTime,
                    end: currentTime
                });
            }
            currentProcess = highestPriorityProcess;
            processStartTime = currentTime;
        }

        currentProcess.remaining--;
        currentTime++;

        if (currentProcess.remaining === 0) {
            currentProcess.completed = true;
            currentProcess.completion = currentTime;
            currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
            currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
            
            ganttChart.push({
                id: currentProcess.id,
                start: processStartTime,
                end: currentTime
            });

            const originalProcess = processes.find(p => p.id === currentProcess.id);
            Object.assign(originalProcess, {
                completion: currentProcess.completion,
                turnaround: currentProcess.turnaround,
                waiting: currentProcess.waiting
            });

            updateProcessTable(originalProcess);
            currentProcess = null;
            completed++;
        }
    }

    displayGanttChart(ganttChart);
    calculateAverages(processes);
}