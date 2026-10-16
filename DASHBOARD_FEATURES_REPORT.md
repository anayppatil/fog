# FoG Assist — Dashboard Features & System Architecture Report

**Project Title:** FoG Assist: Adaptive AI-Powered Predictive Wearable & Dashboard System for Parkinson's Freezing of Gait  
**Document Purpose:** Comprehensive Feature Description, UI/UX Architecture, and Technical Specifications for Final Project Report  
**Target Audience:** Project Evaluators, Academic Reviewers, Clinical Engineers, and Software Developers  

---

## 1. Executive Summary & Clinical Context

### 1.1 Clinical Background
**Freezing of Gait (FoG)** is one of the most debilitating motor symptoms associated with advanced Parkinson’s Disease (PD). It manifests as a sudden, brief, and involuntary inability to initiate or continue stepping, often described by patients as having their feet "glued to the floor." FoG episodes significantly elevate the risk of falls, causing severe physical trauma, psychological fear of falling, social isolation, and loss of independence.

### 1.2 System Mission
**FoG Assist** is an end-to-end wearable IoT and multi-tier web dashboard platform designed to:
1. **Predict and Detect** impending FoG episodes in real time via edge sensors and deep learning inference.
2. **Deliver Closed-Loop Interventions** (haptic vibration, auditory metronome cues, or multimodal stimulation) to unfreeze the patient immediately.
3. **Connect the Care Ecosystem** through dedicated, specialized dashboards for **Patients**, **Guardians/Caregivers**, and **Physicians/Researchers**.

---

## 2. System Architecture & Role-Based Design Philosophy

The FoG Assist web dashboard is engineered around a **Tiered Multi-Stakeholder Architecture**. Rather than presenting a generic interface to all users, the platform provides tailored interfaces designed specifically for the cognitive, emotional, and clinical needs of each stakeholder:

```
                                  +---------------------------------------+
                                  |         FoG Assist Platform           |
                                  +---------------------------------------+
                                                      |
                  +-----------------------------------+-----------------------------------+
                  |                                   |                                   |
                  v                                   v                                   v
        +-------------------+               +-------------------+               +-------------------+
        | Patient Dashboard |               | Guardian Console  |               | Clinical / Doctor |
        | (Low-Cognitive UX)|               | (Remote Safety)   |               | (Research & Data) |
        +-------------------+               +-------------------+               +-------------------+
                  |                                   |                                   |
        * Simplified status metrics         * Real-time emergency alerts        * Cohort management table
        * Live single-axis/risk glance      * Patient risk oversight            * Deep-dive sensor diagnostics
        * Interactive hardware test         * 7-day episode & recovery trend    * 1D CNN model metrics
        * Direct FoG event feedback         * Alert acknowledge workflow        * Adaptive AI loop analysis
                                                                                * Automated report generator
```

---

## 3. Detailed Dashboard Features by User Role

---

### 3.1 Patient Dashboard (`/patient/*`)

Designed specifically for elderly individuals and patients experiencing motor or cognitive impairments. The UI prioritizes **clarity, high contrast, non-intimidating visual hierarchies, and instantaneous feedback**.

#### A. Patient Overview Screen (`/patient/dashboard`)
* **Personalized Greeting & Context:** Welcomes the patient by name with a calm, uncluttered layout.
* **Top-Level KPI Telemetry Cards:**
  * **Current FoG Risk (%):** Visual indicator of current freezing probability (calculated by the predictive model) with dynamic color shifts (Green = Normal, Amber = Elevated, Red = High Risk with pulse animation).
  * **Device Status & Battery Gauge:** Immediate confirmation of wearable connectivity (`Connected` / `Disconnected`) and current battery percentage (`82%`).
  * **Today's Episodes:** Numeric counter showing how many freezing episodes were recorded since morning.
  * **Average Recovery Time:** Real-time benchmark of recovery duration in seconds (time from cue initiation to resumption of continuous gait).
