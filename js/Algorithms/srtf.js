function srtfScheduling(processes) {
    let currentTime = 0;
    let completed = 0;
    let ganttChart = [];
    let currentProcess = null;
    let processStartTime = 0;

    const processesCopy = processes.map(p => ({...p}));

    while (completed < processes.length) {
        let availableProcesses = processesCopy.filter(p => 
            !p.completed && p.arrival <= currentTime
        );

        if (availableProcesses.length === 0) {
            currentTime++;
            continue;
        }

        let shortestRemainingJob = availableProcesses.reduce((prev, curr) => 
            prev.remaining < curr.remaining ? prev : curr
        );

        if (currentProcess !== shortestRemainingJob) {
            if (currentProcess) {
                ganttChart.push({
                    id: currentProcess.id,
                    start: processStartTime,
                    end: currentTime
                });
            }
            currentProcess = shortestRemainingJob;
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
    calculateAverages (processes);
}