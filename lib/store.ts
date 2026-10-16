import { create } from "zustand";
import { Role, Patient, FogEvent, Alert, mockPatients, mockEvents, mockAlerts, generateSensorData } from "./mock-data";

interface SensorReading {
  time: string;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
  fsr: number;
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  
  patients: Patient[];
  events: FogEvent[];
  alerts: Alert[];
  
  // Live monitoring state for P001 (Alex Johnson)
  liveSensorData: SensorReading[];
  isSimulatingEvent: boolean;
  isRecovering: boolean;
  
  // Actions
  simulateFogEvent: () => void;
  acknowledgeAlert: (id: string) => void;
  updateSensorData: () => void;
  resetSimulation: () => void;
}

export const useStore = create<AppState>((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  
  patients: [...mockPatients],
  events: [...mockEvents],
  alerts: [...mockAlerts],
  
  liveSensorData: generateSensorData(60, "low"),
  isSimulatingEvent: false,
  isRecovering: false,
  
  simulateFogEvent: () => {
    set((state) => {
      const newTimestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      const updatedPatients = state.patients.map(p => {
        if (p.id === "P001") {
          return {
            ...p,
            status: "HIGH RISK" as const,
            fogRisk: 87,
            episodesToday: p.episodesToday + 1,
            lastUpdate: newTimestamp
          };
        }
        return p;
      });

      const duration = parseFloat((Math.random() * 2 + 1.5).toFixed(1));
      const recovery = parseFloat((Math.random() * 2 + 1.0).toFixed(1));

      const newAlert: Alert = {
        id: `a${Date.now()}`,
        patientId: "P001",
        type: "WARNING",
        message: "Possible FoG episode detected (Simulated)",
        timestamp: newTimestamp,
        acknowledged: false,
        fogRisk: 87,
        duration: duration,
        intervention: "Vibration cue",
        recovery: recovery,
      };

      // Store these parameters so we can use them when creating the event later
      // We'll attach them to the window or just re-generate, but let's just re-generate 
      // in the timeout to keep the store simple, so we don't need to pass state.

      return {
        isSimulatingEvent: true,
        patients: updatedPatients,
        alerts: [newAlert, ...state.alerts],
        liveSensorData: generateSensorData(60, "high"),
      };
    });
    
    // Simulate active event for 3 seconds
    setTimeout(() => {
      set({ isSimulatingEvent: false, isRecovering: true });
      
      // Simulate recovery for 2 seconds
      setTimeout(() => {
        set((state) => {
          const resetPatients = state.patients.map(p => {
            if (p.id === "P001") {
              return {
                ...p,
                status: "NORMAL" as const,
                fogRisk: 18,
              };
            }
            return p;
          });
          
          // Now record the event
          const newEvent: FogEvent = {
            id: `e${Date.now()}`,
            patientId: "P001",
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            duration: parseFloat((Math.random() * 2 + 1.5).toFixed(1)),
            fogRisk: 87,
            intervention: "Vibration",
            recovery: parseFloat((Math.random() * 2 + 1.0).toFixed(1)),
          };
          
          return {
            isRecovering: false,
            patients: resetPatients,
            events: [newEvent, ...state.events]
          };
        });
      }, 2000);
    }, 3000);
  },
  
  acknowledgeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
    }));
  },
  
  updateSensorData: () => {
    set((state) => {
      // Append new data point and remove oldest
      const newData = [...state.liveSensorData];
      newData.shift();
      
      const last = newData[newData.length - 1];
      const riskLevel = state.isSimulatingEvent ? "high" : "low";
      const baseNoise = 0.5;
      const signalAmplitude = riskLevel === "high" ? 4.0 : 1.5;
      const signalFreq = riskLevel === "high" ? 0.3 : 0.05;
      
      const i = Date.now() / 100;
      
      newData.push({
        time: new Date().toISOString(),
        ax: Math.sin(i * signalFreq) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
        ay: Math.cos(i * signalFreq) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
        az: 9.8 + (Math.random() - 0.5) * baseNoise,
        gx: Math.sin(i * signalFreq * 2) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
        gy: Math.cos(i * signalFreq * 2) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
        gz: (Math.random() - 0.5) * baseNoise,
        fsr: riskLevel === "high" 
          ? Math.abs(Math.sin(i * signalFreq * 0.5) * 100) + 20 
          : Math.abs(Math.sin(i * 0.1) * 80) + 10,
      });
      
      return { liveSensorData: newData };
    });
  },
  
  resetSimulation: () => {
    set({
      patients: [...mockPatients],
      events: [...mockEvents],
      alerts: [...mockAlerts],
      liveSensorData: generateSensorData(60, "low"),
      isSimulatingEvent: false,
    });
  }
}));
