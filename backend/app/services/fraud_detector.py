import hashlib
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional

# Basic sentiment lexicon for retail/field reviews
POSITIVE_WORDS = {"clean", "organized", "excellent", "friendly", "helpful", "stocked", "great", "fast", "compliant", "good", "spacious", "polite"}
NEGATIVE_WORDS = {"dirty", "messy", "empty", "rude", "slow", "missing", "broken", "unhelpful", "expired", "bad", "disorganized", "unattended"}

def analyze_text_sentiment(text: str) -> float:
    """
    Computes sentiment polarity score from -1.0 (very negative) to +1.0 (very positive).
    """
    if not text:
        return 0.0
    words = text.lower().split()
    pos_count = sum(1 for w in words if w.strip(".,!?:;\"'") in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w.strip(".,!?:;\"'") in NEGATIVE_WORDS)
    total = pos_count + neg_count
    if total == 0:
        return 0.15  # Neutral slightly positive baseline
    return round((pos_count - neg_count) / total, 2)

def detect_fraud_and_validate(
    file_hashes: List[str],
    submission_lat: float,
    submission_lng: float,
    target_lat: float,
    target_lng: float,
    geo_distance_meters: float,
    geofence_radius: float,
    exif_timestamp: Optional[datetime],
    submission_time: Optional[datetime],
    known_seen_hashes: Optional[set] = None
) -> Dict[str, Any]:
    """
    Evaluates submission for fraud flags:
    - GPS spoof / geofence breach
    - Duplicate image hash across submissions
    - EXIF capture timestamp vs upload timestamp mismatch
    """
    fraud_flags = {
        "gps_spoof_detected": False,
        "geofence_breached": False,
        "duplicate_image_found": False,
        "exif_mismatch_detected": False,
        "flag_reasons": []
    }

    # 1. Geofence Check
    if geo_distance_meters > geofence_radius:
        fraud_flags["geofence_breached"] = True
        fraud_flags["flag_reasons"].append(f"Submission recorded {round(geo_distance_meters, 1)}m away, exceeding {geofence_radius}m geofence radius.")

    # 2. Duplicate Hash Check
    if known_seen_hashes and file_hashes:
        for h in file_hashes:
            if h in known_seen_hashes:
                fraud_flags["duplicate_image_found"] = True
                fraud_flags["flag_reasons"].append("Duplicate perceptual image hash found in global fraud database.")
                break

    # 3. EXIF vs Submission Time Check
    if exif_timestamp and submission_time:
        diff_hours = abs((submission_time - exif_timestamp).total_seconds()) / 3600.0
        if diff_hours > 24.0:
            fraud_flags["exif_mismatch_detected"] = True
            fraud_flags["flag_reasons"].append(f"EXIF photo timestamp is {round(diff_hours, 1)} hours older than task submission timestamp.")

    return fraud_flags

def compute_overall_quality_and_status(
    vision_score: float,
    sentiment_score: float,
    fraud_flags: Dict[str, Any],
    shopper_trust_score: float = 95.0,
    threshold: float = 85.0
) -> Dict[str, Any]:
    """
    Computes overall score (0-100) and routes to auto_approved or escalated queue.
    """
    # Start with vision score
    base_score = vision_score * 0.65 + (shopper_trust_score * 0.25) + ((sentiment_score + 1.0) * 5.0)

    # Apply severe penalties for fraud flags
    penalty = 0.0
    if fraud_flags.get("geofence_breached"):
        penalty += 35.0
    if fraud_flags.get("duplicate_image_found"):
        penalty += 50.0
    if fraud_flags.get("exif_mismatch_detected"):
        penalty += 20.0

    final_score = max(0.0, min(100.0, round(base_score - penalty, 1)))
    status = "auto_approved" if (final_score >= threshold and not any(fraud_flags.get(k) for k in ["duplicate_image_found", "geofence_breached"])) else "escalated"

    return {
        "overall_quality_score": final_score,
        "status": status,
        "auto_approved": status == "auto_approved"
    }
