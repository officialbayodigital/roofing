import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client server-side securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// In-memory mock database for bookings
interface Booking {
  id: string;
  referenceCode: string;
  serviceType: string;
  propertyType: string;
  squareFootage: number;
  material: string;
  address: string;
  city: string;
  postalCode: string;
  date: string;
  timeSlot: string;
  status: "Confirmed" | "Inspection Scheduled" | "Technician Assigned" | "Completed";
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;
  estimatedCost: string;
}

const bookings: Booking[] = [
  {
    id: "b1",
    referenceCode: "KP-2026-8841",
    serviceType: "Residential Roof Replacement",
    propertyType: "Single Family Home",
    squareFootage: 2200,
    material: "Architectural Asphalt Shingles",
    address: "742 Evergreen Terrace",
    city: "Montreal",
    postalCode: "H3A 1A1",
    date: "2026-08-12",
    timeSlot: "Morning (8:00 AM - 12:00 PM)",
    status: "Confirmed",
    customerName: "Marc Tremblay",
    email: "m.tremblay@example.ca",
    phone: "(514) 555-0192",
    notes: "Minor leak near master bedroom chimney after winter freeze.",
    createdAt: "2026-08-05T14:30:00Z",
    estimatedCost: "$8,500 - $10,200 CAD",
  },
];

// Service Area Coverage Data
const SERVICE_REGIONS = [
  { codePrefixes: ["H1", "H2", "H3", "H4", "H8", "H9"], region: "Greater Montreal & West Island", responseTime: "Same-Day Emergency Available" },
  { codePrefixes: ["H7", "J7"], region: "Laval & Laurentians", responseTime: "Within 24 Hours" },
  { codePrefixes: ["J4", "J8", "J9"], region: "South Shore & Gatineau", responseTime: "Within 24 Hours" },
  { codePrefixes: ["K1", "K2", "K4", "K6"], region: "Ottawa & East Ontario / Hawkesbury", responseTime: "Same-Day / Next-Day" },
  { codePrefixes: ["G1", "G2"], region: "Quebec City Metro", responseTime: "1-2 Business Days" },
];

// 1. AI Roof Advisor Endpoint (Gemini 3.6 Flash)
app.post("/api/ai-roof-advisor", async (req, res) => {
  try {
    const { issueDescription, propertyType, roofAgeYears, roofMaterial, imageContext } = req.body;

    if (!issueDescription && !imageContext) {
      return res.status(400).json({ error: "Please describe your roofing concern or provide details." });
    }

    const systemInstruction = `You are KP Roofing's Master Roofing Inspection AI Specialist in Canada.
Analyze the homeowner or building manager's description and generate a professional, structured Canadian roofing diagnosis and cost recommendation.
Focus on Canadian weather conditions (freeze-thaw cycles, ice dams, heavy snow loads, wind uplift, extreme thermal shock).

You MUST return valid JSON matching this schema:
{
  "diagnosisSummary": "Brief professional 2-sentence summary of the probable issue",
  "severityLevel": "Low" | "Moderate" | "High" | "Critical Emergency",
  "urgencyRating": "1-3 days" | "Within a week" | "Immediate 24h Action Required",
  "recommendedAction": "Primary step needed (e.g. Thermal leak inspection, full shingle overlay, flashing reseal, emergency tarping)",
  "recommendedMaterials": ["Material 1", "Material 2", "Material 3"],
  "estimatedCostRangeCAD": "$X,XXX - $Y,YYY CAD",
  "preventiveAdvice": "1-2 tips to protect the roof from further water damage or Canadian winter weather",
  "inspectionChecklist": ["Check step 1", "Check step 2", "Check step 3"]
}`;

    const prompt = `Customer Property Info:
- Property Type: ${propertyType || "Residential"}
- Approximate Roof Age: ${roofAgeYears ? `${roofAgeYears} years` : "Unknown"}
- Current Roof Material: ${roofMaterial || "Asphalt Shingles"}
- Customer Issue / Description: "${issueDescription || "General roof inspection and damage assessment."}"
${imageContext ? `- Image uploaded note: ${imageContext}` : ""}

Provide a realistic Canadian contractor assessment with pricing in CAD.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json({ success: true, result: data });
  } catch (err: any) {
    console.error("AI Roof Advisor Error:", err);
    return res.status(500).json({
      error: "Failed to generate AI roof assessment. Please try again or book a direct inspection.",
      details: err?.message,
    });
  }
});

// 2. Bookings Endpoints
app.get("/api/bookings", (req, res) => {
  const { code, phone } = req.query;
  if (code) {
    const found = bookings.find(
      (b) => b.referenceCode.toLowerCase() === String(code).trim().toLowerCase()
    );
    if (found) return res.json({ success: true, booking: found });
    return res.status(404).json({ success: false, message: "Booking code not found." });
  }
  if (phone) {
    const found = bookings.filter((b) =>
      b.phone.replace(/\D/g, "").includes(String(phone).replace(/\D/g, ""))
    );
    return res.json({ success: true, bookings: found });
  }
  return res.json({ success: true, bookings });
});

app.post("/api/bookings", (req, res) => {
  try {
    const {
      serviceType,
      propertyType,
      squareFootage,
      material,
      address,
      city,
      postalCode,
      date,
      timeSlot,
      customerName,
      email,
      phone,
      notes,
      estimatedCost,
    } = req.body;

    if (!customerName || !phone || !date || !address) {
      return res.status(400).json({ error: "Missing required contact or scheduling fields." });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `KP-2026-${randomNum}`;

    const newBooking: Booking = {
      id: "b_" + Date.now(),
      referenceCode,
      serviceType: serviceType || "Roofing Inspection & Quote",
      propertyType: propertyType || "Single Family Home",
      squareFootage: Number(squareFootage) || 1800,
      material: material || "Architectural Asphalt Shingles",
      address,
      city: city || "Montreal",
      postalCode: (postalCode || "H3A 1A1").toUpperCase(),
      date,
      timeSlot: timeSlot || "Morning (8:00 AM - 12:00 PM)",
      status: "Confirmed",
      customerName,
      email: email || "",
      phone,
      notes: notes || "",
      createdAt: new Date().toISOString(),
      estimatedCost: estimatedCost || "Free In-Person Quote",
    };

    bookings.unshift(newBooking);

    return res.json({
      success: true,
      message: "Booking confirmed successfully!",
      booking: newBooking,
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error creating booking." });
  }
});

// 3. Service Area Checker Endpoint
app.post("/api/service-area", (req, res) => {
  const { postalCode } = req.body;
  if (!postalCode) {
    return res.status(400).json({ error: "Postal Code required" });
  }

  const cleanPrefix = String(postalCode).replace(/\s+/g, "").substring(0, 2).toUpperCase();
  const match = SERVICE_REGIONS.find((r) =>
    r.codePrefixes.some((p) => p.toUpperCase() === cleanPrefix)
  );

  if (match) {
    return res.json({
      serviced: true,
      regionName: match.region,
      responseTime: match.responseTime,
      message: `Great news! KP Roofing provides full coverage in ${match.region}.`,
    });
  }

  return res.json({
    serviced: true, // We service all surrounding Canadian regions with custom dispatch
    regionName: "Canadian Regional Coverage Zone",
    responseTime: "Within 24-48 Hours",
    message: "KP Roofing services your area with dedicated mobile roofing units.",
  });
});

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KP Roofing Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