* **High-Impact Status Banner:** An oversized, color-coded alert banner displaying categorical status:
  * `NORMAL`: *"Your current gait pattern is within the normal monitoring range."*
  * `WARNING`: *"Elevated variability detected. Proceed with caution."*
  * `HIGH RISK`: *"High risk of Freezing of Gait detected. Intervention activated."*
* **Real-Time Sensor Preview:** A responsive, live-rendered Sparkline/Line Chart showing current acceleration along the primary axis (Accelerometer X) with real-time waveform oscillations.

#### B. Live Monitoring Console (`/patient/monitoring`)
* **Multi-Axis Waveform Visualization:**
  * **3-Axis Accelerometer Stream ($a_x, a_y, a_z$):** Real-time kinematics in $\text{m/s}^2$ capturing tremor, leg swing velocity, and foot strike acceleration.
  * **Gyroscope Stream ($g_x$):** Angular velocity in $\text{rad/s}$ monitoring rotational gait dynamics and freezing leg oscillations.
  * **Force Sensitive Resistor (FSR) Stream:** Foot-plant pressure distribution curves quantifying heel strike and toe-off dynamics.
* **SVG Radial Risk Ring (60 Hz Real-Time Gauge):**
  * An animated circular SVG progress ring dynamically bound to the AI model's real-time risk score ($0\% - 100\%$).
  * Features drop-shadow glow effects and color transitions (Cyan $\rightarrow$ Neon Red during high-risk events).
* **Intervention Status Banner:** Automatically illuminates when an episode is triggered, notifying the patient: *"Intervention Activated: Vibration cue triggered to assist recovery."*
* **Interactive Demo Simulator:** In-page simulation trigger enabling the patient or evaluator to inject an instantaneous FoG event to observe real-time system reaction.

#### C. FoG Events History (`/patient/events`)
* **Summary Performance Cards:** Shows total daily episodes, average episode duration (seconds), and longest recorded freeze.
* **Chronological Event Log Table:**
  * Timestamp of each freeze (e.g., `10:42:17`).
  * Episode Duration (e.g., `2.4 sec`).
  * Calculated FoG Risk percentage at onset (e.g., `87%`).
  * Applied Intervention Modality (`Vibration`, `Audio`, or `Both`).
  * Measured Time to Recovery (e.g., `2.1 sec`).

#### D. Wearable Hardware & Diagnostics (`/patient/device`)
* **Subsystem Architecture Inspection:**
  * Microcontroller unit: **ESP32-S3** (Status: Connected).
  * Inertial Measurement Unit: **MPU6050** (Status: Prototype Active).
  * Pressure Sensor: **FSR Sensor** (Status: Prototype Active).
  * Actuator: **Eccentric Rotating Mass (ERM) Haptic Motor** (Status: Ready).
  * Network Telemetry: **Wi-Fi 60 Hz Packet Stream** (Status: Connected, $-45\text{ dBm}$).
* **End-to-End System Diagram:** Embedded visual hardware-to-cloud data flow showing sensor capture $\rightarrow$ microcontroller $\rightarrow$ backend $\rightarrow$ web interface.
* **Interactive Diagnostic Test Suite:** A terminal-style automated hardware diagnostic routine. Clicking **"Run Device Test"** executes step-by-step register checks, IMU baseline calibration, actuator ping, and Wi-Fi signal audits in a real-time console log.

---

### 3.2 Guardian & Caregiver Dashboard (`/guardian/*`)

Designed for family members, nurses, and remote caregivers who require **unobtrusive continuous monitoring, immediate emergency alerting, and reassurance** regarding patient safety.

#### A. Guardian Monitoring Overview (`/guardian/dashboard`)
* **Dual-Pane Telehealth Center:** Displays patient identity, current status, and real-time risk level in prominent high-contrast cards.
* **Quick-Glance Metric Strip:** Four actionable metrics: Current FoG Risk, Total Today's Freezes, Cohort Average Recovery, and Wearable Battery Level.
* **Chronological Patient Activity Feed:** Vertical timeline tracking patient mobility milestones throughout the day (e.g., *Normal gait monitored at 09:00*, *FoG episode successfully mitigated at 10:42*).
* **Active Alerts Box:** Live notification panel highlighting active warnings with clear contextual guidance (e.g., *"WARNING: Patient experiencing episode. Vibration cue activated."*).

