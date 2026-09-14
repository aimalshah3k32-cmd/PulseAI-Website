import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Seed mock state for seamless offline fallback
export interface ProjectItem {
  id: string;
  title: string;
  raw_brief: string;
  project_type: string;
  status: string;
  payout_per_task: number;
  target_quota: number;
  completed_quota: number;
  locations_count: number;
}

export interface LocationItem {
  id: string;
  store_name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  geofence_radius_meters: number;
  status: string;
  payout: number;
  distance_meters?: number;
  type?: string;
}

export interface SubmissionItem {
  submission_id: string;
  assignment_id: string;
  project_title: string;
  project_type: string;
  store_name: string;
  city: string;
  country: string;
  shopper_name: string;
  shopper_trust_score: number;
  shopper_avatar?: string;
  submitted_at: string;
  geo_distance_meters: number;
  overall_quality_score: number;
  status: "auto_approved" | "escalated" | "qc_approved" | "rejected";
  fraud_flags: {
    gps_spoof_detected?: boolean;
    geofence_breached?: boolean;
    duplicate_image_found?: boolean;
    exif_mismatch_detected?: boolean;
    flag_reasons?: string[];
  };
  vision_scores: {
    planogram_compliance_score?: number;
    shelf_emptiness_pct?: number;
    brand_logo_detected?: boolean;
    price_tag_matched?: boolean;
    detected_facings_count?: number;
    bounding_boxes?: Array<{
      label: string;
      box: [number, number, number, number]; // [ymin, xmin, ymax, xmax]
      confidence: number;
      status: string;
      details?: string;
    }>;
  };
  text_sentiment_score: number;
  media_proofs: Array<{
    media_type: string;
    storage_url: string;
    is_verified: boolean;
  }>;
  answers_data: Record<string, any>;
}

// Fallback Initial State
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Q3 Global Ready-to-Drink Beverage Planogram & OOS Audit",
    raw_brief: "Audit 200+ major supermarket locations in New York, London, Dubai, and Paris for primary beverage aisle endcaps, out-of-stock compliance, and promotional wobbler verification.",
    project_type: "retail_audit",
    status: "active",
    payout_per_task: 32.0,
    target_quota: 120,
    completed_quota: 84,
    locations_count: 5,
  },
  {
    id: "proj-2",
    title: "Luxury Fragrance Boutique Mystery Shopping & Hospitality",
    raw_brief: "Evaluate greeting response time, product demonstration depth, and checkout courtesy across flagship high-street boutiques in Paris and London.",
    project_type: "mystery_shopping",
    status: "active",
    payout_per_task: 50.0,
    target_quota: 40,
    completed_quota: 29,
    locations_count: 3,
  },
  {
    id: "proj-3",
    title: "Multi-Modal Computer Vision In-Store Barcode & Shelf Dataset",
    raw_brief: "Collect 1000+ bounding-box annotated images and acoustic sound profiles of supermarket aisles for AI model training.",
    project_type: "ai_data",
    status: "active",
    payout_per_task: 35.0,
    target_quota: 80,
    completed_quota: 56,
    locations_count: 4,
  },
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: "loc-1",
    store_name: "Whole Foods Market - Columbus Circle",
    address: "10 Columbus Cir, New York, NY 10019",
    city: "New York",
    country: "United States",
    latitude: 40.7681,
    longitude: -73.9819,
    geofence_radius_meters: 150,
    status: "completed",
    payout: 32.0,
    distance_meters: 24,
    type: "retail_audit"
  },
  {
    id: "loc-2",
    store_name: "Target Superstore - Brooklyn Triangle",
    address: "445 Albee Square W, Brooklyn, NY 11201",
    city: "New York",
    country: "United States",
    latitude: 40.6892,
    longitude: -73.9857,
    geofence_radius_meters: 150,
    status: "in_progress",
    payout: 32.0,
    distance_meters: 850,
    type: "retail_audit"
  },
  {
    id: "loc-3",
    store_name: "Tesco Superstore - Regent St",
    address: "1 Regent St, London W1B 5RA",
    city: "London",
    country: "United Kingdom",
    latitude: 51.5135,
    longitude: -0.1388,
    geofence_radius_meters: 150,
    status: "escalated",
    payout: 32.0,
    distance_meters: 240,
    type: "retail_audit"
  },
  {
    id: "loc-4",
    store_name: "Carrefour Hypermarket - Mall of the Emirates",
    address: "Sheikh Zayed Rd, Al Barsha 1, Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.1181,
    longitude: 55.2007,
    geofence_radius_meters: 180,
    status: "completed",
    payout: 35.0,
    distance_meters: 45,
    type: "retail_audit"
  },
  {
    id: "loc-5",
    store_name: "Gucci Flagship - 5th Ave",
    address: "725 5th Ave, New York, NY 10022",
    city: "New York",
    country: "United States",
    latitude: 40.7635,
    longitude: -73.974,
    geofence_radius_meters: 150,
    status: "completed",
    payout: 50.0,
    distance_meters: 90,
    type: "mystery_shopping"
  },
];

