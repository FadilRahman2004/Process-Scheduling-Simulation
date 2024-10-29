function displayGanttChart(ganttChartData) {
    const ganttChartContainer = document.getElementById('ganttChartContainer');
    ganttChartContainer.innerHTML = `
        <h2>Gantt Chart</h2>
        <div class="gantt-chart">
            <div class="time-markers"></div>
            <div class="process-bars"></div>
        </div>
        <div id="results">
            <div class="timing-info">
                <p>Average Waiting Time: <span id="avgWaitingTime">0</span></p>
                <p>Average Turnaround Time: <span id="avgTurnaroundTime">0</span></p>
            </div>
        </div>
    `;

    const timeMarkersContainer = ganttChartContainer.querySelector('.time-markers');
    const processBarsContainer = ganttChartContainer.querySelector('.process-bars');

    let totalTime = Math.max(...ganttChartData.map(p => p.end));
    let timeUnit = 40;
    let chartWidth = totalTime * timeUnit;

    const maxWidth = 1200;
    if (chartWidth > maxWidth) {
        timeUnit = maxWidth / totalTime;
        chartWidth = maxWidth;
    }

    timeMarkersContainer.style.width = `${chartWidth}px`;
    processBarsContainer.style.width = `${chartWidth}px`;

    const markerInterval = Math.ceil(totalTime / 20);
    for (let i = 0; i <= totalTime; i += markerInterval) {
        const marker = document.createElement('div');
        marker.className = 'time-marker';
        marker.style.left = `${i * timeUnit}px`;
        marker.textContent = i;
        timeMarkersContainer.appendChild(marker);
    }

    ganttChartData.forEach(process => {
        const bar = document.createElement('div');
        bar.className = 'gantt-bar process-bar';
        bar.style.left = `${process.start * timeUnit}px`;
        bar.style.width = `${(process.end - process.start) * timeUnit}px`;
        bar.textContent = `P${process.id}`;
        processBarsContainer.appendChild(bar);
    });

    processBarsContainer.style.height = '50px';

    const avgWaiting = ganttChartData.reduce((sum, p) => sum + p.waiting, 0) / ganttChartData.length;
    const avgTurnaround = ganttChartData.reduce((sum, p) => sum + p.turnaround, 0) / ganttChartData.length;

    document.getElementById('avgWaitingTime').textContent = avgWaiting.toFixed(2);
    document.getElementById('avgTurnaroundTime').textContent = avgTurnaround.toFixed(2);
}
