# Process-Scheduling-Simulation

## Overview

The **Process Scheduling Simulation** project is an interactive educational tool designed to visualize and simulate various CPU scheduling algorithms used in operating systems. As computer systems manage multiple processes concurrently, effective scheduling is crucial for optimizing resource utilization, minimizing waiting times, and ensuring fair access to CPU resources.

This simulator provides a hands-on experience for users to understand the intricacies of different scheduling algorithms, making it an invaluable resource for students, educators, and anyone interested in operating systems. 

### Key Features

- **Multiple Scheduling Algorithms**: The simulator supports several widely-used CPU scheduling algorithms, including:
  - **First-Come, First-Served (FCFS)**: A simple scheduling algorithm that processes requests in the order they arrive.
  - **Shortest Job First (SJF)**: Prioritizes processes with the shortest execution time, reducing average waiting time.
  - **Shortest Remaining Time Job (SRTJ)**: A preemptive version of SJF that allows a currently running process to be preempted if a new process arrives with a shorter remaining time.
  - **Priority Scheduling**: Offers both preemptive and non-preemptive versions:
    - **Preemptive Priority Scheduling**: Allows higher-priority processes to preempt currently running lower-priority processes.
    - **Non-Preemptive Priority Scheduling**: Once a process starts executing, it cannot be preempted until it finishes.
  - **Round Robin (RR)**: Allocates a fixed time slice to each process in a cyclic order, ensuring responsiveness in time-sharing systems.
  

- **Interactive User Interface**: Users can input their own process data, such as arrival times, burst times, and priorities, to observe how different algorithms handle scheduling in real time.

- **Gantt Chart Visualization**: The simulator generates Gantt charts, providing a visual representation of process execution over time. This feature helps users intuitively understand how scheduling decisions impact process flow and CPU utilization.

- **Performance Metrics**: The simulation includes metrics such as turnaround time, waiting time, and response time, allowing users to analyze and compare the efficiency of different scheduling algorithms.

### Educational Value

This project serves as a practical tool for learning about CPU scheduling concepts and their implications in operating systems. By visualizing how each algorithm operates, users can gain deeper insights into the trade-offs associated with different scheduling strategies, such as responsiveness versus throughput.

Whether you're a student studying computer science, an educator teaching operating systems, or a developer interested in process management, the **Process Scheduling Simulation** project offers a comprehensive and engaging way to explore the fundamentals of CPU scheduling.

## Screenshots
### Initial Screen:
![Alt text](/Screenshots/1.png?raw=true "1")


## Installation
To run the simulation locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/FadilRahman2004/Process-Scheduling-Simulation.git
   cd Process-Scheduling-Simulation