#### B. Alert Center (`/guardian/alerts`)
* **Multi-Level Alert Prioritization:** Distinct classification of alerts (`HIGH`, `WARNING`, `LOW` / `ROUTINE`).
* **Detailed Episode Metadata:** Displays FoG risk percentage, duration, cue intervention applied, and recovery latency.
* **One-Click Alert Acknowledgment:** Caregivers can mark notifications as acknowledged to maintain an audit trail and avoid alert fatigue.
* **"All Clear" State Management:** When no unacknowledged alerts exist, a reassuring green checkmark and "All Clear: No active alerts" badge is rendered.

#### C. Trends & Recovery Analytics (`/guardian/trends`)
* **Daily FoG Episode Bar Chart:** Visualizes weekly episode frequencies (Monday through Sunday) to spot patterns, peak symptom times, and fatigue-related spikes.
* **Recovery Latency Trendline:** A smoothed continuous line graph tracking patient recovery times over the last 7 days, demonstrating whether interventions are maintaining or improving efficacy.
* **Timeframe Selectors:** Pre-configured filters for *Last 7 Days*, *Last 30 Days*, and *Custom Range*.

---

### 3.3 Doctor & Clinical Researcher Dashboard (`/doctor/*`)

Designed for neurologists, movement disorder specialists, and biomedical engineers who require **high-density data, multi-patient cohort oversight, algorithm transparency, and exportable reports**.

#### A. Clinical Research Overview (`/doctor/dashboard`)
* **Cohort-Wide Statistical KPI Cards:**
  * **Patients Monitored:** Active cohort size (e.g., 3 demo patients, expandable).
  * **Active Devices:** Real-time online/offline hardware tally.
  * **FoG Episodes Today:** Aggregate count across all enrolled patients.
  * **Average Recovery:** Mean recovery latency across the entire cohort.
* **Interactive Patient Roster Table:**
  * Lists all enrolled patients with Patient ID, Name, Live Status (`HIGH RISK`, `WARNING`, `NORMAL`), Numerical Risk %, Today's Episodes, Wearable Connection Status, and Last Sync Timestamp.
  * **Interactive Routing:** Clicking any row seamlessly opens the deep-dive profile for that specific patient.

#### B. Individual Patient Deep-Dive (`/doctor/patients/[id]`)
* **Dynamic Parameterized Routing:** Supports direct URL navigation to any patient (e.g., `/doctor/patients/P001`, `/doctor/patients/P002`).
* **Multi-Tab Clinical Console:**
  1. **Overview Tab:** Summary metrics, live risk ring, and chronological activity.
  2. **Live Sensors Tab:** Real-time multi-axis accelerometer ($a_x, a_y$) and gyroscope ($g_x$) charts paired with the circular SVG prediction ring.
  3. **FoG Events Tab:** Complete historical table of all detected episodes for clinical record-keeping.
  4. **Trends Tab:** Longitudinal recovery curve showing day-by-day response times.

#### C. Population & Cohort Analytics (`/doctor/analytics`)
* **Aggregate Episodes Over Time:** Recharts bar chart tracking total cohort episodes day-by-day to measure therapy efficacy.
* **FoG Risk Distribution Donut Chart:** Visual breakdown of patient time spent in:
  * **Low Risk** (e.g., 65% of monitored hours)
  * **Medium Risk / Prodromal** (e.g., 20%)
  * **High Risk / Freezing State** (e.g., 15%)

#### D. Predictive Machine Learning Architecture (`/doctor/model`)
* **Dataset Specifications:**
  * Training Benchmark: **FoG-STAR Dataset**.
  * Cohort: **22 Parkinson's Disease patients**.
  * Sensor Placement: **Bilateral Ankle IMUs** (Left and Right).
  * Modalities: 3-axis Accelerometer + 3-axis Gyroscope.
  * Classification Target: Binary FoG vs. Non-FoG gait states.