export const INITIAL_SUBMISSIONS: SubmissionItem[] = [
  {
    submission_id: "sub-101",
    assignment_id: "asg-101",
    project_title: "Q3 Global Ready-to-Drink Beverage Planogram & OOS Audit",
    project_type: "retail_audit",
    store_name: "Whole Foods Market - Columbus Circle",
    city: "New York",
    country: "United States",
    shopper_name: "Marcus Sterling",
    shopper_trust_score: 98.5,
    shopper_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    submitted_at: "8 mins ago",
    geo_distance_meters: 24.5,
    overall_quality_score: 96.2,
    status: "auto_approved",
    fraud_flags: {
      gps_spoof_detected: false,
      geofence_breached: false,
      duplicate_image_found: false,
      exif_mismatch_detected: false,
      flag_reasons: [],
    },
    vision_scores: {
      planogram_compliance_score: 96.5,
      shelf_emptiness_pct: 3.2,
      brand_logo_detected: true,
      price_tag_matched: true,
      detected_facings_count: 18,
      bounding_boxes: [
        { label: "Target Beverage SKU 1", box: [0.18, 0.12, 0.62, 0.36], confidence: 0.98, status: "compliant", details: "Eye-Level Facings: 4 units | Stock OK" },
        { label: "Target Beverage SKU 2", box: [0.18, 0.38, 0.62, 0.62], confidence: 0.97, status: "compliant", details: "Eye-Level Facings: 4 units | Stock OK" },
        { label: "Competitor Facing", box: [0.18, 0.64, 0.62, 0.88], confidence: 0.94, status: "competitor", details: "Secondary Tier Brand | 3 units" },
        { label: "Price Tag OCR Strip", box: [0.65, 0.10, 0.76, 0.90], confidence: 0.99, status: "ocr_verified", details: "Price Tag: $3.49 | Promo Validated" },
      ],
    },
    text_sentiment_score: 0.88,
    media_proofs: [
      {
        media_type: "image",
        storage_url: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1200&q=80",
        is_verified: true,
      },
    ],
    answers_data: {
      q1_photo: "Verified High-Res Shelf Image (4K EXIF)",
      q2_oos: "None (Full Stock)",
      q3_price: "$3.49 / unit (Matched Promotion)",
      q4_audio: "Voice diary: Endcap is clean, promo wobbler prominently positioned at entrance, associate confirmed daily replenishment.",
    },
  },
  {
    submission_id: "sub-102",
    assignment_id: "asg-102",
    project_title: "Q3 Global Ready-to-Drink Beverage Planogram & OOS Audit",
    project_type: "retail_audit",
    store_name: "Tesco Superstore - Regent St",
    city: "London",
    country: "United Kingdom",
    shopper_name: "Elena Rostova",
    shopper_trust_score: 84.0,
    shopper_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    submitted_at: "24 mins ago",
    geo_distance_meters: 240.0,
    overall_quality_score: 64.5,
    status: "escalated",
    fraud_flags: {
      gps_spoof_detected: false,
      geofence_breached: true,
      duplicate_image_found: false,
      exif_mismatch_detected: false,
      flag_reasons: [
        "Hardware Geofence Breach: GPS coordinates 240m away from store centroid (150m allowed perimeter).",
        "Acoustic Sentiment Anomaly: Negative sentiment detected in audio check-in recording."
      ],
    },
    vision_scores: {
      planogram_compliance_score: 62.0,
      shelf_emptiness_pct: 22.4,
      brand_logo_detected: true,
      price_tag_matched: false,
      detected_facings_count: 8,
      bounding_boxes: [
        { label: "Target SKU (Low Stock)", box: [0.20, 0.14, 0.58, 0.40], confidence: 0.91, status: "compliant", details: "Only 1 unit remaining on rack" },
        { label: "Void Alert (OOS)", box: [0.20, 0.44, 0.60, 0.84], confidence: 0.95, status: "void_alert", details: "3 Out-of-Stock Shelf Gaps Detected" },
      ],
    },
    text_sentiment_score: -0.45,
    media_proofs: [
      {
        media_type: "image",
        storage_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
        is_verified: false,
      },
    ],
    answers_data: {
      q1_photo: "Shelf Photo with void gaps",
      q2_oos: "Heavy OOS (>3 SKUs Missing)",
      q3_price: "Tag missing / illegible",
      q4_audio: "Audio note: Store was crowded, beverage shelf had major missing inventory on middle row.",
    },
  },
  {
    submission_id: "sub-103",
    assignment_id: "asg-103",
    project_title: "Luxury Fragrance Boutique Mystery Shopping & Hospitality",
    project_type: "mystery_shopping",
    store_name: "Gucci Flagship - 5th Ave",
    city: "New York",
    country: "United States",
    shopper_name: "Alexander Vance",
    shopper_trust_score: 99.2,
    shopper_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    submitted_at: "1 hour ago",
    geo_distance_meters: 18.0,
    overall_quality_score: 98.0,
    status: "auto_approved",
    fraud_flags: {
      gps_spoof_detected: false,
      geofence_breached: false,
      duplicate_image_found: false,
      exif_mismatch_detected: false,
      flag_reasons: [],
    },
    vision_scores: {
      planogram_compliance_score: 99.0,
      shelf_emptiness_pct: 0.0,
      brand_logo_detected: true,
      price_tag_matched: true,
      detected_facings_count: 24,
      bounding_boxes: [
        { label: "Gucci Fragrance Display", box: [0.15, 0.10, 0.65, 0.90], confidence: 0.99, status: "compliant", details: "Premium Podium Setup | 100% Compliant" },
      ],
    },
    text_sentiment_score: 0.95,
    media_proofs: [
      {
        media_type: "image",
        storage_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
        is_verified: true,
      },
    ],
    answers_data: {
      q1_photo: "Podium Display Proof",
      q2_oos: "None (Full Stock)",
      q3_price: "$180.00 / Bottle",
      q4_audio: "Voice diary: Greeted in 18 seconds, offered espresso, comprehensive product notes provided by senior consultant.",
    },
  },
  {
    submission_id: "sub-104",
    assignment_id: "asg-104",
    project_title: "Global Beverage Cooler Shelf Share & Planogram Audit",
    project_type: "retail_audit",
    store_name: "Carrefour Hypermarket - Mall of the Emirates",
    city: "Dubai",
    country: "United Arab Emirates",
    shopper_name: "Zaid Al-Mansoor",
    shopper_trust_score: 97.4,
    shopper_avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80",
    submitted_at: "2 hours ago",
    geo_distance_meters: 32.0,
    overall_quality_score: 94.0,
    status: "auto_approved",
    fraud_flags: {
      gps_spoof_detected: false,
      geofence_breached: false,
      duplicate_image_found: false,
      exif_mismatch_detected: false,
      flag_reasons: [],
    },
    vision_scores: {
      planogram_compliance_score: 95.0,
      shelf_emptiness_pct: 2.8,
      brand_logo_detected: true,
      price_tag_matched: true,
      detected_facings_count: 32,
      bounding_boxes: [
        { label: "Tier-1 Cold Beverage Cooler Bay", box: [0.15, 0.10, 0.70, 0.85], confidence: 0.98, status: "compliant", details: "All 32 Facings in Eye-Level Compliance" },
      ],
    },
    text_sentiment_score: 0.91,
    media_proofs: [
      {
        media_type: "image",
        storage_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
        is_verified: true,
      },
    ],
    answers_data: {
      q1_photo: "Cooler beverage bay photo",
      q2_oos: "None (Full Stock)",
      q3_price: "4.99 AED / Can",
      q4_audio: "Voice diary: Cooler was impeccably organized with promotional wobblers visible.",
    },
  },
  {
    submission_id: "sub-105",
    assignment_id: "asg-105",
    project_title: "Automotive Showroom Electric Fleet Readiness",
    project_type: "mystery_shopping",
    store_name: "Porsche Centre - Champs-Élysées",
    city: "Paris",
    country: "France",
    shopper_name: "Claire Dubois",
    shopper_trust_score: 98.9,
    shopper_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    submitted_at: "3 hours ago",
    geo_distance_meters: 14.0,
    overall_quality_score: 97.5,
    status: "auto_approved",
    fraud_flags: {
      gps_spoof_detected: false,
      geofence_breached: false,
      duplicate_image_found: false,
      exif_mismatch_detected: false,
      flag_reasons: [],
    },
    vision_scores: {
      planogram_compliance_score: 98.0,
      shelf_emptiness_pct: 0.0,
      brand_logo_detected: true,
      price_tag_matched: true,
      detected_facings_count: 12,
      bounding_boxes: [
        { label: "EV Fleet Charging Station", box: [0.10, 0.12, 0.75, 0.88], confidence: 0.99, status: "compliant", details: "Fast Charger Operational & Verified" },
      ],
    },
    text_sentiment_score: 0.96,
    media_proofs: [
      {
        media_type: "image",
        storage_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        is_verified: true,
      },
    ],
    answers_data: {
      q1_photo: "EV Station & Reception Proof",
      q2_oos: "N/A (Showroom)",
      q3_price: "€115,000 Taycan 4S",
      q4_audio: "Voice diary: Immediate greeting, thorough explanation of home charging incentives.",
    },
  },
];
