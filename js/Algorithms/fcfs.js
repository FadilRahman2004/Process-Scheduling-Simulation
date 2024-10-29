function fcfsScheduling(processes) {
    let currentTime = 0;
    let ganttChart = [];
    
    processes.sort((a, b) => a.arrival - b.arrival);

    processes.forEach(process => {
        if (currentTime < process.arrival) {
            currentTime = process.arrival;
        }
        
        process.start = currentTime;
        process.completion = currentTime + process.burst;
        process.turnaround = process.completion - process.arrival;
        process.waiting = process.turnaround - process.burst;
        
        ganttChart.push({
            id: process.id,
            start: currentTime,
            end: process.completion
        });
        
        currentTime = process.completion;
        updateProcessTable(process);
    });

    displayGanttChart(ganttChart);
    calculateAverages(processes);
}