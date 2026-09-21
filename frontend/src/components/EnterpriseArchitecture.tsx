"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Layers, 
  Lock, 
  Zap, 
  ArrowRight, 
  Check, 
  Network, 
  Code2, 
  Share2
} from "lucide-react";

export function EnterpriseArchitecture() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: 0,
      name: "Layer 01 â€¢ Cryptographic Edge Field Mesh",
      subtitle: "Hardware-Locked Mobile Verification",
      icon: <Lock className="w-5 h-5 text-blue-500" />,
      features: [
        "Hardware-level GPS coordinate fence (Â±1.8m accuracy enforcement)",
        "Tamper-proof EXIF sensor hashing (gyroscope, tilt & timestamp locking)",
        "Biometric facial KYC authentication prior to store check-in",
        "Offline-first store caching with end-to-end AES-256 payload encryption"
      ],
      codeSnippet: `// Hardware Gate Cryptographic Check-in
const hardwareSignature = await DeviceSensor.getSecureEnclaveHash({
  gpsCoordinates: { lat: 25.1972, lng: 55.2744, accuracy: 1.8 },
  tamperFlags: false,
  accelerometerVector: [0.02, 9.81, 0.05]
});
await EscrowMesh.verifyGeofenceGate(hardwareSignature);`
    },
    {
      id: 1,
      name: "Layer 02 â€¢ Distributed Computer Vision Cluster",
      subtitle: "Sub-Second Multi-Modal Inference",
      icon: <Cpu className="w-5 h-5 text-cyan-500" />,
      features: [
        "TensorRT-accelerated YOLOv8 retail models with 840ms latency",
        "Eye-level planogram compliance scoring & share-of-shelf percentages",
        "OCR price tag extraction with automated discount tag verification",
        "Automated blur, lighting & synthetic duplicate image rejection"
      ],
      codeSnippet: `// Computer Vision Shelf Inference Pipeline
const cvResults = await YOLOv8Cluster.inferShelfImage(stream, {
  targetPlanogram: "BEV_COOLER_2026_TIER1",
  extractPricingOCR: true,
  maxLatencyBudgetMs: 1000
});
// Response: 18 facings matched, 0 voids, 98.6% compliance`
    },
    {
      id: 2,
      name: "Layer 03 â€¢ Autonomous Smart Escrow Settlement",
      subtitle: "Instant Micro-Disbursement Protocol",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      features: [
        "Client funds locked in automated escrow upon campaign brief approval",
        "Instant micro-payment release (< 5s) directly upon AI QC pass",
        "Fraud attempts quarantined automatically with cryptographic proof logs",
        "Zero-dispute audit trails: complete AI reasoning report issued to evaluators"
      ],
      codeSnippet: `// Automated Smart Escrow Settlement
if (audit.overall_qc_score >= 90.0 && audit.fraud_score < 0.05) {
  await SmartEscrow.releaseDisbursement({
    submissionId: "SUB-8921",
    recipientWallet: evaluator.walletId,
    payoutAmountUsd: 45.00
  });
}`
    },
    {
      id: 3,
      name: "Layer 04 â€¢ Enterprise Data Warehouse Connectors",
      subtitle: "Bi-Directional ERP & Lakehouse Sync",
      icon: <Database className="w-5 h-5 text-orange-500" />,
      features: [
        "Real-time streaming integration with Snowflake & Google BigQuery",
        "Automated push alerts to SAP, Oracle Retail & Salesforce Field Service",
        "PowerBI, Tableau & Looker direct data connection pipelines",
        "RESTful OpenAPI & FastAPI specifications with sub-100ms endpoint response"
      ],
      codeSnippet: `// Enterprise Snowflake Lakehouse Streaming
await SnowflakeConnector.streamTableInsert({
  dataset: "GLOBAL_RETAIL_AUDITS_V1",
  record: {
    store_id: "STR-4912",
    planogram_compliance_pct: 94.8,
    out_of_stock_skus: [],
    timestamp_utc: new Date().toISOString()
  }
});`
    }
  ];

  const enterpriseIntegrations = [
    { name: "Snowflake", category: "Data Cloud", status: "Native Connector" },
    { name: "Google BigQuery", category: "Data Warehouse", status: "Real-time Stream" },
    { name: "Databricks", category: "Lakehouse", status: "Delta Lake Sync" },
    { name: "Microsoft PowerBI", category: "Executive BI", status: "Live Push API" },
    { name: "Tableau", category: "Visual Analytics", status: "Hyper Pipeline" },
    { name: "Salesforce CRM", category: "Field Service", status: "Automated Ticket" }
  ];

  return (
    <section id="architecture" className="py-28 border-t border-slate-200 dark:border-slate-800/60 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Network className="w-4 h-4 text-blue-500" />
            <span>Mission-Critical Infrastructure</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Enterprise Security &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-orange-500 to-cyan-500 dark:from-blue-400 dark:via-orange-400 dark:to-cyan-400">
              System Architecture
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Engineered for Fortune 500 security standards: hardware geofencing, sub-second CV inference clusters, and native data warehouse streaming.
          </p>
        </div>

        {/* 4-Layer Architecture Interactive Matrix */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Layer Buttons & Feature Lists (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer, idx) => {
              const isSelected = activeLayer === idx;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500"
                      : "border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        isSelected 
                          ? "bg-blue-600 text-white" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        {layer.icon}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-sm sm:text-base text-slate-900 dark:text-white">
                          {layer.name}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {layer.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-2"
                    >
                      {layer.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Code & Security Blueprint Terminal (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-6 sm:p-8 font-mono text-xs shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-[11px] text-slate-400 font-sans font-bold ml-2">
                    {layers[activeLayer].name.split("â€¢")[1]?.trim() || "Architecture_Spec.ts"}
                  </span>
                </div>
                <span className="text-blue-400 text-[10px] bg-blue-950/80 border border-blue-800 px-2.5 py-0.5 rounded">
                  AES-256 ENCRYPTED
                </span>
              </div>

              {/* Code display */}
              <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <code>{layers[activeLayer].codeSnippet}</code>
              </pre>

              {/* Live Security Specifications */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-[10px]">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">Encryption Standard:</span>
                  <span className="text-white font-bold text-xs mt-0.5 block">TLS 1.3 + AES-256 GCM</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block">API Docs Available:</span>
                  <a href="http://localhost:8000/docs" target="_blank" className="text-cyan-400 hover:underline font-bold text-xs mt-0.5 block">
                    FastAPI OpenAPI Spec â†—
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Enterprise Connectors Strip */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="font-heading font-black text-lg text-slate-900 dark:text-white">
                Pre-Built Enterprise Data Integrations
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Direct zero-ETL integration into your existing corporate analytics stack.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ALL CONNECTORS OPERATIONAL</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6">
            {enterpriseIntegrations.map((integ, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 text-center flex flex-col justify-between"
              >
                <div>
                  <div className="font-heading font-black text-sm text-slate-900 dark:text-white">
                    {integ.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {integ.category}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                    âœ“ {integ.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


