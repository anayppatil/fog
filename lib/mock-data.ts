export type Role = "patient" | "guardian" | "doctor" | null;

export interface Patient {
  id: string;
  name: string;
  deviceId: string;
  status: "NORMAL" | "WARNING" | "HIGH RISK";
  fogRisk: number; // 0-100
  episodesToday: number;
  averageRecovery: number;
  lastUpdate: string;
  battery: number;
  isOnline: boolean;
}

export interface FogEvent {
  id: string;
  patientId: string;
  timestamp: string;
  duration: number;
  fogRisk: number;
  intervention: "Vibration" | "Audio" | "Both" | "None";
  recovery: number;
}

export interface Alert {
  id: string;
  patientId: string;
  type: "LOW" | "WARNING" | "HIGH";
  message: string;
  timestamp: string;
  acknowledged: boolean;
  fogRisk?: number;
  duration?: number;
  intervention?: string;
  recovery?: number;
}

// Initial Mock Data
export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Alex Johnson",
    deviceId: "FOG-001",
    status: "NORMAL",
    fogRisk: 18,
    episodesToday: 4,
    averageRecovery: 2.1,
    lastUpdate: "10:42",
    battery: 82,
    isOnline: true,
  },
  {
    id: "P002",
    name: "Sarah Miller",
    deviceId: "FOG-002",
    status: "WARNING",
    fogRisk: 64,
    episodesToday: 6,
    averageRecovery: 3.5,
    lastUpdate: "10:39",
    battery: 45,
    isOnline: true,
  },
  {
    id: "P003",
    name: "John Davis",
    deviceId: "FOG-003",
    status: "NORMAL",
    fogRisk: 12,
    episodesToday: 2,
    averageRecovery: 1.8,
    lastUpdate: "10:41",
    battery: 95,
    isOnline: true,
  },
];

export const mockEvents: FogEvent[] = [
  {
    id: "e1",
    patientId: "P001",
    timestamp: "10:42:17",
    duration: 2.4,
    fogRisk: 87,
    intervention: "Vibration",
    recovery: 2.1,
  },
  {
    id: "e2",
    patientId: "P001",
    timestamp: "09:51:03",
    duration: 1.8,
    fogRisk: 79,
    intervention: "Audio",
    recovery: 1.4,
  },
  {
    id: "e3",
    patientId: "P001",
    timestamp: "09:17:42",
    duration: 3.1,
    fogRisk: 91,
    intervention: "Both",
    recovery: 0.9,
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "a1",
    patientId: "P001",
    type: "WARNING",
    message: "Possible FoG episode detected",
    timestamp: "10:42",
    acknowledged: false,
    fogRisk: 87,
    duration: 2.4,
    intervention: "Vibration cue",
    recovery: 2.1,
  },
  {
    id: "a2",
    patientId: "P002",
    type: "HIGH",
    message: "Elevated FoG risk for prolonged period",
    timestamp: "10:30",
    acknowledged: false,
    fogRisk: 75,
  }
];

export const generateSensorData = (length: number = 60, riskLevel: "low" | "high" = "low") => {
  const data = [];
  const baseNoise = 0.5;
  const signalAmplitude = riskLevel === "high" ? 4.0 : 1.5;
  const signalFreq = riskLevel === "high" ? 0.3 : 0.05; // High frequency tremors during FoG

  for (let i = 0; i < length; i++) {
    const time = new Date(Date.now() - (length - i) * 100).toISOString();
    data.push({
      time,
      ax: Math.sin(i * signalFreq) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
      ay: Math.cos(i * signalFreq) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
      az: 9.8 + (Math.random() - 0.5) * baseNoise, // Gravity
      gx: Math.sin(i * signalFreq * 2) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
      gy: Math.cos(i * signalFreq * 2) * signalAmplitude + (Math.random() - 0.5) * baseNoise,
      gz: (Math.random() - 0.5) * baseNoise,
      fsr: riskLevel === "high" 
        ? Math.abs(Math.sin(i * signalFreq * 0.5) * 100) + 20 
        : Math.abs(Math.sin(i * 0.1) * 80) + 10,
    });
  }
  return data;
};
