function roundRobinScheduling(processes, timeQuantum) {
    let currentTime = 0;
    let completed = 0;
    let ganttChart = [];
    let queue = [];
    
    const processesCopy = processes.map(p => ({
        ...p,
        remaining: p.burst,
        firstTime: true
    }));

    while (completed < processes.length) {
        processesCopy.forEach(p => {
            if (p.arrival <= currentTime && p.remaining > 0 && p.firstTime) {
                queue.push(p);
                p.firstTime = false;
            }
        });

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        let currentProcess = queue.shift();
        let executionTime = Math.min(timeQuantum, currentProcess.remaining);
        
        ganttChart.push({
            id: currentProcess.id,
            start: currentTime,
            end: currentTime + executionTime
        });

        currentTime += executionTime;
        currentProcess.remaining -= executionTime;

        processesCopy.forEach(p => {
            if (p.arrival <= currentTime && p.remaining > 0 && p.firstTime) {
                queue.push(p);
                p.firstTime = false;
            }
        });

        if (currentProcess.remaining > 0) {
            queue.push(currentProcess);
        } else {
            currentProcess.completion = currentTime;
            currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
            currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
            completed++;

            const originalProcess = processes.find(p => p.id === currentProcess.id);
            Object.assign(originalProcess, {
                completion: currentProcess.completion,
                turnaround: currentProcess.turnaround,
                waiting: currentProcess.waiting
            });
            updateProcessTable(originalProcess);
        }
    }

    displayGanttChart(ganttChart);
    calculateAverages(processes);
}