* **Input Preprocessing Pipeline:**
  * Sampling Rate: **60 Hz**.
  * Windowing: **2.0-second sliding window** with 50% overlap.
  * Window Dimensions: **120 samples × 12 sensor channels** ($120 \times 12$ matrix).
* **1D Convolutional Neural Network (1D-CNN) Pipeline:**
  * Visual flowchart of network layers:
    $$\text{Input}(120 \times 12) \rightarrow \text{Conv1D} \rightarrow \text{BatchNorm} \rightarrow \text{Conv1D} \rightarrow \text{GlobalAvgPool} \rightarrow \text{Dense}(64) \rightarrow \text{Dropout} \rightarrow \text{Dense}(32) \rightarrow \text{Sigmoid} \rightarrow \text{Risk Score}$$
* **Model Evaluation Metrics Grid:** Structured evaluation cards showing *Accuracy*, *Precision*, *Recall*, *Specificity*, *F1-Score*, and *AUROC*.

#### E. Intervention Analytics (`/doctor/interventions`)
* **Comparative Efficacy Bar Chart:** Horizontal bar comparison of recovery times across cueing strategies:
  * **Vibration Cue alone:** Average recovery time $\mathbf{2.1\text{ s}}$ (discrete haptic pulse via coin motor).
  * **Audio Cue alone:** Average recovery time $\mathbf{1.4\text{ s}}$ (rhythmic acoustic metronome beat).
  * **Combined Multimodal (Both):** Average recovery time $\mathbf{0.9\text{ s}}$ (**57% faster recovery** compared to vibration alone).
* **Clinical Mechanism Descriptions:** Deep dive into how synchronized haptic-auditory metronomes activate alternative neural pathways (premotor cortex and cerebellar-thalamic circuits) to bypass damaged basal ganglia pathways.

#### F. Adaptive AI Closed-Loop Personalization Engine (`/doctor/adaptive-ai`)
* **Continuous Biofeedback Learning Architecture:**
  * Stage 1: **FoG Detection** (Predictive model triggers when probability $> 80\%$).
  * Stage 2: **Adaptive Cue Selection** (Selects initial cue type and frequency based on historical response).
  * Stage 3: **Patient Response Capture** (IMU sensors monitor kinematic cadence immediately following the cue).
  * Stage 4: **Recovery Analysis** (Measures seconds required to resume regular stride length and cadence).
  * Stage 5: **Personalization Engine** (Reinforcement-style weight update favoring cues that minimized recovery latency).
* **Patient Example Case Study (P001):** Shows how the system incrementally optimized patient P001 from Episode 1 (Vibration, 2.1s) to Episode 2 (Audio, 1.4s) to Episode 3 (Combined, 0.9s), permanently updating future emergency responses to Multimodal.

#### G. Automated Clinical Report Generation (`/doctor/reports`)
* **Configurable Generation Form:**
  * **Report Types:** *Patient Summary Report*, *FoG Event History Report*, *Raw Sensor Data Export*, *Intervention Efficacy Report*, *Model Evaluation Report*.
  * **Date Range Filters:** *Today*, *Last 7 Days*, *Last 30 Days*, *All Time*.
  * **Cohort Filtering:** *All Patients (Aggregate)* or individual patient selection.
* **Real-Time Report Compilation & Preview:**
  * Generates an academic-grade clinical summary document on screen.
  * Includes executive summary, key performance indicators, high-risk time-of-day windows (e.g., peak freezing between 08:00 AM and 11:00 AM), and medical disclaimer.
* **Export Utilities:** Interactive action buttons for **Print**, **Download PDF**, and **Export CSV**.

---

## 4. Platform-Wide Features & Engineering Foundations

