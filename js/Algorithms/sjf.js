function sjfScheduling(processes) {
    let currentTime = 0;
    let completed = 0;
    let ganttChart = [];
    
    while (completed < processes.length) {
        let availableProcesses = processes.filter(p => 
            !p.completed && p.arrival <= currentTime
        );

        if (availableProcesses.length === 0) {
            currentTime++;
            continue;
        }

        let shortestJob = availableProcesses.reduce((prev, curr) => 
            prev.burst < curr.burst ? prev : curr
        );

        shortestJob.start = currentTime;
        shortestJob.completion = currentTime + shortestJob.burst;
        shortestJob.turnaround = shortestJob.completion - shortestJob.arrival;
        shortestJob.waiting = shortestJob.turnaround - shortestJob.burst;
        shortestJob.completed = true;

        ganttChart.push({
            id: shortestJob.id,
            start: currentTime,
            end: shortestJob.completion
        });

        currentTime = shortestJob.completion;
        completed++;
        updateProcessTable(shortestJob);
    }

    displayGanttChart(ganttChart);
    calculateAverages(processes);
}