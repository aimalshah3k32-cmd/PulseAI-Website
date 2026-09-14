from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import uuid
import json

from app.models.user import User, ClientProfile, ShopperProfile
from app.models.project import Project, Location, Questionnaire
from app.models.assignment import Assignment, Submission, MediaProof
from app.models.ai_analysis import AIAnalysis, Payment
from app.core.security import hash_password

def seed_database_if_empty(db: Session):
    """Seed initial enterprise mock data if database has no projects."""
    if db.query(Project).first():
        return

    # 1. Create Default Users
    # Admin
    admin_user = User(
        id=str(uuid.uuid4()),
        email="admin@pulseai.io",
        password_hash=hash_password("admin123"),
        full_name="Alex Vance (Chief QC Officer)",
        phone="+1 800 555 0199",
        role="super_admin",
        is_verified=True
    )
    db.add(admin_user)

    # Client
    client_user = User(
        id=str(uuid.uuid4()),
        email="client@unilever-cpg.com",
        password_hash=hash_password("client123"),
        full_name="Sarah Jenkins",
        phone="+1 212 555 0142",
        role="client",
        is_verified=True
    )
    db.add(client_user)
    db.flush()

    client_profile = ClientProfile(
        id=str(uuid.uuid4()),
        user_id=client_user.id,
        company_name="Apex Global Consumer Goods",
        industry="Retail & CPG",
        billing_address="100 Madison Ave, New York, NY 10016"
    )
    db.add(client_profile)

    # Shoppers
    shoppers_data = [
        {"name": "Marcus Sterling", "email": "marcus@shopper.pulseai.io", "lat": 40.7128, "lng": -74.0060, "trust": 98.5, "balance": 450.0},
        {"name": "Elena Rostova", "email": "elena@shopper.pulseai.io", "lat": 51.5074, "lng": -0.1278, "trust": 94.0, "balance": 320.0},
        {"name": "Tariq Al-Mansoor", "email": "tariq@shopper.pulseai.io", "lat": 25.2048, "lng": 55.2708, "trust": 99.0, "balance": 780.0},
        {"name": "Chloe Dubois", "email": "chloe@shopper.pulseai.io", "lat": 48.8566, "lng": 2.3522, "trust": 86.0, "balance": 180.0},
    ]

    shopper_profiles_list = []
    for s in shoppers_data:
        s_user = User(
            id=str(uuid.uuid4()),
            email=s["email"],
            password_hash=hash_password("shopper123"),
            full_name=s["name"],
            role="shopper",
            is_verified=True
        )
        db.add(s_user)
        db.flush()

        s_profile = ShopperProfile(
            id=str(uuid.uuid4()),
            user_id=s_user.id,
            gender="Unspecified",
            current_lat=s["lat"],
            current_lng=s["lng"],
            trust_score=s["trust"],
            balance_earned=s["balance"],
            is_available=True,
            kyc_status="verified"
        )
        db.add(s_profile)
        shopper_profiles_list.append(s_profile)

    db.flush()

    # 2. Create Flagship Projects
    project1 = Project(
        id=str(uuid.uuid4()),
        client_id=client_profile.id,
        title="Q3 Global Ready-to-Drink Beverage Planogram & OOS Audit",
        raw_brief="Audit 200+ major supermarket locations in New York, London, Dubai, and Paris for primary beverage aisle endcaps, out-of-stock compliance, and promotional wobbler verification.",
        project_type="retail_audit",
        status="active",
        payout_per_task=32.0,
        target_quota=120,
        completed_quota=84
    )
    db.add(project1)

    project2 = Project(
        id=str(uuid.uuid4()),
        client_id=client_profile.id,
        title="Luxury Fashion Boutique Mystery Shopping & Associate Hospitality",
        raw_brief="Evaluate greeting response time, product demonstration depth, and checkout courtesy across flagship high-street boutiques.",
        project_type="mystery_shopping",
        status="active",
        payout_per_task=50.0,
        target_quota=40,
        completed_quota=29
    )
    db.add(project2)
    db.flush()

    # 3. Create Questionnaires
    q1_schema = [
        {"id": "q1_photo", "type": "photo", "title": "Capture primary beverage shelf facing", "required": True},
        {"id": "q2_oos", "type": "single_choice", "title": "Any SKU out of stock?", "options": ["None (Full Stock)", "1-2 SKUs OOS", "Heavy OOS (>3 SKUs)"], "required": True},
        {"id": "q3_price", "type": "text", "title": "Record unit tag price ($/£/€/AED)", "required": True},
        {"id": "q4_audio", "type": "audio", "title": "Record 30s store manager feedback on supply cadence", "required": True}
    ]
    db.add(Questionnaire(
        id=str(uuid.uuid4()),
        project_id=project1.id,
        schema_json=q1_schema,
        generated_by_ai="true",
        version=1
    ))

    # 4. Create Locations
    locations_seed = [
        {"name": "Whole Foods Market - Columbus Circle", "city": "New York", "country": "United States", "lat": 40.7681, "lng": -73.9819, "proj": project1},
        {"name": "Target Superstore - Brooklyn Triangle", "city": "New York", "country": "United States", "lat": 40.6892, "lng": -73.9857, "proj": project1},
        {"name": "Tesco Superstore - Regent St", "city": "London", "country": "United Kingdom", "lat": 51.5135, "lng": -0.1388, "proj": project1},
        {"name": "Carrefour Hypermarket - Mall of the Emirates", "city": "Dubai", "country": "United Arab Emirates", "lat": 25.1181, "lng": 55.2007, "proj": project1},
        {"name": "Monoprix Champs-Élysées", "city": "Paris", "country": "France", "lat": 48.8708, "lng": 2.3045, "proj": project1},
        {"name": "Gucci Flagship - 5th Ave", "city": "New York", "country": "United States", "lat": 40.7635, "lng": -73.9740, "proj": project2},
        {"name": "Harrods Luxury Hall - Knightsbridge", "city": "London", "country": "United Kingdom", "lat": 51.4994, "lng": -0.1632, "proj": project2},
    ]

    created_locations = []
    for loc in locations_seed:
        l = Location(
            id=str(uuid.uuid4()),
            project_id=loc["proj"].id,
            store_name=loc["name"],
            address=f"Location Address, {loc['city']}",
            city=loc["city"],
            country=loc["country"],
            latitude=loc["lat"],
            longitude=loc["lng"],
            geofence_radius_meters=150.0,
            status="completed" if loc["city"] in ["New York", "Dubai"] else "in_progress"
        )
        db.add(l)
        created_locations.append(l)

    db.flush()

    # 5. Create Assignments & Submissions with AI Vision & Fraud Analysis
    for i, loc in enumerate(created_locations):
        shopper = shopper_profiles_list[i % len(shopper_profiles_list)]
        
        # Assignment
        assignment = Assignment(
            id=str(uuid.uuid4()),
            project_id=loc.project_id,
            location_id=loc.id,
            shopper_id=shopper.id,
            status="approved" if i != 2 else "escalated"
        )
        db.add(assignment)
        db.flush()

        # Submission
        answers = {
            "q1_photo": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
            "q2_oos": "None (Full Stock)" if i != 2 else "Heavy OOS (>3 SKUs)",
            "q3_price": "$3.49",
            "q4_audio": "Voice diary recorded: Display clean, promo wobbler visible, strong foot traffic."
        }

        dist = 24.5 if i != 2 else 240.0  # Location 2 simulated breach
        sub = Submission(
            id=str(uuid.uuid4()),
            assignment_id=assignment.id,
            answers_data=answers,
            submission_lat=loc.latitude + (0.0001 if i != 2 else 0.0025),
            submission_lng=loc.longitude + (0.0001 if i != 2 else 0.0025),
            geo_distance_meters=dist,
            submitted_at=datetime.utcnow() - timedelta(hours=i * 6)
        )
        db.add(sub)
        db.flush()

        # Media proof
        db.add(MediaProof(
            id=str(uuid.uuid4()),
            submission_id=sub.id,
            media_type="image",
            storage_url="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
            file_hash=f"hash_{uuid.uuid4().hex[:16]}",
            exif_timestamp=datetime.utcnow() - timedelta(hours=i * 6),
            is_verified=True
        ))

        # AI Analysis
        is_escalated = (i == 2)
        vision_scores = {
            "planogram_compliance_score": 94.5 if not is_escalated else 68.0,
            "shelf_emptiness_pct": 4.2 if not is_escalated else 28.5,
            "brand_logo_detected": True,
            "price_tag_matched": True,
            "detected_facings_count": 14,
            "bounding_boxes": [
                {"label": "Target SKU #1 (Facing Compliant)", "box": [0.20, 0.15, 0.55, 0.35], "confidence": 0.98, "status": "compliant"},
                {"label": "Target SKU #2 (Facing Compliant)", "box": [0.21, 0.38, 0.56, 0.58], "confidence": 0.96, "status": "compliant"},
                {"label": "Competitor Facing", "box": [0.22, 0.62, 0.57, 0.85], "confidence": 0.92, "status": "competitor"},
                {"label": "Shelf Price Strip", "box": [0.58, 0.12, 0.65, 0.88], "confidence": 0.95, "status": "ocr_verified"}
            ]
        }
        if is_escalated:
            vision_scores["bounding_boxes"].append({
                "label": "Out-of-Stock Shelf Void Alert",
                "box": [0.25, 0.40, 0.58, 0.65],
                "confidence": 0.94,
                "status": "void_alert"
            })

        fraud_flags = {
            "gps_spoof_detected": False,
            "geofence_breached": is_escalated,
            "duplicate_image_found": False,
            "exif_mismatch_detected": False,
            "flag_reasons": ["Geofence breached (240m away > 150m allowed)"] if is_escalated else []
        }

        overall_score = 96.2 if not is_escalated else 67.5
        status = "auto_approved" if not is_escalated else "escalated"

        db.add(AIAnalysis(
            id=str(uuid.uuid4()),
            submission_id=sub.id,
            vision_scores=vision_scores,
            text_sentiment_score=0.82 if not is_escalated else -0.45,
            fraud_flags=fraud_flags,
            overall_quality_score=overall_score,
            status=status
        ))

        # Payment
        db.add(Payment(
            id=str(uuid.uuid4()),
            user_id=shopper.user_id,
            assignment_id=assignment.id,
            amount=32.0,
            currency="USD",
            status="released" if not is_escalated else "escrowed"
        ))

    db.commit()