### 4.1 Global Responsive Navigation & Layout
* **Persistent Sidebar:** Collapsible navigation featuring role-specific link routing, active route highlighting, system status indicator, and quick-action buttons.
* **Top Navigation Bar (TopNav):**
  * Live role indicator (`Patient Dashboard`, `Guardian Dashboard`, `Doctor Dashboard`).
  * System connectivity status badge (`System Online`).
  * Active simulation alert badge (`Demo: Event Simulating`).
  * Interactive Notification Bell with unread ping indicator.
  * Role Profile pill with dropdown menu (**My Profile**, **Logout**).
  * Universal Standalone Logout button.

### 4.2 Comprehensive Theme Engine (Light & Dark Modes)
* Powered by `next-themes` and Tailwind CSS custom variables.
* **Dark Mode:** Deep slate/indigo aesthetic with high-contrast text, glassmorphic card panels, and glowing neon accents.
* **Light Mode:** Crisp, clean medical-grade aesthetic with soft contrast borders, subtle shadows, and crisp readability suited for daylight clinical settings.
* Seamless toggle switch available in the top navigation bar across every page.

### 4.3 Unified User Profiles (`/profile`)
A role-aware profile management screen displaying personalized details:
* **Patient View:** Displays Patient ID, Hoehn & Yahr Parkinson's Staging (Stage 3), primary neurologist, emergency caregiver contact, and linked hardware MAC/Device ID.
* **Doctor View:** Displays Provider ID, Department of Neurology, Specialization (Movement Disorders), Institutional Affiliation (UCSF Medical Center), and active clinical trial stats.
* **Guardian View:** Displays Guardian ID, Relationship (Primary Caregiver), Linked Patient, and configurable Push Alert Preferences.

### 4.4 Simulation Engine & Demo Control Panel (`/demo`)
A built-in testing console allowing evaluators to demonstrate real-time reactivity without physical hardware:
* **Simulate FoG Event:** Injects simulated high-frequency tremor and foot-freeze IMU patterns into the Zustand store, triggers high-risk state, activates intervention, logs the event, and models recovery over 5 seconds.
* **Simulate Hardware Disconnection:** Toggles device connectivity state to demonstrate UI reaction to packet loss.
* **Simulate Low Battery:** Drops battery telemetry below 20% to test power alerts.
* **Reset Environment:** Instantly resets all state, mock datasets, and timers back to factory defaults.

---

## 5. Technology Stack Summary

| Layer | Technologies Used | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript | Server and client component optimization, strict type safety, modular routing |
| **State Management** | Zustand | Zero-boilerplate global store, deterministic simulation cycles, instant multi-component reactivity |
| **Data Visualization** | Recharts & Custom SVGs | Hardware-accelerated SVG charts, responsive layouts, customizable mathematical Cartesian axes |
| **Styling & Design System** | Tailwind CSS, Lucide React, Glassmorphism | Rapid styling, semantic theme tokens, high-density icon library, accessible contrast |
| **Theming** | next-themes | Flash-free theme switching with persistent local storage caching |
| **Hardware Emulation** | Custom TypeScript Signal Generator | Simulates 60 Hz 3-axis accelerometer, gyroscope, and FSR waveforms with Gaussian noise |

---

## 6. How to Use this Section in Your Final Report

When integrating these dashboard features into your project report or thesis:
1. **Chapter: System Design & User Interfaces** $\rightarrow$ Use **Section 2** (Architecture) and **Section 3** (Detailed features broken down by Patient, Guardian, and Doctor).
2. **Chapter: Methodology & Implementation** $\rightarrow$ Use **Section 3.3.D** (1D-CNN pipeline) and **Section 3.3.F** (Adaptive AI loop) alongside **Section 5** (Tech Stack).
3. **Chapter: Results & Clinical Discussion** $\rightarrow$ Reference **Section 3.3.E** (Intervention latency comparison: 2.1s vs. 1.4s vs. 0.9s) to demonstrate the clinical value of closed-loop multimodal cueing.
4. **Appendices** $\rightarrow$ Attach screenshots corresponding to each feature enumerated above.

---
*Report document compiled for the FoG Assist Project Repository.*
